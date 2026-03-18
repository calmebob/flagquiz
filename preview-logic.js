function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
function norm(s){return String(s).toLowerCase().replace(/[^a-z0-9]/g,'');}

function getHint(country) {
  var name = country.name.toLowerCase();
  var words = name.split(/\s+/);
  for (var i = 0; i < country.facts.length; i++) {
    var f = country.facts[i], fl = f.toLowerCase();
    var hasName = fl.indexOf(name) !== -1;
    if (!hasName) {
      var hasWord = false;
      for (var w = 0; w < words.length; w++) { if (words[w].length > 3 && fl.indexOf(words[w]) !== -1) { hasWord = true; break; } }
      if (!hasWord) return f;
    }
  }
  return country.facts[0].replace(new RegExp(country.name, 'gi'), '____');
}

// ═══════════ STATE ═══════════
var saved = loadSettings();
var progress = loadProgress();
var page='home',quizPhase='idle',mapSelected=null,questions=[],qIdx=0,score=0,selected=null,
    submitted=false,isCorrect=false,inputVal='',hintShown=false,quizResults=[],
    numFlags=saved?saved.numFlags:25,quizMode=saved?saved.quizMode:'multiple',
    continents=saved?saved.continents:ALL_CONTS.slice(),
    smartRepetition=saved?saved.smartRepetition:false;

function setPage(p){
  if(!isValid(p,['home','quiz','settings','map','badges']))return;
  page=p;
  if(p==='quiz')startQuiz();
  else{quizPhase='idle';selected=null;submitted=false;inputVal='';hintShown=false;mapSelected=null;quizResults=[];}
  render();
}

// ═══════════ QUIZ ═══════════
function buildQuestions(){
  var pool=COUNTRIES.filter(function(c){return continents.indexOf(c.continent)!==-1;});
  if(pool.length<4)return[];
  var count=Math.min(numFlags,pool.length);
  var sel;
  if(smartRepetition && Object.keys(progress.wrongCounts).length>0){
    var wrongPool=pool.filter(function(c){return progress.wrongCounts[c.code]>0;}).sort(function(a,b){return(progress.wrongCounts[b.code]||0)-(progress.wrongCounts[a.code]||0);});
    var normalPool=pool.filter(function(c){return!progress.wrongCounts[c.code];});
    var wc=Math.min(Math.ceil(count/2),wrongPool.length);
    sel=shuffle(wrongPool).slice(0,wc).concat(shuffle(normalPool).slice(0,count-wc));
    if(sel.length<count){var used={};sel.forEach(function(c){used[c.code]=true;});var rem=pool.filter(function(c){return!used[c.code];});sel=sel.concat(shuffle(rem).slice(0,count-sel.length));}
    sel=shuffle(sel);
  } else { sel=shuffle(pool).slice(0,count); }
  return sel.map(function(country){
    var sim=COUNTRIES.filter(function(c){return c.code===country.sf&&c.code!==country.code;})[0];
    var other=pool.filter(function(c){return c.code!==country.code&&c.code!==country.sf;});
    var rand=shuffle(other).slice(0,2);
    var opts=[{name:country.name,correct:true}];
    if(sim)opts.push({name:sim.name,correct:false});else{var f=shuffle(other)[0];if(f)opts.push({name:f.name,correct:false});}
    rand.forEach(function(c){opts.push({name:c.name,correct:false});});
    var used={};opts=opts.filter(function(o){if(used[o.name])return false;used[o.name]=true;return true;});
    while(opts.length<4){var ff=null;for(var i=0;i<other.length;i++){if(!used[other[i].name]){ff=other[i];break;}}if(!ff)break;used[ff.name]=true;opts.push({name:ff.name,correct:false});}
    return{country:country,options:shuffle(opts)};
  });
}
function startQuiz(){var q=buildQuestions();if(!q.length){quizPhase='error';return;}quizPhase='playing';questions=q;qIdx=0;score=0;selected=null;submitted=false;inputVal='';isCorrect=false;hintShown=false;quizResults=[];}

