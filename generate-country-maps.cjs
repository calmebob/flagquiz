// generate-country-maps.cjs
// Generates SVG maps for each country:
// - 50m resolution for the target country (accurate borders)
// - 110m resolution for neighboring context (lightweight)
// - Centered on capital city with pre-computed zoom scale
// - Red pin on capital with label

const fs = require('fs');
const { feature } = require('topojson-client');
const d3 = require('d3-geo');

const topo50 = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
const topo110 = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-110m.json', 'utf8'));
const world50 = feature(topo50, topo50.objects.countries);
const world110 = feature(topo110, topo110.objects.countries);

const countriesRaw = fs.readFileSync('src/data/countries.js', 'utf8');
const countries = JSON.parse(countriesRaw.match(/const countries = (\[[\s\S]*?\]);/)[1]);
const capsRaw = fs.readFileSync('src/data/capitalCoords.js', 'utf8');
const capitals = new Function('return ' + capsRaw.match(/const capitalCoords = (\{[\s\S]*?\});/)[1])();
const scalesRaw = fs.readFileSync('src/data/countryScales.js', 'utf8');
const countryScales = new Function('return ' + scalesRaw.match(/const countryScales = (\{[\s\S]*?\});/)[1])();

const NUM_TO_A2 = {
  "004":"af","008":"al","012":"dz","020":"ad","024":"ao","028":"ag","032":"ar","051":"am","036":"au","040":"at",
  "031":"az","044":"bs","048":"bh","050":"bd","052":"bb","112":"by","056":"be","084":"bz","204":"bj","064":"bt",
  "068":"bo","070":"ba","072":"bw","076":"br","096":"bn","100":"bg","854":"bf","108":"bi","132":"cv","116":"kh",
  "120":"cm","124":"ca","140":"cf","148":"td","152":"cl","156":"cn","170":"co","174":"km","178":"cg","180":"cd",
  "188":"cr","384":"ci","191":"hr","192":"cu","196":"cy","203":"cz","208":"dk","262":"dj","212":"dm","214":"do",
  "218":"ec","818":"eg","222":"sv","226":"gq","232":"er","233":"ee","748":"sz","231":"et","242":"fj","246":"fi",
  "250":"fr","266":"ga","270":"gm","268":"ge","276":"de","288":"gh","300":"gr","308":"gd","320":"gt","324":"gn",
  "624":"gw","328":"gy","332":"ht","340":"hn","348":"hu","352":"is","356":"in","360":"id","364":"ir","368":"iq",
  "372":"ie","376":"il","380":"it","336":"va","388":"jm","392":"jp","400":"jo","398":"kz","404":"ke","296":"ki","408":"kp",
  "410":"kr","414":"kw","417":"kg","418":"la","422":"lb","426":"ls","430":"lr","434":"ly","438":"li","440":"lt",
  "442":"lu","450":"mg","454":"mw","458":"my","462":"mv","466":"ml","470":"mt","584":"mh","478":"mr","480":"mu",
  "484":"mx","583":"fm","498":"md","492":"mc","496":"mn","499":"me","504":"ma","508":"mz","104":"mm","516":"na",
  "520":"nr","524":"np","528":"nl","554":"nz","558":"ni","562":"ne","566":"ng","807":"mk","578":"no","512":"om",
  "586":"pk","585":"pw","275":"ps","591":"pa","598":"pg","600":"py","604":"pe","608":"ph","616":"pl","620":"pt","634":"qa",
  "642":"ro","643":"ru","646":"rw","659":"kn","662":"lc","670":"vc","882":"ws","674":"sm","678":"st","682":"sa",
  "686":"sn","688":"rs","690":"sc","694":"sl","702":"sg","703":"sk","704":"vn","705":"si","090":"sb","706":"so",
  "710":"za","728":"ss","724":"es","144":"lk","729":"sd","736":"sd","740":"sr","752":"se","756":"ch","760":"sy",
  "762":"tj","764":"th","158":"tw","626":"tl","768":"tg","776":"to","780":"tt","788":"tn","792":"tr","795":"tm","798":"tv",
  "800":"ug","804":"ua","784":"ae","826":"gb","840":"us","858":"uy","860":"uz","548":"vu","862":"ve","887":"ye",
  "894":"zm","716":"zw",
};

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function rd(d, p) { return d.replace(/\d+\.\d+/g, m => parseFloat(m).toFixed(p)); }

