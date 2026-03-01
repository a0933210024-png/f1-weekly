const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'f1-weekly/standings'
    }
  });

  if (!res.ok) {
    throw new Error(`F1 API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function normalizeDriverStanding(item) {
  const driver = item.Driver || {};
  const constructors = item.Constructors || [];
  const team = constructors[0] || {};

  return {
    position: Number(item.position),
    points: Number(item.points),
    wins: Number(item.wins),
    driverId: driver.driverId,
    code: driver.code || '',
    permanentNumber: driver.permanentNumber || '',
    givenName: driver.givenName || '',
    familyName: driver.familyName || '',
    fullName: `${driver.givenName || ''} ${driver.familyName || ''}`.trim(),
    nationality: driver.nationality || '',
    teamName: team.name || '',
    teamId: team.constructorId || ''
  };
}

function normalizeConstructorStanding(item) {
  const team = item.Constructor || {};

  return {
    position: Number(item.position),
    points: Number(item.points),
    wins: Number(item.wins),
    constructorId: team.constructorId || '',
    name: team.name || '',
    nationality: team.nationality || ''
  };
}

async function fetchStandingsBySeason(season) {
  const [driverJson, constructorJson] = await Promise.all([
    fetchJson(`${BASE_URL}/${season}/driverStandings.json`),
    fetchJson(`${BASE_URL}/${season}/constructorStandings.json`)
  ]);

  const driverTable = driverJson?.MRData?.StandingsTable;
  const constructorTable = constructorJson?.MRData?.StandingsTable;

  const driverList = driverTable?.StandingsLists?.[0] || null;
  const constructorList = constructorTable?.StandingsLists?.[0] || null;

  return {
    season: String(season),
    round: driverList?.round || constructorList?.round || null,
    hasData: Boolean(driverList || constructorList),
    drivers: (driverList?.DriverStandings || []).map(normalizeDriverStanding),
    constructors: (constructorList?.ConstructorStandings || []).map(normalizeConstructorStanding),
    fetchedAt: new Date().toISOString()
  };
}

export async function fetchCurrentStandings(seasons = [2025, 2026]) {
  const results = await Promise.all(
    seasons.map(async (season) => {
      try {
        return await fetchStandingsBySeason(season);
      } catch (error) {
        return {
          season: String(season),
          round: null,
          hasData: false,
          drivers: [],
          constructors: [],
          fetchedAt: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );

  return {
    source: 'Jolpica Ergast API mirror',
    sourceUrl: BASE_URL,
    seasons: results,
    fetchedAt: new Date().toISOString()
  };
}

export { fetchStandingsBySeason };