function recordResult(code,continent,correct){
  quizResults.push({code:code,continent:continent,correct:correct});
}
function recordAllResults(){
  var allCorrect=true;
  quizResults.forEach(function(r){
    if(r.correct){progress.correctCountries[r.code]=true;progress.continentCorrect[r.continent]=(progress.continentCorrect[r.continent]||0)+1;}
    else{allCorrect=false;progress.wrongCounts[r.code]=(progress.wrongCounts[r.code]||0)+1;}
  });
  if(allCorrect&&quizResults.length>0)progress.perfectQuizzes++;
  saveProgress();
}

function pickOption(idx){if(selected!==null)return;var q=questions[qIdx];if(!q||idx<0||idx>=q.options.length)return;selected=q.options[idx].name;var correct=q.options[idx].correct;if(correct)score++;recordResult(q.country.code,q.country.continent,correct);render();}
function submitTyping(){if(submitted)return;var cleaned=sanitize(inputVal);if(!cleaned.trim())return;var c=questions[qIdx].country;var n=norm(cleaned);isCorrect=n===norm(c.name)||(c.ms&&c.ms.some(function(m){return norm(m)===n;}));if(isCorrect)score++;recordResult(c.code,c.continent,isCorrect);submitted=true;render();}
function handleTypingInput(el){inputVal=sanitize(el.value);if(el.value!==inputVal)el.value=inputVal;var btn=document.getElementById('submit-btn');if(btn)btn.disabled=!inputVal.trim();}
function handleTypingKeydown(evt){if(evt.key==='Enter'){if(submitted)nextQ();else submitTyping();}}
function showHint(){hintShown=true;render();}
function nextQ(){
  if(qIdx+1>=questions.length){quizPhase='results';recordAllResults();render();
    if(score===questions.length)setTimeout(function(){if(typeof confetti!=='function')return;var end=Date.now()+3000;(function frame(){confetti({particleCount:4,angle:60,spread:55,origin:{x:0},colors:['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6']});confetti({particleCount:4,angle:120,spread:55,origin:{x:1},colors:['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6']});if(Date.now()<end)requestAnimationFrame(frame);})();},100);
    return;}
  qIdx++;selected=null;submitted=false;isCorrect=false;inputVal='';hintShown=false;render();setTimeout(function(){var el=document.getElementById('typein');if(el)el.focus();},60);
}
function toggleCont(c){if(!isValid(c,ALL_CONTS))return;if(continents.indexOf(c)!==-1){if(continents.length<=1)return;continents=continents.filter(function(x){return x!==c;});}else continents=continents.concat([c]);saveSettings();render();}
function setMode(m){if(!isValid(m,['multiple','typing']))return;quizMode=m;saveSettings();render();}
function toggleSmartRep(){smartRepetition=!smartRepetition;saveSettings();render();}
function handleSlider(el){var v=parseInt(el.value);if(isNaN(v)||v<10||v>25)return;numFlags=v;saveSettings();var d=document.getElementById('sval');if(d)d.textContent=v;}
function selectCountry(code){var c=null;for(var i=0;i<COUNTRIES.length;i++){if(COUNTRIES[i].code===code){c=COUNTRIES[i];break;}}mapSelected=c;render();window.scrollTo(0,0);}
function backToMap(){mapSelected=null;render();}
function resetProgress(){if(window.confirm('Reset all progress and badges? This cannot be undone.')){progress={correctCountries:{},continentCorrect:{},perfectQuizzes:0,wrongCounts:{}};saveProgress();render();}}

