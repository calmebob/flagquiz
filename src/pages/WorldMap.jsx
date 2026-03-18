import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';
import countries, { getFlagUrl } from '../data/countries';
import capitalCoords from '../data/capitalCoords';
import countryScales from '../data/countryScales';

// 110m for the main world map (lightweight)
const GEO_URL_110 = `${import.meta.env.BASE_URL}map-data/countries-110m.json`;
// 50m for the country detail map (higher fidelity borders)
const GEO_URL_50 = `${import.meta.env.BASE_URL}map-data/countries-50m.json`;

const NUMERIC_TO_ALPHA2 = {
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

const COUNTRY_COLORS = ['#B8E6D0','#A8D8EA','#FFD3B6','#DCEDC1','#F6D6AD','#C3BEF7','#FFB7B2','#B5EAD7','#E2F0CB','#FFDAC1'];
function getCountryColor(id) { return COUNTRY_COLORS[(parseInt(id) || 0) % COUNTRY_COLORS.length]; }

// Some territories (Kosovo) have no numeric ID — match by name
const NAME_TO_ALPHA2 = { 'Kosovo': 'xk' };

function geoToAlpha2(geo) {
  return NUMERIC_TO_ALPHA2[geo.id] || NAME_TO_ALPHA2[geo.properties?.name] || null;
}

// ── Country Detail Map (rendered at runtime with react-simple-maps) ──
function CountryMap({ countryCode, capitalName }) {
  const coords = capitalCoords[countryCode];
  if (!coords) return null;

  const scale = countryScales[countryCode] || 500;
  // Center on capital: coords is [lat, lng], projection wants [lng, lat]
  const center = [coords[1], coords[0]];

  return (
    <div className="country-detail-map">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale, center }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL_50}>
          {({ geographies }) => geographies.map((geo) => {
            const isTarget = geoToAlpha2(geo) === countryCode;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: isTarget ? '#4ECDC4' : '#E0E0E0',
                    stroke: isTarget ? '#2C3E50' : '#fff',
                    strokeWidth: isTarget ? 1.2 : 0.3,
                    outline: 'none',
                  },
                  hover: {
                    fill: isTarget ? '#4ECDC4' : '#E0E0E0',
                    stroke: isTarget ? '#2C3E50' : '#fff',
                    strokeWidth: isTarget ? 1.2 : 0.3,
                    outline: 'none',
                  },
                  pressed: {
                    fill: isTarget ? '#4ECDC4' : '#E0E0E0',
                    outline: 'none',
                  },
                }}
              />
            );
          })}
        </Geographies>
        <Marker coordinates={center}>
          <circle r={4} fill="#E74C3C" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={-10}
            style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 10, fill: '#2D3436' }}
          >
            {capitalName}
          </text>
        </Marker>
      </ComposableMap>
    </div>
  );
}

// ── Country Detail Page ──
function CountryDetail({ country, onBack }) {
  return (
    <div className="country-detail-page">
      <button className="back-btn" onClick={onBack}>← Back to World Map</button>
      <div className="country-detail-card">
        <div className="country-detail-header">
          <img className="country-detail-flag" src={getFlagUrl(country.code)} alt={`Flag of ${country.name}`} />
          <div className="country-detail-title">
            <h2>{country.name}</h2>
            <div className="country-info-meta">
              <span className="country-info-tag">🏛️ Capital: {country.capital}</span>
              <span className="country-info-tag">🌍 {country.continent}</span>
              <span className="country-info-tag">👥 Population: {country.population}</span>
            </div>
          </div>
        </div>

        <CountryMap countryCode={country.code} capitalName={country.capital} />

        <div className="country-detail-facts">
          <h3>Fun Facts</h3>
          <ul>
            {country.funFacts.map((fact, i) => <li key={i}>{fact}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Continent list view (simplified) ──
const CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
const CONTINENT_EMOJI = { Africa: '🌍', Asia: '🌏', Europe: '🏰', 'North America': '🌎', 'South America': '🌎', Oceania: '🏝️' };

function CountryList({ onSelect }) {
  const grouped = useMemo(() => {
    const map = {};
    CONTINENTS.forEach(c => { map[c] = []; });
    countries.forEach(c => { if (map[c.continent]) map[c.continent].push(c); });
    return map;
  }, []);

  return (
    <>
      {CONTINENTS.map(cont => {
        const list = grouped[cont];
        if (!list.length) return null;
        return (
          <div className="continent-section" key={cont}>
            <h3>{CONTINENT_EMOJI[cont]} {cont} <span className="continent-count">({list.length})</span></h3>
            <div className="country-btn-grid">
              {list.map(c => (
                <button key={c.code} className="country-btn" onClick={() => onSelect(c)}>
                  <img src={getFlagUrl(c.code)} alt="" />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ── Interactive map view ──
function InteractiveMap({ countryMap, onSelect }) {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, name: '' });

  return (
    <>
      <div className="map-container" onMouseMove={e => tooltip.show && setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }))}>
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 130, center: [0, 30] }} style={{ width: '100%', height: 'auto' }}>
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={8}>
            <Geographies geography={GEO_URL_110}>
              {({ geographies }) => geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    const a2 = geoToAlpha2(geo);
                    if (a2 && countryMap[a2]) onSelect(countryMap[a2]);
                  }}
                  onMouseEnter={(evt) => {
                    const a2 = geoToAlpha2(geo);
                    setTooltip({ show: true, x: evt.clientX, y: evt.clientY, name: countryMap[a2]?.name || geo.properties?.name || '' });
                  }}
                  onMouseLeave={() => setTooltip({ show: false, x: 0, y: 0, name: '' })}
                  style={{
                    default: { fill: getCountryColor(geo.id), stroke: '#fff', strokeWidth: 0.5, outline: 'none' },
                    hover: { fill: '#4ECDC4', stroke: '#2471A3', strokeWidth: 1, outline: 'none', cursor: 'pointer' },
                    pressed: { fill: '#3498DB', outline: 'none' },
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      {tooltip.show && <div className="map-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.name}</div>}
    </>
  );
}

// ── Main World Map ──
function WorldMap() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [view, setView] = useState('list');

  const countryMap = useMemo(() => {
    const map = {};
    countries.forEach(c => { map[c.code] = c; });
    return map;
  }, []);

  if (selectedCountry) {
    return <CountryDetail country={selectedCountry} onBack={() => setSelectedCountry(null)} />;
  }

  return (
    <div className="world-map-page">
      <h2>🗺️ World Map</h2>
      <p>Click any country to see its flag and fun facts!</p>
      <div className="map-view-toggle">
        <button className={`view-toggle-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}>
          <span className="view-toggle-ico">📋</span> Browse by Continent
        </button>
        <button className={`view-toggle-btn${view === 'interactive' ? ' active' : ''}`} onClick={() => setView('interactive')}>
          <span className="view-toggle-ico">🗺️</span> Interactive Map
        </button>
      </div>
      {view === 'list'
        ? <CountryList onSelect={setSelectedCountry} />
        : <InteractiveMap countryMap={countryMap} onSelect={setSelectedCountry} />
      }
    </div>
  );
}

export default WorldMap;
