// generate-preview.cjs — builds the self-contained preview HTML
const fs = require('fs');

const flagDataUris = require('./flag-data-uris.json');

// Read country data from the generated JS module
const countriesRaw = fs.readFileSync('src/data/countries.js', 'utf8');
const match = countriesRaw.match(/const countries = (\[[\s\S]*?\]);/);
const countries = JSON.parse(match[1]);

// Build compact country data for preview (strip to essential fields)
const previewData = countries.map(c => ({
  code: c.code,
  name: c.name,
  capital: c.capital,
  continent: c.continent,
  population: c.population,
  sf: c.similarFlag,
  facts: c.funFacts,
  ms: c.misspellings || [],
}));

// Build the FLAGS object mapping code -> data URI
const flagEntries = Object.entries(flagDataUris)
  .filter(([code]) => countries.some(c => c.code === code))
  .map(([code, uri]) => `${JSON.stringify(code)}:${JSON.stringify(uri)}`)
  .join(',\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Flag Explorer - Learn the Flags of the World!</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌍</text></svg>" />
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
<style>
:root{--sky:#4ECDC4;--sky-l:#A8E6CF;--coral:#FF6B6B;--ocean:#3498DB;--ocean-d:#2471A3;--mint:#00B894;--purple:#9B59B6;--bg:#FFF8F0;--white:#FFF;--dark:#2D3436;--med:#636E72;--light:#B2BEC3;--sh:0 8px 30px rgba(0,0,0,.08);--sh2:0 12px 40px rgba(0,0,0,.12);--r:16px;--rl:24px;--rxl:32px}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--dark);-webkit-font-smoothing:antialiased}h1,h2,h3,h4{font-family:'Fredoka',sans-serif}
.app-bg{position:fixed;inset:0;z-index:-1;background:radial-gradient(circle at 10% 20%,rgba(78,205,196,.08) 0%,transparent 50%),radial-gradient(circle at 90% 80%,rgba(255,107,107,.06) 0%,transparent 50%),var(--bg)}
nav{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);border-bottom:3px solid var(--sky-l);position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer}.logo span{font-size:28px}.logo h1{font-size:1.3rem;background:linear-gradient(135deg,var(--sky),var(--ocean));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.tabs{display:flex;gap:6px;align-items:center}.tab{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--r);border:none;background:none;color:var(--med);font-weight:600;font-size:.9rem;cursor:pointer;font-family:'Nunito',sans-serif;transition:.2s}.tab:hover{background:rgba(78,205,196,.1);color:var(--dark)}.tab.active{background:var(--sky);color:#fff}.tab-subtle{padding:8px 10px;opacity:.55}.tab-subtle:hover{opacity:1}.tab-subtle.active{opacity:1}
main{max-width:900px;margin:0 auto;padding:24px 20px}
.home{display:flex;flex-direction:column;align-items:center;gap:40px;padding-top:30px;text-align:center;min-height:70vh;justify-content:center}.globe{font-size:5rem;animation:float 3s ease-in-out infinite}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}.home h2{font-size:2.5rem;background:linear-gradient(135deg,var(--sky),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent}.home>p{font-size:1.1rem;color:var(--med);max-width:450px}
.cards-main{display:grid;grid-template-columns:1fr 1fr;gap:24px;width:100%;max-width:600px}.card{background:var(--white);border-radius:var(--rl);padding:36px 24px;display:flex;flex-direction:column;align-items:center;gap:14px;box-shadow:var(--sh);border:3px solid transparent;cursor:pointer;transition:.3s}.card:hover{transform:translateY(-5px);box-shadow:var(--sh2)}.card:nth-child(1):hover{border-color:var(--coral)}.card:nth-child(2):hover{border-color:var(--ocean)}.card-ico{font-size:2.8rem;width:74px;height:74px;display:flex;align-items:center;justify-content:center;border-radius:50%}.card:nth-child(1) .card-ico{background:rgba(255,107,107,.12)}.card:nth-child(2) .card-ico{background:rgba(52,152,219,.12)}.card h3{font-size:1.15rem}.card p{color:var(--med);font-size:.85rem;line-height:1.4}
.settings-link{color:var(--light);font-size:.9rem;font-weight:600;text-decoration:none;padding:6px 14px;border-radius:10px;transition:.2s;cursor:pointer}.settings-link:hover{color:var(--med);background:rgba(0,0,0,.03)}
.quiz{display:flex;flex-direction:column;align-items:center;gap:20px;max-width:650px;margin:0 auto;padding-top:16px}.prog{width:100%;display:flex;align-items:center;gap:14px}.prog-bar{flex:1;height:10px;background:#e8e8e8;border-radius:5px;overflow:hidden}.prog-fill{height:100%;background:linear-gradient(90deg,var(--sky),var(--mint));border-radius:5px;transition:width .4s}.prog-txt{font-weight:700;font-size:.9rem;color:var(--med);white-space:nowrap}.score-badge{font-weight:700;color:var(--mint);display:flex;align-items:center;gap:4px}
.flag-box{background:var(--white);border-radius:var(--rl);padding:28px;box-shadow:var(--sh);display:flex;flex-direction:column;align-items:center;gap:20px;width:100%}.flag-img{width:260px;height:auto;border-radius:8px;box-shadow:0 4px 18px rgba(0,0,0,.12);border:1px solid #ddd}.q-text{font-family:'Fredoka',sans-serif;font-size:1.3rem;font-weight:600;text-align:center}
.opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}.opt{padding:14px 16px;border-radius:var(--r);border:3px solid #e8e8e8;background:var(--white);font-size:1rem;font-weight:600;font-family:'Nunito',sans-serif;cursor:pointer;transition:.2s;text-align:center}.opt:hover:not(:disabled){border-color:var(--sky);background:rgba(78,205,196,.06);transform:translateY(-2px)}.opt.correct{border-color:var(--mint);background:rgba(0,184,148,.1);color:#00724C;animation:pop .3s}.opt.wrong{border-color:var(--coral);background:rgba(255,107,107,.1);color:#c33;animation:shake .4s}.opt:disabled{cursor:default;opacity:.7}
.input-area{width:100%;display:flex;flex-direction:column;align-items:center;gap:10px}.txt-in{width:100%;max-width:360px;padding:14px 18px;border-radius:var(--r);border:3px solid #e8e8e8;font-size:1.05rem;font-family:'Nunito',sans-serif;font-weight:600;text-align:center;outline:none;transition:.2s}.txt-in:focus{border-color:var(--sky)}.txt-in.correct{border-color:var(--mint);background:rgba(0,184,148,.06)}.txt-in.wrong{border-color:var(--coral);background:rgba(255,107,107,.06)}
.fb{text-align:center;padding:10px 18px;border-radius:10px;font-weight:700;font-size:1rem;animation:pop .3s}.fb.ok{background:rgba(0,184,148,.12);color:#00724C}.fb.no{background:rgba(255,107,107,.12);color:#c33}
.btn{padding:12px 36px;border-radius:var(--r);border:none;background:linear-gradient(135deg,var(--sky),var(--ocean));color:#fff;font-size:1rem;font-weight:700;font-family:'Nunito',sans-serif;cursor:pointer;transition:.2s}.btn:hover{transform:translateY(-2px);box-shadow:0 4px 15px rgba(78,205,196,.4)}.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}.btn2{padding:12px 28px;border-radius:var(--r);border:3px solid #e8e8e8;background:var(--white);color:var(--dark);font-size:1rem;font-weight:700;font-family:'Nunito',sans-serif;cursor:pointer;transition:.2s}.btn2:hover{border-color:var(--sky);transform:translateY(-2px)}
.results{display:flex;flex-direction:column;align-items:center;gap:28px;padding-top:32px;text-align:center;max-width:550px;margin:0 auto}.res-card{background:var(--white);border-radius:var(--rxl);padding:40px;box-shadow:var(--sh);width:100%}.res-icon{font-size:3.5rem;margin-bottom:12px}.res-score{font-size:3.5rem;font-family:'Fredoka',sans-serif;font-weight:700;background:linear-gradient(135deg,var(--sky),var(--mint));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:12px 0}.res-msg{font-size:1.05rem;color:var(--med);margin-bottom:8px}.res-btns{display:flex;gap:14px;justify-content:center;margin-top:20px;flex-wrap:wrap}
.perfect{background:linear-gradient(-45deg,#FFE66D,#FF6B6B,#4ECDC4,#9B59B6);background-size:400% 400%;animation:grad 4s ease infinite;border-radius:var(--rxl);padding:40px}.perfect h2,.perfect .res-score,.perfect .res-msg{color:#fff!important;-webkit-text-fill-color:#fff!important}@keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.settings{max-width:550px;margin:0 auto;display:flex;flex-direction:column;gap:28px}.settings h2{font-size:1.8rem;text-align:center}.scard{background:var(--white);border-radius:var(--rl);padding:28px;box-shadow:var(--sh)}.scard h3{font-size:1.1rem;margin-bottom:14px}
.mode-tog{display:flex;gap:8px}.mt-btn{flex:1;display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:10px;border:2px solid #e8e8e8;background:var(--white);cursor:pointer;transition:.2s;text-align:left;font-family:'Nunito',sans-serif}.mt-btn:hover{border-color:var(--sky-l)}.mt-btn.on{border-color:var(--sky);background:rgba(78,205,196,.08)}.mt-ico{font-size:1.4rem;flex-shrink:0}.mt-txt{display:flex;flex-direction:column;gap:1px}.mt-txt strong{font-size:.9rem;color:var(--dark)}.mt-txt span{font-size:.75rem;color:var(--med)}
.slider-val{text-align:center;font-size:1.8rem;font-family:'Fredoka',sans-serif;font-weight:700;color:var(--sky)}.slider{-webkit-appearance:none;width:100%;height:8px;border-radius:4px;background:#e8e8e8;outline:none;margin:10px 0}.slider::-webkit-slider-thumb{-webkit-appearance:none;width:26px;height:26px;border-radius:50%;background:var(--sky);cursor:pointer;box-shadow:0 2px 8px rgba(78,205,196,.4)}.slider-labels{display:flex;justify-content:space-between;font-size:.8rem;color:var(--med)}
.cont-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.cont-tog{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;border:2px solid #e8e8e8;cursor:pointer;transition:.2s;user-select:none}.cont-tog.on{border-color:var(--sky);background:rgba(78,205,196,.08)}.cont-tog:hover{border-color:var(--sky-l)}.cont-cb{width:22px;height:22px;border-radius:5px;border:2px solid #d0d0d0;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.2s;font-size:.8rem}.cont-tog.on .cont-cb{background:var(--sky);border-color:var(--sky);color:#fff}.cont-nm{font-weight:600;font-size:.9rem}
.msg-center{display:flex;flex-direction:column;align-items:center;gap:20px;padding-top:40px;text-align:center}.msg-center h2{font-size:1.6rem}.msg-center p{color:var(--med)}
.map-page{display:flex;flex-direction:column;gap:20px}.map-page h2{font-size:1.8rem;text-align:center}.map-page>p{text-align:center;color:var(--med);font-size:.95rem}
.country-btn{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border-radius:8px;border:2px solid #e8e8e8;background:var(--white);cursor:pointer;font-family:'Nunito',sans-serif;font-weight:600;font-size:.82rem;transition:.2s}.country-btn:hover{border-color:var(--sky);background:rgba(78,205,196,.04)}.country-btn.sel{border-color:var(--sky);background:rgba(78,205,196,.08)}.country-btn img{width:26px;height:17px;border-radius:2px;border:1px solid #ddd;object-fit:cover}
.info-panel{background:var(--white);border-radius:var(--rl);padding:28px;box-shadow:var(--sh);display:flex;gap:20px;align-items:flex-start;animation:slideUp .3s ease;position:relative}.info-flag{width:140px;border-radius:8px;box-shadow:0 3px 12px rgba(0,0,0,.1)}.info-det{flex:1}.info-det h3{font-size:1.4rem;margin-bottom:6px}.info-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.info-tag{padding:5px 12px;border-radius:16px;background:rgba(78,205,196,.1);color:var(--ocean-d);font-weight:600;font-size:.8rem}.info-facts h4{font-size:.95rem;margin-bottom:6px}.info-facts ul{list-style:none;padding:0}.info-facts li{padding:4px 0 4px 22px;position:relative;color:var(--med);font-size:.9rem;line-height:1.5}.info-facts li::before{content:'🌟';position:absolute;left:0;top:4px;font-size:.75rem}
.close-btn{position:absolute;top:10px;right:10px;width:28px;height:28px;border-radius:50%;border:none;background:#f0f0f0;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center}.close-btn:hover{background:#fcc}
@keyframes pop{0%{transform:scale(.95);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
@media(max-width:640px){nav{flex-wrap:wrap;gap:6px;padding:10px 14px}.tabs{width:100%;justify-content:center}.tab{padding:6px 12px;font-size:.8rem}.cards-main{grid-template-columns:1fr;max-width:320px}.opts{grid-template-columns:1fr}.cont-grid{grid-template-columns:1fr}.mode-tog{flex-direction:column}.info-panel{flex-direction:column;align-items:center;text-align:center}.info-flag{width:180px}.info-tags{justify-content:center}}
</style>
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"><\/script>
</head>
<body>
<div class="app-bg"></div>
<div id="app"></div>
<script>
"use strict";
function esc(s){if(s==null)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
var MAX_INPUT=100;
function sanitize(s){if(typeof s!=='string')return'';return s.replace(/[^\\p{L}\\p{N}\\s\\-'.]/gu,'').slice(0,MAX_INPUT);}
function isValid(v,list){return list.indexOf(v)!==-1;}

// Embedded flag images as base64 data URIs (from flag-icons SVGs)
var FLAGS={
${flagEntries}
};
function flagSrc(code){return FLAGS[code]||'';}

// localStorage persistence
var STORE_KEY='flag-explorer-settings';
var ALL_CONTS=['Africa','Asia','Europe','North America','South America','Oceania'];
function loadSettings(){try{var r=localStorage.getItem(STORE_KEY);if(!r)return null;var p=JSON.parse(r);var n=Number(p.numFlags);var m=p.quizMode==='typing'?'typing':'multiple';var c=Array.isArray(p.continents)?p.continents.filter(function(x){return ALL_CONTS.indexOf(x)!==-1;}):ALL_CONTS.slice();return{numFlags:n>=10&&n<=25?n:25,quizMode:m,continents:c.length>0?c:ALL_CONTS.slice()};}catch(e){return null;}}
function saveSettings(){try{localStorage.setItem(STORE_KEY,JSON.stringify({numFlags:numFlags,quizMode:quizMode,continents:continents}));}catch(e){}}

var COUNTRIES=${JSON.stringify(previewData)};
Object.freeze(COUNTRIES);

function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
function norm(s){return String(s).toLowerCase().replace(/[^a-z0-9]/g,'');}

var saved=loadSettings();
var page='home',quizPhase='idle',mapSelected=null,questions=[],qIdx=0,score=0,selected=null,submitted=false,isCorrect=false,inputVal='',
    numFlags=saved?saved.numFlags:25,quizMode=saved?saved.quizMode:'multiple',continents=saved?saved.continents:ALL_CONTS.slice();

function setPage(p){if(!isValid(p,['home','quiz','settings','map']))return;page=p;if(p==='quiz')startQuiz();else{quizPhase='idle';selected=null;submitted=false;inputVal='';mapSelected=null;}render();}
function buildQuestions(){var pool=COUNTRIES.filter(function(c){return continents.indexOf(c.continent)!==-1;});if(pool.length<4)return[];var sel=shuffle(pool).slice(0,Math.min(numFlags,pool.length));return sel.map(function(country){var sim=COUNTRIES.filter(function(c){return c.code===country.sf&&c.code!==country.code;})[0];var other=pool.filter(function(c){return c.code!==country.code&&c.code!==country.sf;});var rand=shuffle(other).slice(0,2);var opts=[{name:country.name,correct:true}];if(sim)opts.push({name:sim.name,correct:false});else{var f=shuffle(other)[0];if(f)opts.push({name:f.name,correct:false});}rand.forEach(function(c){opts.push({name:c.name,correct:false});});var used={};opts=opts.filter(function(o){if(used[o.name])return false;used[o.name]=true;return true;});while(opts.length<4){var ff=null;for(var i=0;i<other.length;i++){if(!used[other[i].name]){ff=other[i];break;}}if(!ff)break;used[ff.name]=true;opts.push({name:ff.name,correct:false});}return{country:country,options:shuffle(opts)};});}
function startQuiz(){var q=buildQuestions();if(!q.length){quizPhase='error';return;}quizPhase='playing';questions=q;qIdx=0;score=0;selected=null;submitted=false;inputVal='';isCorrect=false;}
function pickOption(idx){if(selected!==null)return;var q=questions[qIdx];if(!q||idx<0||idx>=q.options.length)return;selected=q.options[idx].name;if(q.options[idx].correct)score++;render();}
function submitTyping(){if(submitted)return;var cleaned=sanitize(inputVal);if(!cleaned.trim())return;var c=questions[qIdx].country;var n=norm(cleaned);isCorrect=n===norm(c.name)||(c.ms&&c.ms.some(function(m){return norm(m)===n;}));if(isCorrect)score++;submitted=true;render();}
function handleTypingInput(el){inputVal=sanitize(el.value);if(el.value!==inputVal)el.value=inputVal;var btn=document.getElementById('submit-btn');if(btn)btn.disabled=!inputVal.trim();}
function handleTypingKeydown(evt){if(evt.key==='Enter'){if(submitted)nextQ();else submitTyping();}}
function nextQ(){if(qIdx+1>=questions.length){quizPhase='results';render();if(score===questions.length)setTimeout(function(){if(typeof confetti!=='function')return;var end=Date.now()+3000;(function frame(){confetti({particleCount:4,angle:60,spread:55,origin:{x:0},colors:['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6']});confetti({particleCount:4,angle:120,spread:55,origin:{x:1},colors:['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6']});if(Date.now()<end)requestAnimationFrame(frame);})();},100);return;}qIdx++;selected=null;submitted=false;isCorrect=false;inputVal='';render();setTimeout(function(){var el=document.getElementById('typein');if(el)el.focus();},60);}
function toggleCont(c){if(!isValid(c,ALL_CONTS))return;if(continents.indexOf(c)!==-1){if(continents.length<=1)return;continents=continents.filter(function(x){return x!==c;});}else continents=continents.concat([c]);saveSettings();render();}
function setMode(m){if(!isValid(m,['multiple','typing']))return;quizMode=m;saveSettings();render();}
function handleSlider(el){var v=parseInt(el.value);if(isNaN(v)||v<10||v>25)return;numFlags=v;saveSettings();var d=document.getElementById('sval');if(d)d.textContent=v;}
function selectCountry(code){var c=null;for(var i=0;i<COUNTRIES.length;i++){if(COUNTRIES[i].code===code){c=COUNTRIES[i];break;}}mapSelected=c;render();if(c){var p=document.getElementById('info-panel');if(p)p.scrollIntoView({behavior:'smooth'});}}

function render(){var app=document.getElementById('app');var h='<nav><div class="logo" onclick="setPage(\\'home\\')"><span>🌍</span><h1>Flag Explorer</h1></div><div class="tabs"><button class="tab '+(page==='home'?'active':'')+'" onclick="setPage(\\'home\\')">🏠 Home</button><button class="tab '+(page==='quiz'?'active':'')+'" onclick="setPage(\\'quiz\\')">🎯 Quiz</button><button class="tab '+(page==='map'?'active':'')+'" onclick="setPage(\\'map\\')">🗺️ Map</button><button class="tab tab-subtle '+(page==='settings'?'active':'')+'" onclick="setPage(\\'settings\\')">⚙️</button></div></nav><main>';
if(page==='home')h+=renderHome();else if(page==='quiz')h+=renderQuiz();else if(page==='map')h+=renderMap();else h+=renderSettings();h+='</main>';app.innerHTML=h;}

function renderHome(){return'<div class="home"><div><div class="globe">🌍</div><h2>Flag Explorer</h2><p>Learn the flags of every country through fun quizzes and an interactive map!</p></div><div class="cards-main"><div class="card" onclick="setPage(\\'quiz\\')"><div class="card-ico">🎯</div><h3>Flag Quiz</h3><p>Test your knowledge! Can you name the country from its flag?</p></div><div class="card" onclick="setPage(\\'map\\')"><div class="card-ico">🗺️</div><h3>World Map</h3><p>Explore countries and discover fun facts!</p></div></div><a class="settings-link" onclick="setPage(\\'settings\\')">⚙️ Customize your quiz settings</a></div>';}

function renderQuiz(){if(quizPhase==='error')return'<div class="msg-center"><h2>Not enough countries!</h2><p>Enable more continents in Settings.</p><button class="btn" onclick="setPage(\\'settings\\')">⚙️ Go to Settings</button></div>';if(quizPhase==='results')return renderResults();if(quizPhase!=='playing')return'';return quizMode==='multiple'?renderMC():renderTyping();}

function renderMC(){var q=questions[qIdx];if(!q)return'';var pct=(qIdx+1)/questions.length*100;var fb='';if(selected!==null){var sel=null;for(var i=0;i<q.options.length;i++){if(q.options[i].name===selected){sel=q.options[i];break;}}fb=sel&&sel.correct?'<div class="fb ok">✅ Correct! Great job!</div>':'<div class="fb no">❌ Not quite! It\\'s '+esc(q.country.name)+'</div>';}var opts='';for(var i=0;i<q.options.length;i++){var o=q.options[i],cls='opt';if(selected!==null){if(o.correct)cls+=' correct';else if(o.name===selected)cls+=' wrong';}opts+='<button class="'+cls+'" onclick="pickOption('+i+')"'+(selected!==null?' disabled':'')+'>'+esc(o.name)+'</button>';}var last=qIdx+1>=questions.length;return'<div class="quiz"><div class="prog"><div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%"></div></div><span class="prog-txt">'+(qIdx+1)+' / '+questions.length+'</span><span class="score-badge">⭐ '+score+'</span></div><div class="flag-box"><img class="flag-img" src="'+flagSrc(q.country.code)+'" alt="Flag" draggable="false"/><div class="q-text">Which country does this flag belong to?</div><div class="opts">'+opts+'</div>'+fb+(selected!==null?'<button class="btn" onclick="nextQ()">'+(last?'🏁 See Results':'Next Flag →')+'</button>':'')+'</div></div>';}

function renderTyping(){var q=questions[qIdx];if(!q)return'';var pct=(qIdx+1)/questions.length*100;var fb='',cls='';if(submitted){cls=isCorrect?'correct':'wrong';if(isCorrect){fb=norm(inputVal)===norm(q.country.name)?'<div class="fb ok">✅ Correct! Great job!</div>':'<div class="fb ok">✅ Correct! (Spelling: '+esc(q.country.name)+')</div>';}else fb='<div class="fb no">❌ Not quite! The answer is '+esc(q.country.name)+'</div>';}var last=qIdx+1>=questions.length;return'<div class="quiz"><div class="prog"><div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%"></div></div><span class="prog-txt">'+(qIdx+1)+' / '+questions.length+'</span><span class="score-badge">⭐ '+score+'</span></div><div class="flag-box"><img class="flag-img" src="'+flagSrc(q.country.code)+'" alt="Flag" draggable="false"/><div class="q-text">Type the name of this country!</div><div class="input-area"><input id="typein" class="txt-in '+cls+'" value="'+esc(inputVal)+'" placeholder="Type country name..." '+(submitted?'disabled ':'')+' oninput="handleTypingInput(this)" onkeydown="handleTypingKeydown(event)" autocomplete="off" spellcheck="false" maxlength="'+MAX_INPUT+'"/>'+(!submitted?'<button id="submit-btn" class="btn" onclick="submitTyping()"'+(!inputVal.trim()?' disabled':'')+'>Check Answer</button>':'')+'</div>'+fb+(submitted?'<button class="btn" onclick="nextQ()">'+(last?'🏁 See Results':'Next Flag →')+'</button>':'')+'</div></div>';}

function renderResults(){var pf=score===questions.length;var pct=Math.round(score/questions.length*100);var msg,ico;if(pf){msg="You\\'re a flag genius! Every single one correct!";ico='🏆';}else if(pct>=80){msg="Amazing! You really know your flags!";ico='🌟';}else if(pct>=60){msg="Good job! Keep practicing!";ico='👏';}else if(pct>=40){msg="Nice effort! Try again!";ico='💪';}else{msg="Keep exploring! Every flag counts!";ico='🌍';}return'<div class="results"><div class="'+(pf?'perfect':'res-card')+'"><div class="res-icon">'+ico+'</div><h2>'+(pf?'PERFECT SCORE!':'Quiz Complete!')+'</h2><div class="res-score">'+score+' / '+questions.length+'</div><p class="res-msg">'+esc(msg)+'</p><div class="res-btns"><button class="btn" onclick="setPage(\\'quiz\\')">🔄 Play Again</button><button class="btn2" onclick="setPage(\\'home\\')">🏠 Home</button></div></div></div>';}

function renderMap(){var h='<div class="map-page"><h2>🗺️ World Map</h2><p>Click any country to see its flag and fun facts!</p>';var conts=['Africa','Asia','Europe','North America','South America','Oceania'];var ce={Africa:'🌍',Asia:'🌏',Europe:'🏰','North America':'🌎','South America':'🌎',Oceania:'🏝️'};conts.forEach(function(cont){var cc=COUNTRIES.filter(function(c){return c.continent===cont;});if(!cc.length)return;h+='<div class="scard"><h3>'+ce[cont]+' '+esc(cont)+' <span style="font-family:Nunito;font-weight:600;font-size:.8rem;color:var(--med)">('+cc.length+')</span></h3><div style="display:flex;flex-wrap:wrap;gap:6px">';cc.forEach(function(c){var isSel=mapSelected&&mapSelected.code===c.code;h+='<button class="country-btn'+(isSel?' sel':'')+'" onclick="selectCountry(\\''+c.code+'\\')">';h+='<img src="'+flagSrc(c.code)+'" alt=""/>';h+=esc(c.name)+'</button>';});h+='</div></div>';});if(mapSelected){h+='<div class="info-panel" id="info-panel"><button class="close-btn" onclick="mapSelected=null;render()">×</button><img class="info-flag" src="'+flagSrc(mapSelected.code)+'" alt="Flag of '+esc(mapSelected.name)+'"/><div class="info-det"><h3>'+esc(mapSelected.name)+'</h3><div class="info-tags"><span class="info-tag">🏛️ Capital: '+esc(mapSelected.capital)+'</span><span class="info-tag">🌍 '+esc(mapSelected.continent)+'</span><span class="info-tag">👥 '+esc(mapSelected.population)+'</span></div><div class="info-facts"><h4>Fun Facts</h4><ul>';mapSelected.facts.forEach(function(f){h+='<li>'+esc(f)+'</li>';});h+='</ul></div></div></div>';}h+='</div>';return h;}

function renderSettings(){var ce={Africa:'🌍',Asia:'🌏',Europe:'🏰','North America':'🌎','South America':'🌎','Oceania':'🏝️'};var ch='';ALL_CONTS.forEach(function(c){var on=continents.indexOf(c)!==-1;ch+='<div class="cont-tog '+(on?'on':'')+'" onclick="toggleCont(\\''+esc(c)+'\\')">'+'<div class="cont-cb">'+(on?'✓':'')+'</div><span class="cont-nm">'+(ce[c]||'🌐')+' '+esc(c)+'</span></div>';});return'<div class="settings"><h2>⚙️ Settings</h2><div class="scard"><h3>🎮 Quiz Mode</h3><div class="mode-tog"><button class="mt-btn '+(quizMode==='multiple'?'on':'')+'" onclick="setMode(\\'multiple\\')"><span class="mt-ico">🅰️</span><div class="mt-txt"><strong>Multiple Choice</strong><span>Pick from four options</span></div></button><button class="mt-btn '+(quizMode==='typing'?'on':'')+'" onclick="setMode(\\'typing\\')"><span class="mt-ico">⌨️</span><div class="mt-txt"><strong>Type the Answer</strong><span>Spell the country name</span></div></button></div></div><div class="scard"><h3>🔢 Number of Flags per Quiz</h3><div class="slider-val" id="sval">'+numFlags+'</div><input type="range" class="slider" min="10" max="25" value="'+numFlags+'" oninput="handleSlider(this)"/><div class="slider-labels"><span>10 flags</span><span>25 flags</span></div></div><div class="scard"><h3>🌍 Continents to Include</h3><div class="cont-grid">'+ch+'</div></div></div>';}

render();
<\/script>
</body>
</html>`;

fs.writeFileSync('/mnt/user-data/outputs/flag-explorer-preview.html', html);
console.log('Preview written:', Math.round(html.length/1024), 'KB');
console.log('Countries:', countries.length);