// ═══════════ RENDER ═══════════
function render(){
  var app=document.getElementById('app');
  var h='<nav><div class="logo" onclick="setPage(\'home\')"><span>🌍</span><h1>Flag Explorer</h1></div><div class="tabs">';
  h+='<button class="tab '+(page==='home'?'active':'')+'" onclick="setPage(\'home\')">🏠 Home</button>';
  h+='<button class="tab '+(page==='quiz'?'active':'')+'" onclick="setPage(\'quiz\')">🎯 Quiz</button>';
  h+='<button class="tab '+(page==='map'?'active':'')+'" onclick="setPage(\'map\')">🗺️ Map</button>';
  h+='<button class="tab '+(page==='badges'?'active':'')+'" onclick="setPage(\'badges\')">⭐ Badges</button>';
  h+='<button class="tab tab-subtle '+(page==='settings'?'active':'')+'" onclick="setPage(\'settings\')">⚙️</button>';
  h+='</div></nav><main>';
  if(page==='home')h+=renderHome();
  else if(page==='quiz')h+=renderQuiz();
  else if(page==='map')h+=renderMap();
  else if(page==='badges')h+=renderBadges();
  else h+=renderSettings();
  h+='</main>';app.innerHTML=h;
}

function renderHome(){
  var tc=Object.keys(progress.correctCountries).length;
  return '<div class="home"><div><div class="globe">🌍</div><h2>Flag Explorer</h2><p>Learn the flags of every country through fun quizzes and an interactive map!</p></div>'+
    '<div class="cards-main">'+
    '<div class="card" onclick="setPage(\'quiz\')"><div class="card-ico">🎯</div><h3>Flag Quiz</h3><p>Test your knowledge! Can you name the country from its flag?</p></div>'+
    '<div class="card" onclick="setPage(\'map\')"><div class="card-ico">🗺️</div><h3>World Map</h3><p>Explore countries and discover fun facts!</p></div>'+
    '</div>'+
    '<div class="home-links"><a class="badge-link" onclick="setPage(\'badges\')">⭐ '+(tc>0?tc+' countries learned — view badges':'View your badges')+'</a>'+
    '<a class="settings-link" onclick="setPage(\'settings\')">⚙️ Quiz settings</a></div></div>';
}

function renderQuiz(){
  if(quizPhase==='error')return '<div class="msg-center"><h2>Not enough countries!</h2><p>Enable more continents in Settings.</p><button class="btn" onclick="setPage(\'settings\')">⚙️ Go to Settings</button></div>';
  if(quizPhase==='results')return renderResults();
  if(quizPhase!=='playing')return '';
  return quizMode==='multiple'?renderMC():renderTyping();
}

function renderHint(country, answered) {
  if (answered) return '';
  if (!hintShown) return '<div class="hint-area"><button class="hint-btn" onclick="showHint()" title="Get a hint">💡</button></div>';
  return '<div class="hint-area"><div class="hint-text">💡 '+esc(getHint(country))+'</div></div>';
}

function renderMC(){
  var q=questions[qIdx];if(!q)return'';var pct=(qIdx+1)/questions.length*100;var fb='';
  if(selected!==null){var sel=null;for(var i=0;i<q.options.length;i++){if(q.options[i].name===selected){sel=q.options[i];break;}}
    fb=sel&&sel.correct?'<div class="fb ok">✅ Correct! Great job!</div>':'<div class="fb no">❌ Not quite! It\'s '+esc(q.country.name)+'</div>';}
  var opts='';for(var i=0;i<q.options.length;i++){var o=q.options[i],cls='opt';
    if(selected!==null){if(o.correct)cls+=' correct';else if(o.name===selected)cls+=' wrong';}
    opts+='<button class="'+cls+'" onclick="pickOption('+i+')"'+(selected!==null?' disabled':'')+'>'+esc(o.name)+'</button>';}
  var last=qIdx+1>=questions.length;
  return '<div class="quiz"><div class="prog"><div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%"></div></div><span class="prog-txt">'+(qIdx+1)+' / '+questions.length+'</span><span class="score-badge">⭐ '+score+'</span></div>'+
    '<div class="flag-box"><img class="flag-img" src="'+flagSrc(q.country.code)+'" alt="Flag"/><div class="q-text">Which country does this flag belong to?</div>'+
    renderHint(q.country,selected!==null)+
    '<div class="opts">'+opts+'</div>'+fb+(selected!==null?'<button class="btn" onclick="nextQ()">'+(last?'🏁 See Results':'Next Flag →')+'</button>':'')+'</div></div>';
}

