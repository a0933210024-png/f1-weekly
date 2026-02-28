import sharp from 'sharp';

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a0505;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Red accent bar -->
  <rect x="0" y="0" width="150" height="10" fill="#E10600"/>
  
  <!-- Speed lines -->
  <line x1="900" y1="100" x2="1100" y2="100" stroke="#E10600" stroke-width="3" opacity="0.3"/>
  <line x1="900" y1="150" x2="1150" y2="150" stroke="#E10600" stroke-width="3" opacity="0.5"/>
  <line x1="900" y1="200" x2="1120" y2="200" stroke="#E10600" stroke-width="3" opacity="0.4"/>
  
  <!-- Title -->
  <text x="80" y="280" font-family="Arial, sans-serif" font-size="90" font-weight="bold" fill="#ffffff">
    Formula1 Weekly
  </text>
  
  <!-- Subtitle -->
  <text x="80" y="350" font-family="Arial, sans-serif" font-size="36" fill="#f0f0f0">
    每週深度 F1 分析
  </text>
  
  <!-- Racing emoji -->
  <text x="950" y="550" font-size="120">🏎️</text>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png')
  .then(() => console.log('✅ OG image generated: public/og-image.png'))
  .catch(err => console.error('❌ Error generating OG image:', err));
