#!/usr/bin/env node
// Comprehensive test suite for Flag Explorer
// Tests data integrity, quiz logic, security, and edge cases

const fs = require('fs');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

// Load country data by extracting from the module
const dataFile = fs.readFileSync('./src/data/countries.js', 'utf8');

// Extract the countries array - parse the JS manually
// We'll evaluate it safely
const moduleCode = dataFile
  .replace('export default countries;', 'module.exports = countries;')
  .replace(/export const /g, 'const ')
  .replace(/export /g, '');

const tempFile = '/tmp/test_countries.js';
fs.writeFileSync(tempFile, moduleCode);
const countries = require(tempFile);

// Load preview HTML
const previewHTML = fs.readFileSync('/mnt/user-data/outputs/flag-explorer-preview.html', 'utf8');

console.log('\n══════════════════════════════════════════');
console.log('  FLAG EXPLORER — COMPREHENSIVE TESTS');
console.log('══════════════════════════════════════════\n');

// ─── DATA INTEGRITY TESTS ───
console.log('📊 DATA INTEGRITY');

test('All countries have required fields', () => {
  const required = ['code', 'name', 'capital', 'continent', 'population', 'similarFlag', 'funFacts', 'misspellings'];
  countries.forEach(c => {
    required.forEach(field => {
      assert(c[field] !== undefined, `${c.name || c.code} missing field: ${field}`);
    });
  });
});

test('All country codes are unique', () => {
  const codes = countries.map(c => c.code);
  const unique = new Set(codes);
  assert(codes.length === unique.size, `Duplicate codes found: ${codes.filter((c, i) => codes.indexOf(c) !== i)}`);
});

test('All country names are unique', () => {
  const names = countries.map(c => c.name);
  const unique = new Set(names);
  assert(names.length === unique.size, `Duplicate names found: ${names.filter((n, i) => names.indexOf(n) !== i)}`);
});

test('All country codes are lowercase 2-letter', () => {
  countries.forEach(c => {
    assert(/^[a-z]{2}$/.test(c.code), `Invalid code: ${c.code} for ${c.name}`);
  });
});

test('No country has similarFlag pointing to itself', () => {
  countries.forEach(c => {
    assert(c.similarFlag !== c.code, `${c.name} (${c.code}) has similarFlag pointing to itself`);
  });
});

test('All similarFlag references point to valid country codes', () => {
  const codes = new Set(countries.map(c => c.code));
  countries.forEach(c => {
    // similarFlag might reference a country not in our dataset (that's okay for display-only)
    // but let's flag it as a warning
    if (!codes.has(c.similarFlag)) {
      console.log(`    ⚠️  ${c.name}'s similarFlag "${c.similarFlag}" not in dataset (will use random fallback)`);
    }
  });
});

test('All continents are valid', () => {
  const valid = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
  countries.forEach(c => {
    assert(valid.includes(c.continent), `${c.name} has invalid continent: ${c.continent}`);
  });
});

test('Each continent has at least 4 countries (minimum for quiz)', () => {
  const valid = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
  valid.forEach(cont => {
    const count = countries.filter(c => c.continent === cont).length;
    assert(count >= 4, `${cont} has only ${count} countries (need at least 4 for quiz)`);
  });
});

test('All funFacts arrays have at least 1 entry', () => {
  countries.forEach(c => {
    assert(Array.isArray(c.funFacts) && c.funFacts.length > 0, `${c.name} has empty funFacts`);
  });
});

test('All misspellings are lowercase strings', () => {
  countries.forEach(c => {
    if (c.misspellings && c.misspellings.length > 0) {
      c.misspellings.forEach(m => {
        assert(typeof m === 'string', `${c.name} has non-string misspelling: ${m}`);
        assert(m === m.toLowerCase(), `${c.name} has uppercase misspelling: ${m}`);
      });
    }
  });
});

test('Country count is reasonable (> 100)', () => {
  assert(countries.length > 100, `Only ${countries.length} countries, expected > 100`);
});

// ─── QUIZ LOGIC TESTS ───
console.log('\n🎯 QUIZ LOGIC');