function renderTyping(){
  var q=questions[qIdx];if(!q)return'';var pct=(qIdx+1)/questions.length*100;var fb='',cls='';
  if(submitted){cls=isCorrect?'correct':'wrong';
    if(isCorrect){fb=norm(inputVal)===norm(q.country.name)?'<div class="fb ok">✅ Correct! Great job!</div>':'<div class="fb ok">✅ Correct! (Spelling: '+esc(q.country.name)+')</div>';}
    else fb='<div class="fb no">❌ Not quite! The answer is '+esc(q.country.name)+'</div>';}
  var last=qIdx+1>=questions.length;
  return '<div class="quiz"><div class="prog"><div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%"></div></div><span class="prog-txt">'+(qIdx+1)+' / '+questions.length+'</span><span class="score-badge">⭐ '+score+'</span></div>'+
    '<div class="flag-box"><img class="flag-img" src="'+flagSrc(q.country.code)+'" alt="Flag"/><div class="q-text">Type the name of this country!</div>'+
    renderHint(q.country,submitted)+
    '<div class="input-area"><input id="typein" class="txt-in '+cls+'" value="'+esc(inputVal)+'" placeholder="Type country name..." '+(submitted?'disabled ':'')+' oninput="handleTypingInput(this)" onkeydown="handleTypingKeydown(event)" autocomplete="off" spellcheck="false" maxlength="'+MAX_INPUT+'"/>'+
    (!submitted?'<button id="submit-btn" class="btn" onclick="submitTyping()"'+(!inputVal.trim()?' disabled':'')+'>Check Answer</button>':'')+'</div>'+fb+
    (submitted?'<button class="btn" onclick="nextQ()">'+(last?'🏁 See Results':'Next Flag →')+'</button>':'')+'</div></div>';
}

function renderResults(){
  var pf=score===questions.length;var pct=Math.round(score/questions.length*100);var msg,ico;
  if(pf){msg="You're a flag genius!";ico='🏆';}else if(pct>=80){msg="Amazing!";ico='🌟';}else if(pct>=60){msg="Good job!";ico='👏';}else if(pct>=40){msg="Nice effort!";ico='💪';}else{msg="Keep exploring!";ico='🌍';}
  return '<div class="results"><div class="'+(pf?'perfect':'res-card')+'"><div class="res-icon">'+ico+'</div><h2>'+(pf?'PERFECT SCORE!':'Quiz Complete!')+'</h2><div class="res-score">'+score+' / '+questions.length+'</div><p class="res-msg">'+esc(msg)+'</p>'+
    '<div class="res-btns"><button class="btn" onclick="setPage(\'quiz\')">🔄 Play Again</button><button class="btn2" onclick="setPage(\'badges\')">⭐ Badges</button><button class="btn2" onclick="setPage(\'home\')">🏠 Home</button></div></div></div>';
}

