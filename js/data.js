/* ============================================================
   F1 WEEKLY — DATA (2026 Season)
   Sources: formula1.com, the-race.com, racingnews365.com
   Last updated: March 8, 2026 (after Australian GP R1)
   ============================================================ */

const F1 = {

  /* ---- TRANSLATIONS ---- */
  i18n: {
    en: {
      nav_home: 'Home', nav_teams: 'Teams', nav_schedule: 'Schedule',
      nav_standings: 'Standings', nav_news: 'News', nav_simulator: 'Simulator',
      ticker_1: 'Russell Wins Australian GP — Mercedes 1-2 to Open 2026 Season',
      ticker_2: 'Verstappen P20 to P6 Recovery Earns Driver of the Day',
      ticker_3: 'Piastri DNS After Warm-Up Lap Crash — Heartbreak at Home GP',
      ticker_4: 'Mercedes Lead Constructors with Maximum 43 Points After Round 1',
      ticker_5: 'Next Up: Chinese Grand Prix — Shanghai, March 15',
      hero_badge: '2026 Formula 1 World Championship',
      hero_line1: 'THE', hero_line2: 'FASTEST', hero_line3: 'SHOW', hero_line4: 'ON EARTH',
      hero_sub: 'Your home for everything Formula 1. Live standings, race schedules, team news, and circuit guides — all in one place.',
      counter_races: 'Races', counter_teams: 'Teams', counter_drivers: 'Drivers',
      next_race_lbl: 'Next Race',
      days: 'Days', hours: 'Hrs', minutes: 'Min', seconds: 'Sec',
      wdc_leader: 'Championship Leader',
      view_all: 'View All',
      drivers_standings: "Driver Standings", constructors_standings: "Constructor Standings",
      latest_news: 'Latest News', pts_label: 'PTS',
      race_complete: 'Completed', race_next: 'Race Day Tomorrow', race_upcoming: 'Upcoming',
      race_this_weekend: 'This Weekend',
      page_teams: 'Teams & Drivers', page_schedule: '2026 Calendar',
      page_standings: 'Championship', page_news: 'News',
      eyebrow_teams: '2026 Season — 11 Constructors', eyebrow_sched: '2026 Season Calendar',
      eyebrow_stand: 'Live Standings', eyebrow_news: 'Latest Updates',
      filter_all: 'All Races', filter_done: 'Completed', filter_upcoming: 'Upcoming',
      modal_circuit: 'Circuit', modal_length: 'Circuit Length', modal_laps: 'Laps',
      modal_record: 'Lap Record', modal_turns: 'Corners', modal_date: 'Race Date',
      modal_winner: 'Last Winner',
      tab_drivers: 'Drivers', tab_constructors: 'Constructors',
      st_driver: 'Driver', st_nationality: 'Nat.', st_team: 'Team',
      st_wins: 'Wins', st_points: 'Points',
      quali_grid: 'Australia Qualifying Grid',
      standings_note_en: '2026 Season — Round 1 of 24 completed',
      nav_compare: 'Compare',
      footer_tagline: 'Your weekly source for Formula 1 news, standings, and race coverage.',
      footer_nav: 'Navigation', footer_races: 'Races', footer_follow: 'Follow',
      copyright: '© 2026 F1 Weekly. Not affiliated with Formula 1 Group.',
      eyebrow_compare: '2026 Season',
      page_compare: 'Driver Comparison',
      cmp_select_driver: 'Select Driver',
      cmp_number: 'Number', cmp_nationality: 'Nationality', cmp_team: 'Team',
      cmp_engine: 'Power Unit', cmp_points: 'Championship Points',
      cmp_quali_pos: 'Australia Quali', cmp_quali_time: 'Quali Time',
      cmp_no_time: 'No Time',
    },
    zh: {
      nav_home: '首頁', nav_teams: '車隊', nav_schedule: '賽程',
      nav_standings: '積分', nav_news: '新聞', nav_simulator: '模擬器',
      ticker_1: '羅素贏下澳洲大獎賽 — 梅賽德斯包辦前二揭幕2026賽季',
      ticker_2: '維斯達彭從P20追到P6 榮獲最佳車手',
      ticker_3: '皮亞斯特里暖胎圈撞車未能起跑 — 主場夢碎',
      ticker_4: '梅賽德斯以滿分43分領跑車隊積分榜',
      ticker_5: '下一站：中國大獎賽 — 上海，3月15日',
      hero_badge: '2026年一級方程式世界錦標賽',
      hero_line1: '地球上', hero_line2: '最快的', hero_line3: '賽車', hero_line4: '盛事',
      hero_sub: '你的 Formula 1 資訊中心。即時積分、賽程安排、車隊新聞、賽道導覽，一站式掌握所有資訊。',
      counter_races: '場大獎賽', counter_teams: '支車隊', counter_drivers: '位車手',
      next_race_lbl: '下一站',
      days: '天', hours: '時', minutes: '分', seconds: '秒',
      wdc_leader: '積分榜領先',
      view_all: '查看全部',
      drivers_standings: '車手積分榜', constructors_standings: '車隊積分榜',
      latest_news: '最新消息', pts_label: '分',
      race_complete: '已完賽', race_next: '明日比賽', race_upcoming: '即將舉行',
      race_this_weekend: '本週末',
      page_teams: '車隊與車手', page_schedule: '2026年賽程',
      page_standings: '積分榜', page_news: '新聞',
      eyebrow_teams: '2026賽季 — 11支參賽車隊', eyebrow_sched: '2026年賽季日曆',
      eyebrow_stand: '即時積分', eyebrow_news: '最新更新',
      filter_all: '全部賽事', filter_done: '已完賽', filter_upcoming: '即將舉行',
      modal_circuit: '賽道', modal_length: '賽道長度', modal_laps: '圈數',
      modal_record: '最快圈速', modal_turns: '彎角數', modal_date: '比賽日期',
      modal_winner: '上屆冠軍',
      tab_drivers: '車手', tab_constructors: '車隊',
      st_driver: '車手', st_nationality: '國籍', st_team: '車隊',
      st_wins: '勝場', st_points: '積分',
      quali_grid: '澳洲站排位賽發車位置',
      standings_note_en: '2026賽季 — 已完成第1站（共24站）',
      nav_compare: '比較',
      footer_tagline: '你的每週 Formula 1 新聞、積分與賽事報導來源。',
      footer_nav: '導覽', footer_races: '賽事', footer_follow: '關注',
      copyright: '© 2026 F1 Weekly。本站與 Formula 1 集團無關聯。',
      eyebrow_compare: '2026賽季',
      page_compare: '車手比較',
      cmp_select_driver: '選擇車手',
      cmp_number: '車號', cmp_nationality: '國籍', cmp_team: '車隊',
      cmp_engine: '動力單元', cmp_points: '積分',
      cmp_quali_pos: '澳洲排位', cmp_quali_time: '排位時間',
      cmp_no_time: '無成績',
    }
  },

  /* ---- TEAMS (11 constructors, 2026) ----
     Source: formula1.com/en/teams, the-race.com/formula-1/f1-2026-entry-list
  ---- */
  teams: [
    {
      id: 'mclaren', name: 'McLaren', nameZH: '麥拿侖',
      fullName: 'McLaren Mastercard F1 Team',
      engine: 'Mercedes', color: '#FF8000', pos: 3, pts: 10, cdnSlug: 'mclaren',
      drivers: [
        { num: 1,  first: 'Lando',   last: 'Norris',    nat: 'GBR', flag: '🇬🇧', pts: 10, wins: 0, code: 'lannor01' },
        { num: 81, first: 'Oscar',   last: 'Piastri',   nat: 'AUS', flag: '🇦🇺', pts: 0, wins: 0, code: 'oscpia01' }
      ]
    },
    {
      id: 'ferrari', name: 'Ferrari', nameZH: '法拉利',
      fullName: 'Scuderia Ferrari HP',
      engine: 'Ferrari', color: '#E8002D', pos: 2, pts: 27, cdnSlug: 'ferrari',
      drivers: [
        { num: 16, first: 'Charles', last: 'Leclerc',   nat: 'MCO', flag: '🇲🇨', pts: 15, wins: 0, code: 'chalec01' },
        { num: 44, first: 'Lewis',   last: 'Hamilton',  nat: 'GBR', flag: '🇬🇧', pts: 12, wins: 0, code: 'lewham01' }
      ]
    },
    {
      id: 'redbull', name: 'Red Bull', nameZH: '紅牛',
      fullName: 'Oracle Red Bull Racing',
      engine: 'Red Bull Ford', color: '#3671C6', pos: 4, pts: 8, cdnSlug: 'redbullracing',
      drivers: [
        { num: 3,  first: 'Max',     last: 'Verstappen', nat: 'NED', flag: '🇳🇱', pts: 8, wins: 0, code: 'maxver01' },
        { num: 6,  first: 'Isack',   last: 'Hadjar',     nat: 'FRA', flag: '🇫🇷', pts: 0, wins: 0, code: 'isahad01' }
      ]
    },
    {
      id: 'mercedes', name: 'Mercedes', nameZH: '梅賽德斯',
      fullName: 'Mercedes-AMG PETRONAS Formula One Team',
      engine: 'Mercedes', color: '#00D2BE', pos: 1, pts: 43, cdnSlug: 'mercedes',
      drivers: [
        { num: 63, first: 'George',  last: 'Russell',   nat: 'GBR', flag: '🇬🇧', pts: 25, wins: 1, code: 'georus01' },
        { num: 12, first: 'Kimi',    last: 'Antonelli', nat: 'ITA', flag: '🇮🇹', pts: 18, wins: 0, code: 'andant01' }
      ]
    },
    {
      id: 'astonmartin', name: 'Aston Martin', nameZH: '阿斯頓·馬丁',
      fullName: 'Aston Martin Aramco Formula One Team',
      engine: 'Honda', color: '#229971', pos: 11, pts: 0, cdnSlug: 'astonmartin',
      drivers: [
        { num: 14, first: 'Fernando', last: 'Alonso',   nat: 'ESP', flag: '🇪🇸', pts: 0, wins: 0, code: 'feralo01' },
        { num: 18, first: 'Lance',    last: 'Stroll',   nat: 'CAN', flag: '🇨🇦', pts: 0, wins: 0, code: 'lanstr01' }
      ]
    },
    {
      id: 'alpine', name: 'Alpine', nameZH: '阿爾派',
      fullName: 'BWT Alpine Formula One Team',
      engine: 'Mercedes', color: '#0093CC', pos: 8, pts: 1, cdnSlug: 'alpine',
      drivers: [
        { num: 10, first: 'Pierre',  last: 'Gasly',     nat: 'FRA', flag: '🇫🇷', pts: 1, wins: 0, code: 'piegas01' },
        { num: 43, first: 'Franco',  last: 'Colapinto', nat: 'ARG', flag: '🇦🇷', pts: 0, wins: 0, code: 'fracol01' }
      ]
    },
    {
      id: 'haas', name: 'Haas', nameZH: '哈斯',
      fullName: 'TGR Haas F1 Team',
      engine: 'Ferrari', color: '#FFFFFF', pos: 5, pts: 6, cdnSlug: 'haasf1team',
      drivers: [
        { num: 31, first: 'Esteban', last: 'Ocon',      nat: 'FRA', flag: '🇫🇷', pts: 0, wins: 0, code: 'estoco01' },
        { num: 87, first: 'Oliver',  last: 'Bearman',   nat: 'GBR', flag: '🇬🇧', pts: 6, wins: 0, code: 'olibea01' }
      ]
    },
    {
      id: 'williams', name: 'Williams', nameZH: '威廉斯',
      fullName: 'Atlassian Williams F1 Team',
      engine: 'Mercedes', color: '#37BEDD', pos: 9, pts: 0, cdnSlug: 'williams',
      drivers: [
        { num: 55, first: 'Carlos',  last: 'Sainz',     nat: 'ESP', flag: '🇪🇸', pts: 0, wins: 0, code: 'carsai01' },
        { num: 23, first: 'Alex',    last: 'Albon',     nat: 'THA', flag: '🇹🇭', pts: 0, wins: 0, code: 'alealb01' }
      ]
    },
    {
      id: 'racingbulls', name: 'Racing Bulls', nameZH: '鬥牛',
      fullName: 'Visa Cash App Racing Bulls Formula One Team',
      engine: 'Red Bull Ford', color: '#6692FF', pos: 6, pts: 4, cdnSlug: 'racingbulls',
      drivers: [
        { num: 30, first: 'Liam',    last: 'Lawson',    nat: 'NZL', flag: '🇳🇿', pts: 0, wins: 0, code: 'lialaw01' },
        { num: 41, first: 'Arvid',   last: 'Lindblad',  nat: 'GBR', flag: '🇬🇧', pts: 4, wins: 0, code: 'arvlin01' }
      ]
    },
    {
      id: 'audi', name: 'Audi', nameZH: '奧迪',
      fullName: 'Audi Revolut F1 Team',
      engine: 'Audi', color: '#BB0000', pos: 7, pts: 2, cdnSlug: 'audi',
      drivers: [
        { num: 27, first: 'Nico',    last: 'Hülkenberg', nat: 'DEU', flag: '🇩🇪', pts: 0, wins: 0, code: 'nichul01' },
        { num: 5,  first: 'Gabriel', last: 'Bortoleto',  nat: 'BRA', flag: '🇧🇷', pts: 2, wins: 0, code: 'gabbor01' }
      ]
    },
    {
      id: 'cadillac', name: 'Cadillac', nameZH: '凱迪拉克',
      fullName: 'Cadillac Formula 1 Team',
      engine: 'Ferrari', color: '#CC0033', pos: 10, pts: 0, cdnSlug: 'cadillac',
      drivers: [
        { num: 11, first: 'Sergio',   last: 'Pérez',    nat: 'MEX', flag: '🇲🇽', pts: 0, wins: 0, code: 'serper01' },
        { num: 77, first: 'Valtteri', last: 'Bottas',   nat: 'FIN', flag: '🇫🇮', pts: 0, wins: 0, code: 'valbot01' }
      ]
    }
  ],

  /* ---- AUSTRALIA QUALIFYING GRID (March 7, 2026) ----
     Source: formula1.com, racingnews365.com
     P1-P10 confirmed; P11-P21 estimated; Verstappen last (Q1 crash)
  ---- */
  australiaQuali: [
    { pos: 1,  num: 63, driver: 'George Russell',   team: 'Mercedes',      time: '1:18.518', confirmed: true  },
    { pos: 2,  num: 12, driver: 'Kimi Antonelli',   team: 'Mercedes',      time: '1:18.811', confirmed: true  },
    { pos: 3,  num: 6,  driver: 'Isack Hadjar',     team: 'Red Bull',      time: '1:19.303', confirmed: true  },
    { pos: 4,  num: 16, driver: 'Charles Leclerc',  team: 'Ferrari',       time: '1:19.327', confirmed: true  },
    { pos: 5,  num: 81, driver: 'Oscar Piastri',    team: 'McLaren',       time: '1:19.380', confirmed: true  },
    { pos: 6,  num: 1,  driver: 'Lando Norris',     team: 'McLaren',       time: '1:19.863', confirmed: true  },
    { pos: 7,  num: 44, driver: 'Lewis Hamilton',   team: 'Ferrari',       time: '1:20.012', confirmed: true  },
    { pos: 8,  num: 30, driver: 'Liam Lawson',      team: 'Racing Bulls',  time: '1:20.214', confirmed: true  },
    { pos: 9,  num: 41, driver: 'Arvid Lindblad',   team: 'Racing Bulls',  time: '1:20.451', confirmed: true  },
    { pos: 10, num: 5,  driver: 'Gabriel Bortoleto',team: 'Audi',          time: '1:20.592', confirmed: true  },
    { pos: 11, num: 27, driver: 'Nico Hülkenberg',  team: 'Audi',          time: '—',         confirmed: false },
    { pos: 12, num: 55, driver: 'Carlos Sainz',     team: 'Williams',      time: '—',         confirmed: false },
    { pos: 13, num: 10, driver: 'Pierre Gasly',     team: 'Alpine',        time: '—',         confirmed: false },
    { pos: 14, num: 14, driver: 'Fernando Alonso',  team: 'Aston Martin',  time: '—',         confirmed: false },
    { pos: 15, num: 87, driver: 'Oliver Bearman',   team: 'Haas',          time: '—',         confirmed: false },
    { pos: 16, num: 43, driver: 'Franco Colapinto', team: 'Alpine',        time: '—',         confirmed: false },
    { pos: 17, num: 23, driver: 'Alex Albon',       team: 'Williams',      time: '—',         confirmed: false },
    { pos: 18, num: 31, driver: 'Esteban Ocon',     team: 'Haas',          time: '—',         confirmed: false },
    { pos: 19, num: 18, driver: 'Lance Stroll',     team: 'Aston Martin',  time: '—',         confirmed: false },
    { pos: 20, num: 11, driver: 'Sergio Pérez',     team: 'Cadillac',      time: '—',         confirmed: false },
    { pos: 21, num: 77, driver: 'Valtteri Bottas',  team: 'Cadillac',      time: '—',         confirmed: false },
    { pos: 22, num: 3,  driver: 'Max Verstappen',   team: 'Red Bull',      time: 'Q1 Crash',  confirmed: true  },
  ],

  /* ---- F1 MEDIA CDN IMAGE HELPERS (2026) ----
     Source: media.formula1.com (Cloudinary CDN)
     All URLs verified HTTP 200
  ---- */
  cdnBase: 'https://media.formula1.com/image/upload',

  getDriverImg: function(driverCode, teamSlug, w) {
    w = w || 440;
    return this.cdnBase + '/c_fill,w_' + w + '/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000000/common/f1/2026/' + teamSlug + '/' + driverCode + '/2026' + teamSlug + driverCode + 'right.webp';
  },

  getTeamLogo: function(teamSlug, w) {
    w = w || 48;
    return this.cdnBase + '/c_lfill,w_' + w + '/q_auto/v1740000000/common/f1/2026/' + teamSlug + '/2026' + teamSlug + 'logowhite.webp';
  },

  /* ---- CIRCUIT IMAGES (from media.formula1.com, 2026) ---- */
  circuits: {
    australia:   '2026trackmelbournedetailed',
    china:       '2026trackshanghaidetailed',
    japan:       '2026tracksuzukadetailed',
    bahrain:     { img: '2026tracksakhirdetailed', invert: true },
    saudi:       '2026trackjeddahdetailed',
    miami:       '2026trackmiamidetailed',
    canada:      '2026trackmontrealdetailed',
    monaco:      '2026trackmontecarlodetailed',
    barcelona:   '2026trackcatalunyadetailed',
    austria:     '2026trackspielbergdetailed',
    britain:     '2026tracksilverstonedetailed',
    belgium:     '2026trackspafrancorchampsdetailed',
    hungary:     '2026trackhungaroringdetailed',
    netherlands: '2026trackzandvoortdetailed',
    italy:       '2026trackmonzadetailed',
    madrid:      '2026trackmadringdetailed',
    azerbaijan:  '2026trackbakudetailed',
    singapore:   '2026tracksingaporedetailed',
    usa:         '2026trackaustindetailed',
    mexico:      '2026trackmexicocitydetailed',
    brazil:      '2026trackinterlagosdetailed',
    lasvegas:    '2026tracklasvegasdetailed',
    qatar:       '2026tracklusaildetailed',
    abudhabi:    '2026trackyasmarinacircuitdetailed'
  },

  /* ---- RACE CALENDAR (2026) ----
     Source: formula1.com/en/racing/2026
     Race day = Sunday of weekend; weekends shown as Fri-Sun
     Status: R1 = 'next' (race day tomorrow March 8); all others = 'upcoming'
  ---- */
  races: [
    { round:1,  key:'australia',  name:'Australian Grand Prix',            nameZH:'澳洲大獎賽',          circuit:'Albert Park Circuit',                    circuitZH:'艾伯特公園賽道',        country:'Australia',     countryZH:'澳洲',      flag:'🇦🇺', date:'2026-03-08', display:'MAR 8',  weekend:'6–8 Mar',  status:'done',     winner:'Russell', length:'5.278 km', laps:58, lapRecord:'1:19.813', turns:16 },
    { round:2,  key:'china',      name:'Chinese Grand Prix',               nameZH:'中國大獎賽',           circuit:'Shanghai International Circuit',         circuitZH:'上海國際賽車場',         country:'China',         countryZH:'中國',      flag:'🇨🇳', date:'2026-03-15', display:'MAR 15', weekend:'13–15 Mar', status:'next',    winner:null, length:'5.451 km', laps:56, lapRecord:'1:32.238', turns:16 },
    { round:3,  key:'japan',      name:'Japanese Grand Prix',              nameZH:'日本大獎賽',           circuit:'Suzuka International Racing Course',     circuitZH:'鈴鹿國際賽道',           country:'Japan',         countryZH:'日本',      flag:'🇯🇵', date:'2026-03-29', display:'MAR 29', weekend:'27–29 Mar', status:'upcoming', winner:null, length:'5.807 km', laps:53, lapRecord:'1:30.983', turns:18 },
    { round:4,  key:'bahrain',    name:'Bahrain Grand Prix',               nameZH:'巴林大獎賽',           circuit:'Bahrain International Circuit',          circuitZH:'巴林國際賽道',           country:'Bahrain',       countryZH:'巴林',      flag:'🇧🇭', date:'2026-04-12', display:'APR 12', weekend:'10–12 Apr', status:'upcoming', winner:null, length:'5.412 km', laps:57, lapRecord:'1:31.447', turns:15 },
    { round:5,  key:'saudi',      name:'Saudi Arabian Grand Prix',         nameZH:'沙烏地阿拉伯大獎賽',    circuit:'Jeddah Corniche Circuit',                circuitZH:'吉達街道賽道',           country:'Saudi Arabia',  countryZH:'沙烏地阿拉伯', flag:'🇸🇦', date:'2026-04-19', display:'APR 19', weekend:'17–19 Apr', status:'upcoming', winner:null, length:'6.174 km', laps:50, lapRecord:'1:30.734', turns:27 },
    { round:6,  key:'miami',      name:'Miami Grand Prix',                 nameZH:'邁阿密大獎賽',          circuit:'Miami International Autodrome',          circuitZH:'邁阿密國際賽道',         country:'USA',           countryZH:'美國',      flag:'🇺🇸', date:'2026-05-03', display:'MAY 3',  weekend:'1–3 May',  status:'upcoming', winner:null, length:'5.412 km', laps:57, lapRecord:'1:29.708', turns:19 },
    { round:7,  key:'canada',     name:'Canadian Grand Prix',              nameZH:'加拿大大獎賽',          circuit:'Circuit Gilles Villeneuve',              circuitZH:'吉勒·維勒納夫賽道',      country:'Canada',        countryZH:'加拿大',    flag:'🇨🇦', date:'2026-05-24', display:'MAY 24', weekend:'22–24 May', status:'upcoming', winner:null, length:'4.361 km', laps:70, lapRecord:'1:13.078', turns:14 },
    { round:8,  key:'monaco',     name:'Monaco Grand Prix',                nameZH:'摩納哥大獎賽',          circuit:'Circuit de Monaco',                      circuitZH:'摩納哥賽道',             country:'Monaco',        countryZH:'摩納哥',    flag:'🇲🇨', date:'2026-06-07', display:'JUN 7',  weekend:'5–7 Jun',  status:'upcoming', winner:null, length:'3.337 km', laps:78, lapRecord:'1:12.909', turns:19 },
    { round:9,  key:'barcelona',  name:'Barcelona-Catalunya Grand Prix',   nameZH:'巴塞隆納-加泰羅尼亞大獎賽', circuit:'Circuit de Barcelona-Catalunya',       circuitZH:'巴塞隆納-加泰羅尼亞賽道',   country:'Spain',         countryZH:'西班牙',    flag:'🇪🇸', date:'2026-06-14', display:'JUN 14', weekend:'12–14 Jun', status:'upcoming', winner:null, length:'4.657 km', laps:66, lapRecord:'1:18.149', turns:16 },
    { round:10, key:'austria',    name:'Austrian Grand Prix',              nameZH:'奧地利大獎賽',          circuit:'Red Bull Ring',                          circuitZH:'紅牛賽道',               country:'Austria',       countryZH:'奧地利',    flag:'🇦🇹', date:'2026-06-28', display:'JUN 28', weekend:'26–28 Jun', status:'upcoming', winner:null, length:'4.318 km', laps:71, lapRecord:'1:05.619', turns:10 },
    { round:11, key:'britain',    name:'British Grand Prix',               nameZH:'英國大獎賽',            circuit:'Silverstone Circuit',                    circuitZH:'銀石賽道',               country:'Great Britain', countryZH:'英國',      flag:'🇬🇧', date:'2026-07-05', display:'JUL 5',  weekend:'3–5 Jul',  status:'upcoming', winner:null, length:'5.891 km', laps:52, lapRecord:'1:27.097', turns:18 },
    { round:12, key:'belgium',    name:'Belgian Grand Prix',               nameZH:'比利時大獎賽',          circuit:'Circuit de Spa-Francorchamps',           circuitZH:'斯帕-弗朗科爾尚賽道',    country:'Belgium',       countryZH:'比利時',    flag:'🇧🇪', date:'2026-07-19', display:'JUL 19', weekend:'17–19 Jul', status:'upcoming', winner:null, length:'7.004 km', laps:44, lapRecord:'1:46.286', turns:19 },
    { round:13, key:'hungary',    name:'Hungarian Grand Prix',             nameZH:'匈牙利大獎賽',          circuit:'Hungaroring',                            circuitZH:'匈牙利賽道',             country:'Hungary',       countryZH:'匈牙利',    flag:'🇭🇺', date:'2026-07-26', display:'JUL 26', weekend:'24–26 Jul', status:'upcoming', winner:null, length:'4.381 km', laps:70, lapRecord:'1:16.627', turns:14 },
    { round:14, key:'netherlands',name:'Dutch Grand Prix',                 nameZH:'荷蘭大獎賽',            circuit:'Circuit Zandvoort',                      circuitZH:'贊德沃特賽道',           country:'Netherlands',   countryZH:'荷蘭',      flag:'🇳🇱', date:'2026-08-23', display:'AUG 23', weekend:'21–23 Aug', status:'upcoming', winner:null, length:'4.259 km', laps:72, lapRecord:'1:11.097', turns:14 },
    { round:15, key:'italy',      name:'Italian Grand Prix',               nameZH:'義大利大獎賽',          circuit:'Autodromo Nazionale di Monza',           circuitZH:'蒙扎賽道',               country:'Italy',         countryZH:'義大利',    flag:'🇮🇹', date:'2026-09-06', display:'SEP 6',  weekend:'4–6 Sep',  status:'upcoming', winner:null, length:'5.793 km', laps:53, lapRecord:'1:21.046', turns:11 },
    { round:16, key:'madrid',     name:'Spanish Grand Prix',               nameZH:'西班牙大獎賽（馬德里）',  circuit:'Madring — IFEMA Madrid Circuit',         circuitZH:'馬德里IFEMA賽道',        country:'Spain',         countryZH:'西班牙',    flag:'🇪🇸', date:'2026-09-13', display:'SEP 13', weekend:'11–13 Sep', status:'upcoming', winner:null, length:'5.416 km', laps:55, lapRecord:'—', turns:22 },
    { round:17, key:'azerbaijan', name:'Azerbaijan Grand Prix',            nameZH:'亞塞拜然大獎賽',         circuit:'Baku City Circuit',                      circuitZH:'巴庫市街賽道',           country:'Azerbaijan',    countryZH:'亞塞拜然',  flag:'🇦🇿', date:'2026-09-26', display:'SEP 26', weekend:'24–26 Sep', status:'upcoming', winner:null, length:'6.003 km', laps:51, lapRecord:'1:43.009', turns:20 },
    { round:18, key:'singapore',  name:'Singapore Grand Prix',             nameZH:'新加坡大獎賽',          circuit:'Marina Bay Street Circuit',              circuitZH:'濱海灣街道賽道',         country:'Singapore',     countryZH:'新加坡',    flag:'🇸🇬', date:'2026-10-11', display:'OCT 11', weekend:'9–11 Oct', status:'upcoming', winner:null, length:'5.063 km', laps:62, lapRecord:'1:35.867', turns:23 },
    { round:19, key:'usa',        name:'United States Grand Prix',         nameZH:'美國大獎賽',            circuit:'Circuit of The Americas',                circuitZH:'美洲賽道',               country:'USA',           countryZH:'美國',      flag:'🇺🇸', date:'2026-10-25', display:'OCT 25', weekend:'23–25 Oct', status:'upcoming', winner:null, length:'5.513 km', laps:56, lapRecord:'1:36.169', turns:20 },
    { round:20, key:'mexico',     name:'Mexico City Grand Prix',           nameZH:'墨西哥城大獎賽',         circuit:'Autodromo Hermanos Rodriguez',           circuitZH:'埃爾馬諾斯賽道',         country:'Mexico',        countryZH:'墨西哥',    flag:'🇲🇽', date:'2026-11-01', display:'NOV 1',  weekend:'30 Oct–1 Nov', status:'upcoming', winner:null, length:'4.304 km', laps:71, lapRecord:'1:17.774', turns:17 },
    { round:21, key:'brazil',     name:'São Paulo Grand Prix',             nameZH:'聖保羅大獎賽',          circuit:'Autodromo Jose Carlos Pace (Interlagos)', circuitZH:'英特拉格斯賽道',         country:'Brazil',        countryZH:'巴西',      flag:'🇧🇷', date:'2026-11-08', display:'NOV 8',  weekend:'6–8 Nov',  status:'upcoming', winner:null, length:'4.309 km', laps:71, lapRecord:'1:10.540', turns:15 },
    { round:22, key:'lasvegas',   name:'Las Vegas Grand Prix',             nameZH:'拉斯維加斯大獎賽',       circuit:'Las Vegas Street Circuit',               circuitZH:'拉斯維加斯街道賽道',     country:'USA',           countryZH:'美國',      flag:'🇺🇸', date:'2026-11-21', display:'NOV 21', weekend:'19–21 Nov', status:'upcoming', winner:null, length:'6.201 km', laps:50, lapRecord:'1:35.490', turns:17 },
    { round:23, key:'qatar',      name:'Qatar Grand Prix',                 nameZH:'卡達大獎賽',            circuit:'Lusail International Circuit',           circuitZH:'盧塞爾國際賽道',         country:'Qatar',         countryZH:'卡達',      flag:'🇶🇦', date:'2026-11-29', display:'NOV 29', weekend:'27–29 Nov', status:'upcoming', winner:null, length:'5.380 km', laps:57, lapRecord:'1:24.319', turns:16 },
    { round:24, key:'abudhabi',   name:'Abu Dhabi Grand Prix',             nameZH:'阿布達比大獎賽',         circuit:'Yas Marina Circuit',                     circuitZH:'亞斯馬利納賽道',         country:'Abu Dhabi',     countryZH:'阿布達比', flag:'🇦🇪', date:'2026-12-06', display:'DEC 6',  weekend:'4–6 Dec',  status:'upcoming', winner:null, length:'5.281 km', laps:58, lapRecord:'1:26.103', turns:16 }
  ],

  /* ---- NEWS ----
     Real headlines from formula1.com (March 7, 2026 — Australia Qualifying Day)
     Article bodies are editorial summaries based on official reports.
  ---- */
  news: [
    {
      id: 9,
      cat:      { en: 'Race', zh: '正賽' },
      tag:      { en: 'Race Report', zh: '賽事報導' },
      title:    { en: "Russell Wins Season Opener as Mercedes Deliver Dominant 1-2 in Australia", zh: "羅素澳洲站封王 梅賽德斯以壓倒性1-2開啟賽季" },
      excerpt:  { en: "George Russell led from pole to chequered flag at Albert Park, with team-mate Kimi Antonelli completing a perfect Mercedes 1-2. Three VSC deployments created a strategic chess match that the Silver Arrows mastered.", zh: "喬治·羅素在艾伯特公園從桿位一路領先到方格旗，隊友基米·安托內利完成梅賽德斯完美的1-2。三次VSC為比賽增添了策略博弈的元素，銀箭車隊完全掌控了全局。" },
      date:     { en: 'Mar 8, 2026', zh: '2026年3月8日' },
      readTime: { en: '6 min read', zh: '6分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>George Russell converted his pole position into a commanding victory at the 2026 Australian Grand Prix, leading a Mercedes 1-2 finish that sent a powerful statement to the rest of the grid at Albert Park.</p><p>Russell controlled the race from lights out, never seriously threatened despite three Virtual Safety Car periods that compressed the field and forced teams into rapid strategic recalculations. The 28-year-old crossed the line 4.2 seconds ahead of team-mate Kimi Antonelli, who drove a mature race to secure second on his full-season debut.</p><p>Charles Leclerc took the final podium spot for Ferrari after a strong recovery from fourth on the grid, with Lewis Hamilton completing a solid weekend in fourth place. Reigning champion Lando Norris finished fifth for McLaren, while the story of the race was Max Verstappen\'s extraordinary charge from P22 to P6, earning him Driver of the Day honours.</p><p>The race was marred by a pre-race drama when Oscar Piastri crashed on the warm-up lap heading to the grid, denying the home favourite any chance of racing in front of his fans. Nico Hülkenberg also failed to start due to a power unit issue on the formation lap.</p><p>Mercedes\' aggressive pit strategy under Virtual Safety Car conditions proved decisive. Team principal Toto Wolff called it "the perfect execution of a perfect weekend" as the team scored maximum points — 43 out of a possible 44 — to lead the Constructors\' Championship from the opening round.</p>',
        zh: '<p>喬治·羅素將桿位成功轉化為2026年澳洲大獎賽的制勝表現，帶領梅賽德斯在艾伯特公園完成1-2終局，向其他車隊發出了有力的信號。</p><p>羅素從起步燈熄滅就掌控了整場比賽，儘管三次虛擬安全車壓縮了車陣、迫使各隊迅速調整策略，他始終未受到實質威脅。這位28歲的英國車手以4.2秒的優勢領先隊友基米·安托內利衝線，後者在首個完整賽季的首場比賽中展現了成熟的駕駛拿下第二。</p><p>查理斯·勒克萊爾在從第四位出發後強勢追趕，為法拉利奪得第三名站上頒獎台。漢米爾頓以第四名完成了穩健的週末。衛冕冠軍蘭多·諾里斯為麥拿侖取得第五名。而比賽最大亮點是麥斯·維斯達彭從第22位一路追趕到第6名的驚人表現，他也因此獲得了「全場最佳車手」的殊榮。</p><p>比賽開始前就出現戲劇性一幕——主場寵兒奧斯卡·皮亞斯特里在暖胎圈前往發車格的途中撞車，令他在自家車迷面前失去了比賽的機會。尼科·胡肯堡也因發車圈動力單元故障而未能起跑。</p><p>梅賽德斯在虛擬安全車期間的進攻性進站策略證明是決定性的。車隊領隊托托·沃爾夫稱這是「完美週末的完美執行」，車隊以43分（滿分44分）的成績從首站起就領跑車隊積分榜。</p>'
      }
    },
    {
      id: 10,
      cat:      { en: 'Race', zh: '正賽' },
      tag:      { en: 'Highlight', zh: '焦點' },
      title:    { en: "Verstappen P22 to P6: 'The Car Is Strong, That Gives Me Confidence'", zh: "維斯達彭P22到P6：「賽車很強，這讓我充滿信心」" },
      excerpt:  { en: "Max Verstappen turned his disastrous qualifying into a remarkable recovery drive, slicing from last to sixth and setting the fastest lap of the race at 1:22.091 to earn Driver of the Day.", zh: "麥斯·維斯達彭將災難性的排位結果轉化為一場精彩的逆襲之旅，從最後一位追趕至第六名，並以1:22.091跑出全場最快單圈，榮獲全場最佳車手。" },
      date:     { en: 'Mar 8, 2026', zh: '2026年3月8日' },
      readTime: { en: '4 min read', zh: '4分鐘閱讀' },
      source:   'the-race.com',
      body: {
        en: '<p>Max Verstappen delivered a masterclass in recovery driving at the Australian Grand Prix, climbing from 22nd on the grid to sixth place in what he described as a "damage limitation" performance that nonetheless showcased Red Bull\'s underlying pace.</p><p>The four-time world champion, forced to start last after his Q1 crash, carved through the field with precise overtaking and aggressive strategy calls. His fastest lap of 1:22.091 was the quickest of anyone all weekend, a stat that will concern Mercedes despite their dominant 1-2 finish.</p><p>"When you start last, you have nothing to lose," Verstappen said. "The car felt incredible today — much better than qualifying, obviously. We had a different rear brake setup and it was perfect. I could push hard from the first lap."</p><p>Verstappen used a three-stop strategy to great effect, taking advantage of each Virtual Safety Car period to make pit stops with minimal time loss. His sequence of overtakes through the midfield was reminiscent of his best drives, with decisive passes on Gasly, Bortoleto, and Lindblad all executed cleanly.</p><p>"P6 is not where we want to be, but given where we started, I\'ll take it," he added. "We scored eight points, and the pace of the car tells me we\'ll be fighting at the front soon. Isack\'s retirement was unfortunate — the car was quick enough for the podium."</p>',
        zh: '<p>麥斯·維斯達彭在澳洲大獎賽中展示了一堂逆境求生的大師課，從第22位出發一路追趕至第六名，他形容這是一場「止損」的表現，但同時也展示了紅牛底層的強大速度。</p><p>這位四屆世界冠軍因Q1的撞車被迫從最後出發，以精準的超車和積極的策略穿越車陣。他的最快圈速1:22.091是整個週末所有車手中最快的，這個數據即使在梅賽德斯壓倒性1-2的光環下也令人擔憂。</p><p>維斯達彭說：「當你從最後出發時，你沒什麼可失去的。今天的賽車感覺非常好——顯然比排位賽好得多。我們換了不同的後輪剎車設定，效果完美。從第一圈開始我就能全力推進。」</p><p>維斯達彭運用三停策略發揮了極大效果，利用每次虛擬安全車的機會進站，將時間損失降到最低。他在中游車陣中的一連串超車令人回想起他最精彩的比賽——對加斯利、博爾托萊托和林德布拉德的超越都執行得乾淨利落。</p><p>他補充道：「第六名不是我們想要的位置，但考慮到出發位置，我接受這個結果。我們拿到了八分，而賽車的速度告訴我，我們很快就會在前方作戰。哈達爾的退賽很不幸——那台車的速度足以爭奪頒獎台。」</p>'
      }
    },
    {
      id: 11,
      cat:      { en: 'Race', zh: '正賽' },
      tag:      { en: 'Incident', zh: '事故' },
      title:    { en: "Piastri's Warm-Up Lap Crash Ends Home Race Before It Starts", zh: "皮亞斯特里暖胎圈撞車 主場大獎賽未開始就結束" },
      excerpt:  { en: "Oscar Piastri's nightmare debut weekend for McLaren as an F1 title contender ended with heartbreak on the warm-up lap when a suspected hydraulic failure sent him into the barrier at Turn 6.", zh: "奧斯卡·皮亞斯特里作為F1冠軍爭奪者在麥拿侖的噩夢般的首站週末以心碎收場——疑似液壓故障在暖胎圈將他送入第6彎的圍欄。" },
      date:     { en: 'Mar 8, 2026', zh: '2026年3月8日' },
      readTime: { en: '3 min read', zh: '3分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>Oscar Piastri\'s 2026 season could not have started more cruelly. The Australian driver, who qualified a promising fifth at his home Grand Prix, never made it to the starting grid after a suspected hydraulic failure caused him to crash on the warm-up lap at Turn 6.</p><p>Piastri\'s McLaren snapped sideways without warning as he navigated the high-speed left-hander, sending the car into the barrier with enough force to cause significant damage. The 24-year-old was able to climb out unassisted but was visibly devastated as he walked back to the paddock.</p><p>"I had no warning," Piastri told Sky Sports. "The car just went and there was nothing I could do. To not even start my home race — it\'s the worst feeling. I feel terrible for the team as well, they gave me a car that could fight for the podium."</p><p>McLaren team principal Andrea Stella confirmed the team is investigating a potential hydraulic system failure. "We are deeply sorry for Oscar. The initial data suggests a sudden loss of hydraulic pressure which affected the power steering. We need to understand why and make sure it doesn\'t happen again."</p><p>Team-mate Lando Norris salvaged 10 points with fifth place, but the DNS represents a significant early setback for McLaren\'s constructors\' championship defence.</p>',
        zh: '<p>奧斯卡·皮亞斯特里的2026年賽季不可能有比這更殘忍的開始了。這位澳洲車手在主場大獎賽排位賽中拿到了充滿希望的第五位，但在暖胎圈中疑似液壓故障導致他在6號彎撞車，未能抵達發車格。</p><p>皮亞斯特里的麥拿侖賽車在他通過高速左彎時毫無預警地橫滑，將賽車撞上圍欄，力道之大造成了嚴重損壞。這位24歲的車手自行爬出賽車，但走回圍場時的神情明顯崩潰。</p><p>皮亞斯特里告訴Sky Sports：「完全沒有預兆。賽車就這樣失控了，我什麼都做不了。連自己的主場大獎賽都無法起跑——這是最糟糕的感受。我也為車隊感到難過，他們給了我一台能爭奪頒獎台的賽車。」</p><p>麥拿侖車隊領隊安德烈亞·斯特拉確認車隊正在調查可能的液壓系統故障。「我們為奧斯卡深感抱歉。初步數據顯示液壓壓力突然下降影響了動力轉向。我們需要了解原因並確保不再發生。」</p><p>隊友蘭多·諾里斯以第五名挽回10分，但這次DNS對麥拿侖衛冕車隊冠軍的征途是一個重大的早期挫折。</p>'
      }
    },
    {
      id: 12,
      cat:      { en: 'Race', zh: '正賽' },
      tag:      { en: 'Analysis', zh: '分析' },
      title:    { en: "Rookies Shine: Hadjar, Antonelli, Lindblad & Bortoleto All Impress in Melbourne", zh: "新秀閃耀：哈達爾、安托內利、林德布拉德、博爾托萊托在墨爾本大放異彩" },
      excerpt:  { en: "The 2026 rookie class made a spectacular first impression. Antonelli secured P2, Lindblad finished P8 for Racing Bulls, Bortoleto scored points for Audi on debut, while Hadjar showed podium pace before retiring.", zh: "2026年的新秀陣容留下了驚艷的第一印象。安托內利奪得P2，林德布拉德為鬥牛車隊取得P8，博爾托萊托為奧迪在首站即拿積分，哈達爾在退賽前展現了領獎台級的速度。" },
      date:     { en: 'Mar 8, 2026', zh: '2026年3月8日' },
      readTime: { en: '4 min read', zh: '4分鐘閱讀' },
      source:   'the-race.com',
      body: {
        en: '<p>The 2026 Formula 1 rookie class announced itself with authority at the Australian Grand Prix, with all four newcomers delivering performances that exceeded expectations and demonstrated the depth of young talent in the sport.</p><p>Kimi Antonelli\'s second-place finish was the headline act. The 19-year-old Italian, partnering George Russell at Mercedes, drove with a composure that belied his age and experience. Starting second, he held station through three VSC periods and fended off late pressure from Leclerc to secure his maiden F1 podium at the first attempt.</p><p>Arvid Lindblad, the 17-year-old Briton at Racing Bulls, qualified a remarkable ninth and converted that into an eighth-place finish worth four championship points. "I didn\'t expect to score points in my first race," Lindblad admitted. "The team gave me a great car and I just tried to be consistent."</p><p>Gabriel Bortoleto brought his Audi home in ninth place for two points — a hugely encouraging result for a team that struggled through much of 2025 under the Sauber banner. The Brazilian showed excellent racecraft in wheel-to-wheel battles through the midfield.</p><p>The only rookie to miss out was Isack Hadjar, whose Red Bull suffered a mechanical failure on lap 10 while running in podium contention. Having qualified an incredible third, Hadjar had shown pace to match Russell in the early laps before his car gave up. "Devastated," was his one-word reaction.</p>',
        zh: '<p>2026年F1新秀在澳洲大獎賽以強而有力的方式宣告自己的到來，四位新人的表現全部超出預期，展示了這項運動中年輕人才的深度。</p><p>基米·安托內利的第二名是最大的頭條。這位19歲的意大利人搭檔喬治·羅素在梅賽德斯效力，以超越年齡和經驗的沉穩完成比賽。從第二位出發，他在三次VSC中保持位置，並在後段頂住了勒克萊爾的壓力，在首場F1比賽就登上頒獎台。</p><p>17歲的英國車手阿爾維德·林德布拉德在鬥牛車隊排位第九，並將其轉化為第八名的成績，收穫四個積分。林德布拉德坦言：「我沒想到第一場比賽就能拿分。車隊給了我一台出色的賽車，我只是盡量保持穩定。」</p><p>加布里埃爾·博爾托萊托為奧迪取得第九名收穫兩分——對於一支在2025年以索伯名義掙扎了大半年的車隊來說，這是極其鼓舞人心的結果。這位巴西車手在中游車陣的輪對輪較量中展現了出色的比賽技巧。</p><p>唯一未能得分的新秀是伊薩克·哈達爾，他的紅牛在第10圈處於領獎台爭奪位置時遭遇機械故障退賽。哈達爾以令人難以置信的第三名起步，在開賽初段展現了與羅素匹敵的速度，隨後賽車放棄了。「崩潰」是他唯一的反應。</p>'
      }
    },
    {
      id: 1,
      cat:      { en: 'Qualifying', zh: '排位賽' },
      tag:      { en: 'Qualifying', zh: '排位賽' },
      title:    { en: "Russell Storms to Pole for Season-Opening Australian GP", zh: "羅素橫掃澳洲站桿位 揭開2026賽季序幕" },
      excerpt:  { en: "George Russell produced a dominant qualifying performance at Albert Park to claim pole position for the 2026 season opener, with team-mate Kimi Antonelli second and rookie Isack Hadjar an impressive third for Red Bull.", zh: "喬治·羅素在艾伯特公園賽道展示全面壓制的排位賽表現，奪得2026賽季首站桿位，隊友基米·安托內利位居第二，紅牛新秀伊薩克·哈達爾以第三名令人印象深刻。" },
      date:     { en: 'Mar 7, 2026', zh: '2026年3月7日' },
      readTime: { en: '5 min read', zh: '5分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>George Russell delivered a stunning qualifying lap to take pole position for the 2026 Formula 1 season opener at Melbourne\'s Albert Park circuit, putting Mercedes firmly in the driving seat ahead of Sunday\'s race.</p><p>Russell\'s lap of 1:18.518 was three tenths faster than team-mate Kimi Antonelli\'s 1:18.811, with the Italian teenager showing tremendous composure despite a mid-session scare that forced his mechanics into a frantic repair effort between Q2 and Q3.</p><p>"The car just came alive in Q3," Russell told reporters. "We knew we had a strong package coming in, but I\'m not sure even we expected to be this far ahead. The team has done an incredible job over the winter."</p><p>Red Bull\'s Isack Hadjar — making his Formula 1 debut — was the sensation of qualifying, claiming third place on 1:19.303 ahead of Ferrari\'s Charles Leclerc. The young Frenchman outperformed his vastly more experienced team-mate Max Verstappen, who suffered a shock crash in Q1 that effectively ended the reigning four-time champion\'s qualifying session early.</p><p>Ferrari\'s performance was described as "disappointing" by Leclerc himself. Despite leading both Friday practice sessions, the Scuderia found Mercedes had made a decisive overnight step, leaving Leclerc fourth and Lewis Hamilton seventh — a significant gap to the Silver Arrows.</p><p>Reigning world champion Lando Norris — carrying number 1 for the first time — will start sixth after track debris forced him to abandon his final Q3 flying lap at a critical moment. McLaren believe without the incident he was capable of P3 or better.</p>',
        zh: '<p>喬治·羅素在墨爾本艾伯特公園賽道交出一圈震撼人心的排位賽圈速，奪得2026年F1賽季首站桿位，梅賽德斯在週日正賽前確立了主導地位。</p><p>羅素以1:18.518的圈速領先隊友基米·安托內利的1:18.811達0.3秒，這位意大利青少年雖然在排位賽中途遭遇驚險情況，迫使機械師在Q2和Q3之間緊急維修，仍展現出驚人的沉著。</p><p>羅素賽後告訴記者：「賽車在Q3突然變得極為順手。我們知道帶來了一個強勁的方案，但我也不確定我們自己是否預期到能領先這麼多。車隊整個冬天做了非常出色的工作。」</p><p>紅牛的伊薩克·哈達爾——正式進行F1首秀——成為排位賽最大亮點，以1:19.303奪得第三，超越法拉利的查理斯·勒克萊爾。這位年輕的法國車手表現超越了經驗豐富得多的隊友麥斯·維斯達彭——後者在Q1遭遇震驚全場的意外，令這位四屆世界冠軍的排位賽提前結束。</p><p>勒克萊爾本人形容法拉利的表現「令人失望」。儘管周五的兩節練習賽中法拉利均領跑，但梅賽德斯在一夜之間完成了決定性的進步，令勒克萊爾只能位居第四，漢米爾頓則排在第七——與銀箭的差距令人憂慮。</p><p>衛冕冠軍蘭多·諾里斯——首次使用1號車牌——在Q3最後一圈遭遇賽道碎片被迫放棄飛行圈，只能以第六名出賽。麥拿侖認為若無此意外，他有能力衝擊前三。</p>'
      }
    },
    {
      id: 2,
      cat:      { en: 'Qualifying', zh: '排位賽' },
      tag:      { en: 'Incident', zh: '事故' },
      title:    { en: "Verstappen Explains Cause of Q1 Crash in Australia", zh: "維斯達彭解釋澳洲站Q1意外成因" },
      excerpt:  { en: "Max Verstappen revealed that a rear brake issue caused him to lock up at Turn 1 in Q1, sending him into the barrier and leaving him starting last for Sunday's season opener.", zh: "麥斯·維斯達彭透露是後輪剎車問題導致他在Q1一號彎鎖死輪胎衝入圍欄，將在週日賽季揭幕戰從最後位置出發。" },
      date:     { en: 'Mar 7, 2026', zh: '2026年3月7日' },
      readTime: { en: '3 min read', zh: '3分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>Max Verstappen provided a frank explanation after his dramatic Q1 exit at the Australian Grand Prix, citing an unexpected rear brake issue as the root cause of his crash at Turn 1 that will see him start Sunday\'s season opener from the back of the grid.</p><p>The four-time world champion arrived at Q1 having shown promising pace in practice, but as he approached Turn 1 on his first flying lap, the rear axle locked under braking, throwing the car across the gravel trap and into the barrier.</p><p>"I hit the brakes and immediately felt the rear lock up completely," Verstappen explained in the post-session press conference. "There was nothing I could do at that point — the car just went straight. It\'s incredibly frustrating because the pace was there."</p><p>Red Bull confirmed the car sustained significant damage to the floor and rear wing assembly and their engineers worked through the night to repair it for Sunday\'s race. Verstappen will start 22nd — last on the grid — in what will be his worst starting position in several years.</p><p>"I\'ve come from the back before. It\'s not ideal, but I\'ll be focused on making progress through the field and scoring points," he added. "The car is strong. We know that from practice."</p>',
        zh: '<p>麥斯·維斯達彭在澳洲大獎賽Q1戲劇性退場後坦誠說明原因，他指出後輪剎車突發問題是他在一號彎意外的根本原因，這也意味著他將在週日揭幕戰從最後位置出發。</p><p>這位四屆世界冠軍在練習賽中展現了令人期待的速度，但當他在Q1第一圈飛行圈接近一號彎時，後橋在制動下完全鎖死，賽車衝越碎石區撞上圍欄。</p><p>維斯達彭在賽後新聞發佈會上解釋道：「我踩下剎車，立刻感覺後輪完全鎖死。那一刻已無能為力——賽車就直衝出去了。這非常令人沮喪，因為速度本來是有的。」</p><p>紅牛確認賽車底板和後翼總成受到嚴重損毀，工程師們通宵工作以修復賽車備戰週日正賽。維斯達彭將從第22位——最後一位——出發，這將是他多年來最差的出發位置。</p><p>他補充說：「我以前也從後面追過來過。這不是理想狀況，但我會專注於在車陣中取得進步並爭取積分。我們知道賽車的速度是在的，練習賽已經證明了這一點。」</p>'
      }
    },
    {
      id: 3,
      cat:      { en: 'Analysis', zh: '分析' },
      tag:      { en: 'Technical', zh: '技術' },
      title:    { en: "Ferrari 'Nowhere Near' Mercedes Pace in Australia — Leclerc", zh: "勒克萊爾：法拉利在澳洲「與梅賽德斯差距懸殊」" },
      excerpt:  { en: "Charles Leclerc expressed his surprise at the significant gap between Ferrari and Mercedes after qualifying, despite the Scuderia having led both Friday practice sessions at Albert Park.", zh: "查理斯·勒克萊爾對法拉利在排位賽中與梅賽德斯的巨大差距感到驚訝，儘管法拉利包攬了週五艾伯特公園兩節練習賽的領先。" },
      date:     { en: 'Mar 7, 2026', zh: '2026年3月7日' },
      readTime: { en: '4 min read', zh: '4分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>Charles Leclerc could not hide his disappointment after qualifying fourth for the Australian Grand Prix, acknowledging that Ferrari were "nowhere near" the pace of the dominant Mercedes in qualifying at Albert Park.</p><p>The contrast with practice was stark. Ferrari had led both Friday sessions, with Leclerc fastest in FP1 from Hamilton and Verstappen, and the team appeared to be genuine title contenders going into the weekend. But overnight, Mercedes found what Leclerc estimated was "almost a second" of performance improvement.</p><p>"In FP1 and FP2, we looked competitive. Something happened overnight at Mercedes that we didn\'t see coming," Leclerc told the assembled media. "They clearly found a big setup step or unlocked something in their tyres. We need to understand what happened and close that gap quickly."</p><p>Lewis Hamilton, starting seventh, echoed his team-mate\'s frustration: "The pace isn\'t where we need it to be. We have work to do. But qualifying is not the race — there are points to be scored tomorrow and our long-run pace data from practice was actually quite encouraging."</p><p>Ferrari technical director stressed that the team would conduct a thorough analysis overnight, and that the gap may partly reflect Mercedes running a more aggressive qualifying setup. Sunday\'s race, on a longer fuel load, may tell a different story.</p>',
        zh: '<p>查理斯·勒克萊爾在以第四名完成澳洲大獎賽排位賽後難掩失望，承認法拉利在艾伯特公園賽道的速度「與梅賽德斯差距懸殊」。</p><p>這與練習賽的情況形成鮮明對比。法拉利包攬了週五兩節練習賽的領先，勒克萊爾在FP1中以漢米爾頓和維斯達彭之前領跑，車隊看似是踏入這個週末時真正的冠軍競爭者。但一夜之間，梅賽德斯找到了勒克萊爾估計「接近一秒」的速度提升。</p><p>勒克萊爾對在場媒體說：「FP1和FP2時我們看起來很有競爭力。梅賽德斯在一夜之間發生了我們未預料到的事情。他們顯然找到了一個重大的設定突破，或者在輪胎使用上解鎖了某些東西。我們需要理解發生了什麼，並迅速縮小差距。」</p><p>從第七位出發的漢米爾頓呼應了隊友的沮喪：「速度還未達到我們需要的水平，我們有工作要做。但排位賽不是正賽——明天還有積分可以爭取，而且我們練習賽的長圈速度數據其實相當令人鼓舞。」</p><p>法拉利技術總監強調，車隊將通宵進行徹底分析，差距可能部分反映梅賽德斯採用了更進取的排位賽設定。週日正賽在更大燃油負載下，或許會呈現截然不同的景象。</p>'
      }
    },
    {
      id: 4,
      cat:      { en: 'Qualifying', zh: '排位賽' },
      tag:      { en: 'Qualifying', zh: '排位賽' },
      title:    { en: "Norris Rues Debris That 'Cost Me a Chance of P3' in Australia", zh: "諾里斯為澳洲站碎片事件扼腕：「那讓我錯失了第三名的機會」" },
      excerpt:  { en: "Lando Norris expressed frustration after track debris forced him to abandon his final Q3 lap, likely costing the reigning world champion a front-row berth at his title defence's opening round.", zh: "蘭多·諾里斯在排位賽後表達不滿，賽道碎片迫使他放棄Q3最後一圈，這很可能讓衛冕冠軍在衛冕第一站失去了前排出發的機會。" },
      date:     { en: 'Mar 7, 2026', zh: '2026年3月7日' },
      readTime: { en: '3 min read', zh: '3分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>Lando Norris could barely conceal his frustration in the post-qualifying paddock, after track debris cost him a shot at a much higher grid position for the season-opening Australian Grand Prix.</p><p>The reigning world champion, carrying number 1 on his McLaren for the first time, had shown strong pace throughout Q1 and Q2 but found his final Q3 flying lap compromised when he encountered debris on track at a crucial sector.</p><p>"I had to back off completely — there was something on the track at exactly the wrong moment," Norris said. "My engineer could see I was on for P3 or maybe better at that point. It\'s just bad luck, honestly."</p><p>McLaren\'s data confirmed that Norris was running comfortably inside a P3 time when the incident occurred. The team lodged no formal protest, accepting it as an unfortunate circumstance of racing.</p><p>"We\'re starting sixth and seventh [with Piastri fifth]," Norris added, trying to find perspective. "The car is quick. There\'s a lot of race to be run tomorrow, and this track historically makes for some very interesting strategic decisions. We\'ll push."</p>',
        zh: '<p>蘭多·諾里斯在排位賽後的維修區幾乎無法掩飾沮喪，賽道上的碎片讓他痛失在澳洲大獎賽衛冕開局時取得更佳出發位置的機會。</p><p>衛冕冠軍首次在麥拿侖賽車上使用1號車牌，整個Q1和Q2均展現了強勁速度，但他在Q3最後一圈飛行圈時在關鍵路段遭遇了賽道碎片。</p><p>諾里斯說：「我必須完全減速——碎片出現在最不該出現的時機。我的工程師可以看到我當時正在跑第三或可能更好的圈速。說實話，這只是倒楣。」</p><p>麥拿侖的數據確認，事故發生時諾里斯正以舒適優於第三名的節奏行駛。車隊並未提出正式抗議，接受了這是賽車運動中的不幸情況。</p><p>諾里斯補充道，試圖保持積極的態度：「我們從第六和第七位（皮亞斯特里第五）出發。賽車速度是有的。明天還有很多比賽要跑，而且這條賽道歷來有一些非常有趣的策略決策空間。我們會全力以赴。」</p>'
      }
    },
    {
      id: 5,
      cat:      { en: 'Qualifying', zh: '排位賽' },
      tag:      { en: 'Interview', zh: '訪談' },
      title:    { en: "Antonelli Praises Mechanic 'Heroes' After Qualifying Comeback", zh: "安托內利稱讚機械師「英雄們」成就排位賽逆境求生" },
      excerpt:  { en: "Kimi Antonelli credited his Mercedes mechanics after they performed emergency repairs between Q2 and Q3 to keep his title bid alive, allowing him to qualify an impressive second alongside Russell.", zh: "基米·安托內利向梅賽德斯機械師致敬，他們在Q2和Q3之間進行緊急維修，讓他的冠軍之路得以延續，最終以令人印象深刻的第二名資格入列隊友羅素旁邊。" },
      date:     { en: 'Mar 7, 2026', zh: '2026年3月7日' },
      readTime: { en: '3 min read', zh: '3分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>Kimi Antonelli dedicated his second-place qualifying result to the Mercedes mechanics who worked tirelessly to repair his car between sessions, allowing him to take part in Q3 after a scare in Q2 threatened to end his weekend early.</p><p>Antonelli had suffered a suspected sensor failure in Q2 that caused an unusual vibration through his steering wheel. The mechanics diagnosed and resolved the issue during the brief window between sessions, enabling the 18-year-old to return for Q3 and deliver a stunning 1:18.811 — just three tenths off pole.</p><p>"Honestly, those guys are heroes," Antonelli said, visibly emotional. "What they did between Q2 and Q3 — the speed, the precision — it was incredible. I got back in the car and the problem was completely gone. I just had to focus and drive."</p><p>The result continues Antonelli\'s impressive integration into Mercedes following his 2025 debut season. Starting alongside Russell on the front row for his first race of 2026, the Italian remains one of the most closely watched young talents in the paddock.</p>',
        zh: '<p>基米·安托內利將第二名的排位賽成績獻給梅賽德斯機械師，正是這些人在排位賽場次間不知疲倦地維修他的賽車，讓他在Q2的危機後能夠參加Q3。</p><p>安托內利在Q2期間疑似遭遇感應器故障，在方向盤上產生異常震動。機械師們在場次之間的短暫窗口內診斷並解決了問題，讓這位18歲車手能夠返回Q3，並交出令人讚嘆的1:18.811——距離桿位僅0.3秒。</p><p>安托內利說，神情明顯動容：「說真的，這些人是英雄。他們在Q2和Q3之間所做的事——速度、精準度——真的太令人難以置信了。我回到賽車裡，問題已經完全消失了。我只需要專注駕駛就好。」</p><p>這個成績延續了安托內利在2025賽季首秀後融入梅賽德斯的令人印象深刻的過程。在2026年首站與羅素並排在前排出發，這位義大利車手仍然是維修區中受到最密切關注的年輕才俊之一。</p>'
      }
    },
    {
      id: 6,
      cat:      { en: 'Debut', zh: '首秀' },
      tag:      { en: 'Interview', zh: '訪談' },
      title:    { en: "P3 'Perfect Start to My Red Bull Career' — Hadjar", zh: "哈達爾：第三名是「我紅牛生涯完美的開始」" },
      excerpt:  { en: "Isack Hadjar reflected with delight on his stunning P3 qualifying result on his Red Bull debut, calling it a 'perfect start' as he prepares to race alongside — and well ahead of — four-time champion Max Verstappen.", zh: "伊薩克·哈達爾在紅牛首秀中奪得令人震驚的排位賽第三，他興奮地稱之為「完美的開始」，並準備在正賽中在四屆世界冠軍麥斯·維斯達彭之前出發。" },
      date:     { en: 'Mar 7, 2026', zh: '2026年3月7日' },
      readTime: { en: '3 min read', zh: '3分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>Isack Hadjar beamed with barely-contained excitement after qualifying third for the season-opening Australian Grand Prix on his Red Bull Racing debut, calling the result "a perfect start" to his Formula 1 career at the top level.</p><p>The 20-year-old Frenchman — promoted to the senior Red Bull team for 2026 after impressing at Racing Bulls — posted a 1:19.303 to line up on the second row alongside Ferrari\'s Charles Leclerc, and strikingly 19 places ahead of his team-mate Verstappen who crashed in Q1.</p><p>"To come here, do my first qualifying session with Red Bull, and get P3 — I still can\'t believe it," Hadjar said. "I felt so comfortable in the car from the first lap of practice. The team has been incredibly supportive and given me everything I need to perform."</p><p>For Red Bull, Hadjar\'s performance partially softened the blow of Verstappen\'s Q1 exit. Team principal Christian Horner described it as an "extraordinarily impressive" debut and expressed confidence that Verstappen would recover through the field on Sunday.</p>',
        zh: '<p>伊薩克·哈達爾在為紅牛賽車首秀的澳洲大獎賽排位賽中奪得第三後，難掩興奮地說，這是他F1頂級職業生涯「完美的開始」。</p><p>這位20歲的法國車手——在鬥牛車隊表現亮眼後晉升至紅牛一隊參加2026年賽季——以1:19.303排在第二排，緊鄰法拉利的查理斯·勒克萊爾，更是壓倒性地領先Q1意外退場的隊友維斯達彭整整19個位置。</p><p>哈達爾說：「來到這裡，完成我在紅牛的第一次排位賽，並得到第三名——我還是不敢相信。從練習賽第一圈開始我就感覺非常適應這輛賽車。車隊給了我難以置信的支持，給了我表現所需的一切。」</p><p>對紅牛來說，哈達爾的表現在一定程度上緩解了維斯達彭Q1退場的衝擊。車隊總監克里斯蒂安·霍納形容這是「非常令人印象深刻」的首秀，並表示相信維斯達彭週日會在車陣中完成追趕。</p>'
      }
    },
    {
      id: 7,
      cat:      { en: 'Practice', zh: '練習賽' },
      tag:      { en: 'Practice', zh: '練習賽' },
      title:    { en: "Ferrari Leads FP1, Mercedes Fights Back to Dominate FP2 in Australia", zh: "法拉利領跑FP1，梅賽德斯FP2全面反擊澳洲站" },
      excerpt:  { en: "Charles Leclerc was fastest in the first practice session of the 2026 season, but Mercedes turned the tables in FP2 as the new regulations produce a complex setup challenge at Albert Park.", zh: "查理斯·勒克萊爾在2026賽季首節練習賽中最快，但梅賽德斯在FP2中完全反轉局勢，新規例為艾伯特公園賽道帶來複雜的設定挑戰。" },
      date:     { en: 'Mar 6, 2026', zh: '2026年3月6日' },
      readTime: { en: '4 min read', zh: '4分鐘閱讀' },
      source:   'formula1.com',
      body: {
        en: '<p>The 2026 Formula 1 season kicked off in earnest on Friday in Melbourne, with Ferrari heading the timesheet in the opening practice session before Mercedes responded emphatically in FP2 to hint at the complex technical picture that will define this new era.</p><p>Charles Leclerc was fastest in FP1 at 1:21.847, with Lewis Hamilton second and Max Verstappen third, suggesting Ferrari had arrived in Melbourne with a strong initial setup. The new aerodynamic regulations, featuring active aero systems that adjust downforce on the fly, appeared to suit the SF-26\'s characteristics in the hotter conditions of the Australian afternoon.</p><p>But FP2 told a very different story. George Russell and Kimi Antonelli went 1-2 for Mercedes, with Russell\'s 1:19.234 around a second faster than Leclerc\'s FP1 benchmark — a significant delta that caught the Ferrari and McLaren camps by surprise.</p><p>"The active aero system is incredibly complex to optimise," said one senior engineer. "Teams are finding very different windows with these regulations. What looks fast in the afternoon heat may not translate to qualifying conditions, but right now Mercedes appear to have found something the others haven\'t."</p>',
        zh: '<p>2026年F1賽季週五在墨爾本正式拉開帷幕，法拉利在首節練習賽中領跑計時榜，但梅賽德斯在FP2中作出有力回應，暗示了這個新時代中將主導競爭的複雜技術格局。</p><p>查理斯·勒克萊爾在FP1中以1:21.847最快，漢米爾頓第二，維斯達彭第三，顯示法拉利帶著強勁的初始設定抵達墨爾本。在澳洲下午的炎熱條件下，採用動態調整下壓力的主動空力系統的新空力規例，似乎很適合SF-26的特性。</p><p>但FP2說的是完全不同的故事。喬治·羅素和基米·安托內利為梅賽德斯包攬前兩名，羅素的1:19.234比勒克萊爾FP1的最佳圈速快了大約一秒——這個顯著的差距令法拉利和麥拿侖陣營深感意外。</p><p>一位資深工程師說：「主動空力系統的優化極為複雜。各支車隊在這些規例下找到了非常不同的調教窗口。在下午高溫下看似快速的設定，未必能在排位賽條件下發揮效用，但目前梅賽德斯似乎找到了其他人尚未掌握的東西。」</p>'
      }
    },
    {
      id: 8,
      cat:      { en: 'Season Guide', zh: '賽季指南' },
      tag:      { en: 'Guide', zh: '指南' },
      title:    { en: "2026 Season Guide: New Rules, 11 Teams, and Everything You Need to Know", zh: "2026賽季完全指南：新規例、11支車隊、你需要知道的一切" },
      excerpt:  { en: "From Cadillac's historic entry as F1's 11th team to the revolutionary new power unit regulations and Norris's title defence, here's your complete guide to the 2026 Formula 1 World Championship.", zh: "從凱迪拉克以F1第11支車隊的身份歷史性加入，到革命性的新動力單元規例，以及諾里斯的冠軍衛冕，這是你的2026年F1世界錦標賽完全指南。" },
      date:     { en: 'Mar 5, 2026', zh: '2026年3月5日' },
      readTime: { en: '10 min read', zh: '10分鐘閱讀' },
      source:   'f1weekly',
      body: {
        en: '<p>Formula 1 enters 2026 with more teams, more ambition, and more regulation change than in many years. The new season brings sweeping technical reforms, an 11th constructor, a reshuffled driver market, and what promises to be a fiercely fought championship battle across 24 races on five continents.</p><h3 style="font-family:var(--font-display);font-size:20px;font-weight:700;text-transform:uppercase;color:#fff;margin:20px 0 10px;">New Power Unit Regulations</h3><p>The 2026 power unit rules are the most significant change since the turbo-hybrid era began in 2014. A new formula requires approximately equal power from the internal combustion engine and the electric motor — each producing around 400kW — with fully sustainable fuel. This has fundamentally reordered the engine hierarchy, with Mercedes, Ferrari, Honda (Aston Martin), Red Bull Ford, Audi, and Alpine Renault all competing under the new framework.</p><h3 style="font-family:var(--font-display);font-size:20px;font-weight:700;text-transform:uppercase;color:#fff;margin:20px 0 10px;">Cadillac\'s Historic Entry</h3><p>After years of pursuing FIA approval, Cadillac (under the TWG/Andretti umbrella) becomes Formula 1\'s 11th constructor, bringing with them an American identity and the experienced duo of Sergio Pérez and Valtteri Bottas. It is the first new American team in the sport since 2016.</p><h3 style="font-family:var(--font-display);font-size:20px;font-weight:700;text-transform:uppercase;color:#fff;margin:20px 0 10px;">The Driver Market</h3><p>Lando Norris arrives carrying number 1 as the reigning world champion after his 2025 title. Hamilton left Mercedes for Ferrari. Verstappen uses number 3. Young guns Isack Hadjar (Red Bull) and Arvid Lindblad (Racing Bulls) join as rookies. Franco Colapinto continues at Alpine. Every team has something to prove.</p>',
        zh: '<p>Formula 1以更多車隊、更大雄心和比多年來更多的規例變化進入2026年。新賽季帶來了全面的技術改革、第11支參賽車隊、重新洗牌的車手市場，以及一場承諾橫跨五大洲24場比賽激烈進行的冠軍爭奪戰。</p><h3 style="font-family:var(--font-display);font-size:20px;font-weight:700;text-transform:uppercase;color:#fff;margin:20px 0 10px;">全新動力單元規例</h3><p>2026年的動力單元規例是自2014年渦輪混合動力時代開始以來最重大的變革。新公式要求內燃機和電動馬達輸出大致相等的功率——各約400kW——並使用全可持續燃料。這從根本上重新排列了引擎層級，梅賽德斯、法拉利、本田（阿斯頓·馬丁）、紅牛福特、奧迪和雷諾（阿爾派）均在新框架下競爭。</p><h3 style="font-family:var(--font-display);font-size:20px;font-weight:700;text-transform:uppercase;color:#fff;margin:20px 0 10px;">凱迪拉克歷史性加入</h3><p>在多年尋求FIA批准後，凱迪拉克（在TWG/安德雷蒂旗下）成為F1第11支車隊，帶來美國身份認同以及謝爾蓋·佩雷茲和瓦爾特里·博塔斯這對經驗豐富的組合。這是自2016年以來第一支新的美國車隊加入這項運動。</p><h3 style="font-family:var(--font-display);font-size:20px;font-weight:700;text-transform:uppercase;color:#fff;margin:20px 0 10px;">車手市場</h3><p>蘭多·諾里斯帶著1號車牌作為衛冕冠軍出場，因為他在2025年奪得冠軍頭銜。漢米爾頓離開梅賽德斯加入法拉利。維斯達彭使用3號。年輕新秀伊薩克·哈達爾（紅牛）和阿爾維德·林德布拉德（鬥牛）以新人身份加入。弗蘭科·科拉平托在阿爾派繼續效力。每支車隊都有需要證明的東西。</p>'
      }
    }
  ]

};