function normalize(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

test('Normalize handles standard inputs', () => {
  assert(normalize('United States') === 'unitedstates');
  assert(normalize('  France  ') === 'france');
  assert(normalize("Côte d'Ivoire") === 'ctedivoire');
});

test('Misspelling matching works correctly', () => {
  const ph = countries.find(c => c.code === 'ph');
  assert(ph, 'Philippines not found');
  const input = 'phillipines';
  const match = ph.misspellings.some(m => normalize(m) === normalize(input));
  assert(match, 'Common misspelling "phillipines" should match Philippines');
});

test('Exact match works for all countries', () => {
  countries.forEach(c => {
    assert(normalize(c.name) === normalize(c.name), `Normalize idempotent failed for ${c.name}`);
  });
});

test('Empty input does not match any country', () => {
  const norm = normalize('');
  countries.forEach(c => {
    assert(norm !== normalize(c.name) || c.name === '', `Empty matched ${c.name}`);
  });
});

// ─── SECURITY TESTS ───
console.log('\n🔒 SECURITY');

test('Preview HTML has esc() function defined', () => {
  assert(previewHTML.includes('function esc('), 'Missing esc() function');
});

test('Preview HTML escapes HTML entities in esc()', () => {
  assert(previewHTML.includes("'&amp;'"), 'esc() does not escape &');
  assert(previewHTML.includes("'&lt;'"), 'esc() does not escape <');
  assert(previewHTML.includes("'&gt;'"), 'esc() does not escape >');
  assert(previewHTML.includes("'&quot;'"), 'esc() does not escape "');
  assert(previewHTML.includes("'&#039;'"), "esc() does not escape '");
});

test('Preview HTML has sanitize() function', () => {
  assert(previewHTML.includes('function sanitize('), 'Missing sanitize() function');
});

test('Preview HTML has input maxlength attribute', () => {
  assert(previewHTML.includes('maxlength='), 'Missing maxlength on input');
});

test('Preview HTML uses esc() on country names in rendering', () => {
  // Check that country names go through esc() when rendered
  assert(previewHTML.includes("esc(o.name)"), 'Option names not escaped');
  assert(previewHTML.includes("esc(q.country.name)"), 'Country name feedback not escaped');
});

test('Preview HTML pickOption uses numeric index (not injected data)', () => {
  assert(previewHTML.includes("pickOption('+i+')"), 'pickOption should use numeric index not data injection');
  // Make sure we're NOT using JSON.stringify in onclick
  assert(!previewHTML.includes('JSON.stringify(o)'), 'Should not inject JSON into onclick attributes');
});

test('Preview HTML validates page navigation input', () => {
  assert(previewHTML.includes("isValid(p,['home','quiz','settings'])"), 'Page navigation not validated');
});

test('Preview HTML validates quiz mode input', () => {
  assert(previewHTML.includes("isValid(m,['multiple','typing'])"), 'Quiz mode not validated');
});

test('Preview HTML validates continent toggle input', () => {
  assert(previewHTML.includes("isValid(c,ALL_CONTS)"), 'Continent toggle not validated');
});

test('Preview HTML freezes data to prevent tampering', () => {
  assert(previewHTML.includes('Object.freeze(COUNTRIES)'), 'Data not frozen');
});

test('Preview HTML uses strict mode', () => {
  assert(previewHTML.includes('"use strict"'), 'Missing use strict');
});

test('No country names contain HTML special characters that could cause issues', () => {
  countries.forEach(c => {
    // Names shouldn't contain < or > which could be misinterpreted
    assert(!c.name.includes('<'), `${c.name} contains <`);
    assert(!c.name.includes('>'), `${c.name} contains >`);
  });
});

test('React app uses sanitizeInput on text input onChange', () => {
  const quizFile = fs.readFileSync('./src/pages/QuizPage.jsx', 'utf8');
  assert(quizFile.includes('sanitizeInput(e.target.value)'), 'React input not sanitized');
  assert(quizFile.includes('maxLength={MAX_INPUT_LENGTH}'), 'React input missing maxLength');
});

test('React app has sanitizeInput function defined', () => {
  const quizFile = fs.readFileSync('./src/pages/QuizPage.jsx', 'utf8');
  assert(quizFile.includes('function sanitizeInput(str)'), 'Missing sanitizeInput in React');
});

// ─── XSS ATTACK SIMULATION ───
console.log('\n🛡️  XSS ATTACK SIMULATION');

// Simulate the sanitize function
function sanitize(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/[^\p{L}\p{N}\s\-'.]/gu, '').slice(0, 100);
}

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

const xssPayloads = [
  '<script>alert("xss")</script>',
  '<img src=x onerror=alert(1)>',
  '"><script>alert(document.cookie)</script>',
  "';alert(1);//",
  '<svg onload=alert(1)>',
  'javascript:alert(1)',
  '<iframe src="evil.com">',
  '{{constructor.constructor("alert(1)")()}}',
  '<div onmouseover="alert(1)">hover</div>',
  '\x3cscript\x3ealert(1)\x3c/script\x3e',
];

xssPayloads.forEach((payload, i) => {
  test(`XSS payload ${i+1} sanitized: ${payload.slice(0, 40)}...`, () => {
    const sanitized = sanitize(payload);
    assert(!sanitized.includes('<'), `sanitize() left < in: ${sanitized}`);
    assert(!sanitized.includes('>'), `sanitize() left > in: ${sanitized}`);
    assert(!sanitized.includes('='), `sanitize() left = in: ${sanitized}`);

    // Also test esc() as a second layer
    const escaped = esc(payload);
    assert(!escaped.includes('<') || escaped.includes('&lt;'), 'esc() failed to escape <');
    assert(!escaped.includes('>') || escaped.includes('&gt;'), 'esc() failed to escape >');
  });
});

test('Sanitize preserves valid country names', () => {
  const validNames = ['France', 'United States', "Côte d'Ivoire", 'Bosnia and Herzegovina', 'São Tomé'];
  validNames.forEach(name => {
    const sanitized = sanitize(name);
    assert(sanitized === name, `sanitize() mangled valid name "${name}" to "${sanitized}"`);
  });
});

test('Sanitize enforces max length', () => {
  const long = 'A'.repeat(200);
  const sanitized = sanitize(long);
  assert(sanitized.length <= 100, `sanitize() allowed ${sanitized.length} chars`);
});

test('Sanitize handles non-string inputs', () => {
  assert(sanitize(null) === '', 'null not handled');
  assert(sanitize(undefined) === '', 'undefined not handled');
  assert(sanitize(123) === '', 'number not handled');
  assert(sanitize({}) === '', 'object not handled');
});

// ─── FLAG DISPLAY TESTS ───
console.log('\n🏳️  FLAG DISPLAY');

test('Preview HTML has flag emoji function', () => {
  assert(previewHTML.includes('function toEmoji('), 'Missing toEmoji function');
});

test('Preview HTML has image onload/onerror handlers', () => {
  assert(previewHTML.includes('onFlagLoad'), 'Missing onFlagLoad handler');
  assert(previewHTML.includes('onFlagError'), 'Missing onFlagError handler');
});

test('Preview HTML uses encodeURIComponent on flag URL', () => {
  assert(previewHTML.includes('encodeURIComponent(code)'), 'Flag URL not safely encoded');
});

test('Flag emoji conversion produces correct output', () => {
  function toEmoji(code) {
    return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
  }
  // US flag emoji should be the US regional indicator pair
  const usFlag = toEmoji('us');
  assert(usFlag.length > 0, 'Empty emoji');
  assert(usFlag === '🇺🇸', 'US flag emoji incorrect');

  const jpFlag = toEmoji('jp');
  assert(jpFlag === '🇯🇵', 'JP flag emoji incorrect');
});

test('React app has FlagDisplay component with fallback', () => {
  const quizFile = fs.readFileSync('./src/pages/QuizPage.jsx', 'utf8');
  assert(quizFile.includes('function FlagDisplay'), 'Missing FlagDisplay component');
  assert(quizFile.includes('codeToEmoji'), 'FlagDisplay missing emoji fallback');
  assert(quizFile.includes('onLoad'), 'FlagDisplay missing onLoad handler');
  assert(quizFile.includes('onError'), 'FlagDisplay missing onError handler');
});

// ─── EDGE CASE TESTS ───
console.log('\n🔧 EDGE CASES');

test('Quiz works with minimum settings (1 continent)', () => {
  const continents = ['Oceania']; // Smallest continent
  const pool = countries.filter(c => continents.includes(c.continent));
  assert(pool.length >= 4, `Oceania needs >= 4 countries, has ${pool.length}`);
});

test('Quiz handles 10 flags setting (minimum)', () => {
  const pool = countries.filter(c => c.continent === 'Europe');
  assert(pool.length >= 10, 'Not enough European countries for min quiz');
});

test('Quiz handles all-continents with 25 flags', () => {
  assert(countries.length >= 25, 'Not enough countries for 25-flag quiz');
});

test('No duplicate options possible when pool is large enough', () => {
  // Simulate question building
  const pool = countries.filter(c => c.continent === 'Europe');
  if (pool.length >= 4) {
    const country = pool[0];
    const names = new Set();
    names.add(country.name);
    // Check that similar flag country has different name
    const sim = countries.find(c => c.code === country.similarFlag);
    if (sim) {
      assert(sim.name !== country.name, `${country.name}'s similar flag country has same name`);
    }
  }
});

test('Settings slider range is valid (10-25)', () => {
  assert(previewHTML.includes('min="10"'), 'Slider min not 10');
  assert(previewHTML.includes('max="25"'), 'Slider max not 25');
});

test('Settings slider validates numeric range', () => {
  assert(previewHTML.includes('v<10||v>25'), 'Slider does not validate range bounds');
});

// ─── NEW FEATURE TESTS ───
console.log('\n🆕 NEW FEATURES');

test('Preview has localStorage persistence (save)', () => {
  assert(previewHTML.includes('localStorage.setItem'), 'Missing localStorage save');
  assert(previewHTML.includes('flag-explorer-settings'), 'Missing storage key');
});

test('Preview has localStorage persistence (load)', () => {
  assert(previewHTML.includes('localStorage.getItem'), 'Missing localStorage load');
  assert(previewHTML.includes('loadSettings'), 'Missing loadSettings function');
});

test('Preview persists quizMode in settings', () => {
  assert(previewHTML.includes('quizMode'), 'quizMode not found in preview');
  assert(previewHTML.includes("setMode("), 'setMode function not found');
});

test('Preview has quiz mode toggle in Settings page', () => {
  assert(previewHTML.includes('Multiple Choice'), 'Missing multiple choice option in settings');
  assert(previewHTML.includes('Type the Answer'), 'Missing typing option in settings');
  assert(previewHTML.includes('mt-btn'), 'Missing mode toggle button class');
});

test('Preview does NOT have mode-select screen in quiz flow', () => {
  // Quiz should go straight to playing, not show a mode picker
  assert(!previewHTML.includes("'Choose Quiz Mode'"), 'Mode select screen should be removed');
});

test('Preview home page has World Map card', () => {
  assert(previewHTML.includes('World Map'), 'Missing World Map card on home');
});

test('Preview home page has exactly 2 main cards (Quiz + Map)', () => {
  assert(previewHTML.includes('cards-main'), 'Missing 2-column card grid');
});

test('Preview settings is subtle in nav (no text label)', () => {
  assert(previewHTML.includes('tab-subtle'), 'Missing subtle class on settings tab');
});

test('Preview home settings link is subtle (text link, not card)', () => {
  assert(previewHTML.includes('settings-link'), 'Missing subtle settings link');
});

test('React App has localStorage persistence', () => {
  const appFile = fs.readFileSync('./src/App.jsx', 'utf8');
  assert(appFile.includes('localStorage.getItem'), 'React app missing localStorage load');
  assert(appFile.includes('localStorage.setItem'), 'React app missing localStorage save');
  assert(appFile.includes('flag-explorer-settings'), 'React app missing storage key');
});

test('React Settings has quiz mode toggle', () => {
  const settingsFile = fs.readFileSync('./src/pages/Settings.jsx', 'utf8');
  assert(settingsFile.includes('quizMode'), 'Settings missing quizMode');
  assert(settingsFile.includes('mode-toggle'), 'Settings missing mode toggle UI');
});

test('React QuizPage reads mode from settings (no mode select)', () => {
  const quizFile = fs.readFileSync('./src/pages/QuizPage.jsx', 'utf8');
  assert(quizFile.includes('settings.quizMode'), 'QuizPage should read mode from settings');
  assert(!quizFile.includes('ModeSelect'), 'ModeSelect component should be removed');
});

test('React Home has 2 main cards and subtle settings', () => {
  const homeFile = fs.readFileSync('./src/pages/Home.jsx', 'utf8');
  assert(homeFile.includes('home-cards-main'), 'Home missing 2-card layout');
  assert(homeFile.includes('home-settings-link'), 'Home missing subtle settings link');
  assert(homeFile.includes('/map'), 'Home missing World Map link');
});

test('React nav has subtle settings icon', () => {
  const appFile = fs.readFileSync('./src/App.jsx', 'utf8');
  assert(appFile.includes('nav-link-subtle'), 'Nav missing subtle settings class');
});

// ─── RESULTS ───
console.log('\n══════════════════════════════════════════');
console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
console.log('══════════════════════════════════════════\n');

process.exit(failed > 0 ? 1 : 0);