// ═══════════ MAP ═══════════
function renderMap(){
  if(mapSelected)return renderCountryDetail();
  var h='<div class="map-page"><h2>🗺️ World Map</h2><p>Click any country to see its flag and fun facts!</p>';
  var conts=['Africa','Asia','Europe','North America','South America','Oceania'];
  var ce={Africa:'🌍',Asia:'🌏',Europe:'🏰','North America':'🌎','South America':'🌎',Oceania:'🏝️'};
  conts.forEach(function(cont){var cc=COUNTRIES.filter(function(c){return c.continent===cont;});if(!cc.length)return;
    h+='<div class="scard"><h3>'+ce[cont]+' '+esc(cont)+' <span style="font-family:Nunito;font-weight:600;font-size:.8rem;color:var(--med)">('+cc.length+')</span></h3><div style="display:flex;flex-wrap:wrap;gap:6px">';
    cc.forEach(function(c){h+='<button class="country-btn" onclick="selectCountry(\''+c.code+'\')"><img src="'+flagSrc(c.code)+'" alt=""/>'+esc(c.name)+'</button>';});
    h+='</div></div>';});
  h+='</div>';return h;
}
function renderCountryDetail(){
  var c=mapSelected;
  var h='<div class="detail-page"><button class="back-btn" onclick="backToMap()">← Back to World Map</button>';
  h+='<div class="detail-card"><div class="detail-header">';
  h+='<img class="detail-flag" src="'+flagSrc(c.code)+'" alt="Flag of '+esc(c.name)+'"/>';
  h+='<div class="detail-title"><h2>'+esc(c.name)+'</h2>';
  h+='<div class="detail-tags"><span class="info-tag">🏛️ Capital: '+esc(c.capital)+'</span><span class="info-tag">🌍 '+esc(c.continent)+'</span><span class="info-tag">👥 '+esc(c.population)+'</span></div></div></div>';
  if(COUNTRY_MAPS&&COUNTRY_MAPS[c.code]){
    h+='<div class="detail-map"><img src="'+COUNTRY_MAPS[c.code]+'" alt="Map of '+esc(c.name)+'"/></div>';
  }
  h+='<div class="detail-facts"><h3>Fun Facts</h3><ul>';
  c.facts.forEach(function(f){h+='<li>'+esc(f)+'</li>';});
  h+='</ul></div></div></div>';return h;
}

// ═══════════ BADGES ═══════════
function renderBadges(){
  var tc=Object.keys(progress.correctCountries).length;
  var pc=progress.perfectQuizzes;
  var topCont=null,topCount=0;
  ALL_CONTS.forEach(function(c){var n=progress.continentCorrect[c]||0;if(n>topCount){topCount=n;topCont=c;}});
  var ce={Africa:'🌍',Asia:'🌏',Europe:'🏰','North America':'🌎','South America':'🌎',Oceania:'🏝️'};

  var countryBadges=[{t:1,i:'🌱',n:'First Steps',d:'1 country'},{t:10,i:'🌿',n:'Beginner',d:'10 countries'},{t:25,i:'🌳',n:'Explorer',d:'25 countries'},{t:50,i:'🌏',n:'Globetrotter',d:'50 countries'},{t:100,i:'🗺️',n:'World Traveler',d:'100 countries'},{t:150,i:'🧭',n:'Flag Master',d:'150 countries'},{t:193,i:'👑',n:'World Champion',d:'All 193!'}];
  var perfectBadges=[{t:1,i:'⭐',n:'Perfect Start',d:'1 perfect quiz'},{t:3,i:'💫',n:'On a Roll',d:'3 perfect'},{t:5,i:'💎',n:'Quiz Champion',d:'5 perfect'},{t:10,i:'🏆',n:'Quiz Legend',d:'10 perfect'}];

  var h='<div class="badges-page"><h2>⭐ Achievement Badges</h2>';
  h+='<div class="badge-stats"><div class="badge-stat"><span class="stat-num">'+tc+'</span><span class="stat-label">Countries Learned</span></div>';
  h+='<div class="badge-stat"><span class="stat-num">'+pc+'</span><span class="stat-label">Perfect Quizzes</span></div>';
  h+='<div class="badge-stat"><span class="stat-num">'+(topCont?ce[topCont]:'—')+'</span><span class="stat-label">'+(topCont?esc(topCont)+' Expert':'No top continent')+'</span></div></div>';

  h+='<div class="badge-section"><h3>🌍 Countries Mastered</h3><div class="badge-grid">';
  countryBadges.forEach(function(b){var earned=tc>=b.t;
    h+='<div class="badge-card '+(earned?'earned':'locked')+'"><div class="badge-ico">'+(earned?b.i:'🔒')+'</div><div class="badge-info"><strong>'+b.n+'</strong><span>'+b.d+'</span></div>';
    h+=earned?'<div class="badge-chk">✓</div>':'<div class="badge-prog">'+tc+'/'+b.t+'</div>';h+='</div>';});
  h+='</div></div>';

  h+='<div class="badge-section"><h3>🏆 Perfect Quizzes</h3><div class="badge-grid">';
  perfectBadges.forEach(function(b){var earned=pc>=b.t;
    h+='<div class="badge-card '+(earned?'earned':'locked')+'"><div class="badge-ico">'+(earned?b.i:'🔒')+'</div><div class="badge-info"><strong>'+b.n+'</strong><span>'+b.d+'</span></div>';
    h+=earned?'<div class="badge-chk">✓</div>':'<div class="badge-prog">'+pc+'/'+b.t+'</div>';h+='</div>';});
  h+='</div></div>';

  h+='<div class="badge-section"><h3>🌐 Continent Expert</h3><div class="badge-grid">';
  ALL_CONTS.forEach(function(c){var n=progress.continentCorrect[c]||0;var isTop=c===topCont&&topCount>0;
    h+='<div class="badge-card '+(isTop?'earned':n>0?'partial':'locked')+'"><div class="badge-ico">'+ce[c]+'</div><div class="badge-info"><strong>'+esc(c)+'</strong><span>'+n+' correct</span></div>';
    if(isTop)h+='<div class="badge-chk">👑</div>';h+='</div>';});
  h+='</div></div>';

  h+='<div style="text-align:center;padding-top:16px"><button class="reset-btn" onclick="resetProgress()">🗑️ Reset All Progress</button></div>';
  h+='</div>';return h;
}