const W = 800, H = 300;

function generateMap(code) {
  const cap = capitals[code];
  if (!cap) return null;
  const scale = countryScales[code] || 500;
  const capName = countries.find(c => c.code === code)?.capital || '';

  // Mercator projection centered on capital
  const projection = d3.geoMercator()
    .center([cap[1], cap[0]])
    .scale(scale)
    .translate([W / 2, H / 2]);
  const path = d3.geoPath(projection);

  // Which numeric IDs belong to the target country
  const targetIds = new Set();
  Object.entries(NUM_TO_A2).forEach(([n, a]) => { if (a === code) targetIds.add(n); });
  // Name-based matching for territories without numeric IDs (e.g. Kosovo)
  const NAME_TO_CODE = { 'Kosovo': 'xk' };
  function isTarget(f) { return targetIds.has(f.id) || NAME_TO_CODE[f.properties?.name] === code; }

  let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
  // Clip to viewport
  svg += `<defs><clipPath id="v"><rect width="${W}" height="${H}"/></clipPath></defs>`;
  // Ocean background
  svg += `<rect width="${W}" height="${H}" fill="#DCEEF8"/>`;

  // Context countries (110m, light gray, clipped)
  svg += `<g clip-path="url(#v)">`;
  for (const f of world110.features) {
    if (isTarget(f)) continue;
    const b = path.bounds(f);
    if (!b || !isFinite(b[0][0]) || !isFinite(b[1][1])) continue;
    // Skip if entirely outside viewport (generous margin for partial overlap)
    if (b[1][0] < -200 || b[0][0] > W + 200 || b[1][1] < -200 || b[0][1] > H + 200) continue;
    // Skip if projected bounds are absurdly large (Mercator wrapping artifact)
    if ((b[1][0] - b[0][0]) > W * 8 || (b[1][1] - b[0][1]) > H * 8) continue;
    const d = path(f);
    if (!d) continue;
    svg += `<path d="${rd(d, 0)}" fill="#E0E0E0" stroke="#fff" stroke-width=".4"/>`;
  }
  svg += `</g>`;

  // Target country (50m, teal, on top, also clipped)
  svg += `<g clip-path="url(#v)">`;
  for (const f of world50.features) {
    if (!isTarget(f)) continue;
    const d = path(f);
    if (!d) continue;
    svg += `<path d="${rd(d, 1)}" fill="#4ECDC4" stroke="#2C3E50" stroke-width="1"/>`;
  }
  svg += `</g>`;

  // Capital pin
  const [px, py] = projection([cap[1], cap[0]]);
  if (isFinite(px) && isFinite(py)) {
    svg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="#E74C3C" stroke="#fff" stroke-width="2"/>`;
    const ly = py > 30 ? py - 10 : py + 15;
    svg += `<text x="${px.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#2D3436">${esc(capName)}</text>`;
  }

  svg += `</svg>`;
  return svg;
}

// Generate all maps
const maps = {};
const mapsDir = 'public/maps';
if (!fs.existsSync(mapsDir)) fs.mkdirSync(mapsDir, { recursive: true });

let gen = 0;
for (const c of countries) {
  const svg = generateMap(c.code);
  if (svg) {
    maps[c.code] = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
    fs.writeFileSync(`${mapsDir}/${c.code}.svg`, svg);
    gen++;
  }
}

fs.writeFileSync('country-maps.json', JSON.stringify(maps));

const sizes = Object.entries(maps).map(([k,v]) => ({ code: k, kb: Math.round(Buffer.from(v.split(',')[1],'base64').length/1024) }));
sizes.sort((a,b) => b.kb - a.kb);
console.log(`Generated ${gen}/${countries.length} maps`);
console.log(`JSON: ${Math.round(fs.statSync('country-maps.json').size/1024)} KB`);
console.log(`Top 5: ${sizes.slice(0,5).map(s => `${s.code}=${s.kb}KB`).join(', ')}`);
console.log(`Median: ${sizes[Math.floor(sizes.length/2)].code}=${sizes[Math.floor(sizes.length/2)].kb}KB`);
console.log(`Total SVG: ${Math.round(sizes.reduce((a,s) => a+s.kb, 0))} KB`);