// ═══════════ SETTINGS ═══════════
function renderSettings(){
  var ce={Africa:'🌍',Asia:'🌏',Europe:'🏰','North America':'🌎','South America':'🌎','Oceania':'🏝️'};
  var ch='';ALL_CONTS.forEach(function(c){var on=continents.indexOf(c)!==-1;
    ch+='<div class="cont-tog '+(on?'on':'')+'" onclick="toggleCont(\''+esc(c)+'\')"><div class="cont-cb">'+(on?'✓':'')+'</div><span class="cont-nm">'+(ce[c]||'🌐')+' '+esc(c)+'</span></div>';});
  var wc=Object.keys(progress.wrongCounts).length;
  return '<div class="settings"><h2>⚙️ Settings</h2>'+
    '<div class="scard"><h3>🎮 Quiz Mode</h3><div class="mode-tog">'+
    '<button class="mt-btn '+(quizMode==='multiple'?'on':'')+'" onclick="setMode(\'multiple\')"><span class="mt-ico">🅰️</span><div class="mt-txt"><strong>Multiple Choice</strong><span>Pick from four options</span></div></button>'+
    '<button class="mt-btn '+(quizMode==='typing'?'on':'')+'" onclick="setMode(\'typing\')"><span class="mt-ico">⌨️</span><div class="mt-txt"><strong>Type the Answer</strong><span>Spell the country name</span></div></button></div></div>'+
    '<div class="scard"><h3>🔢 Number of Flags per Quiz</h3><div class="slider-val" id="sval">'+numFlags+'</div>'+
    '<input type="range" class="slider" min="10" max="25" value="'+numFlags+'" oninput="handleSlider(this)"/>'+
    '<div class="slider-labels"><span>10 flags</span><span>25 flags</span></div></div>'+
    '<div class="scard"><h3>🧠 Smart Repetition</h3>'+
    '<div class="smart-tog" onclick="toggleSmartRep()"><div class="tog-sw '+(smartRepetition?'on':'')+'"><div class="tog-knob"></div></div>'+
    '<div class="smart-txt"><strong>'+(smartRepetition?'Enabled':'Disabled')+'</strong><span>'+(smartRepetition?'Prioritizing '+wc+' flag'+(wc!==1?'s':'')+' you\'ve missed':'When enabled, quizzes focus on flags you get wrong')+'</span></div></div></div>'+
    '<div class="scard"><h3>🌍 Continents to Include</h3><div class="cont-grid">'+ch+'</div></div></div>';
}

render();
