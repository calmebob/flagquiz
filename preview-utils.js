"use strict";
function esc(s){if(s==null)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
var MAX_INPUT=100;
function sanitize(s){if(typeof s!=='string')return'';return s.replace(/[^\p{L}\p{N}\s\-'.]/gu,'').slice(0,MAX_INPUT);}
function isValid(v,list){return list.indexOf(v)!==-1;}
function flagSrc(code){return FLAGS[code]||'';}
var STORE_KEY='flag-explorer-settings';
var PROGRESS_KEY='flag-explorer-progress';
var ALL_CONTS=['Africa','Asia','Europe','North America','South America','Oceania'];
function loadSettings(){try{var r=localStorage.getItem(STORE_KEY);if(!r)return null;var p=JSON.parse(r);var n=Number(p.numFlags);var m=p.quizMode==='typing'?'typing':'multiple';var c=Array.isArray(p.continents)?p.continents.filter(function(x){return ALL_CONTS.indexOf(x)!==-1;}):ALL_CONTS.slice();return{numFlags:n>=10&&n<=25?n:25,quizMode:m,continents:c.length>0?c:ALL_CONTS.slice(),smartRepetition:!!p.smartRepetition};}catch(e){return null;}}
function saveSettings(){try{localStorage.setItem(STORE_KEY,JSON.stringify({numFlags:numFlags,quizMode:quizMode,continents:continents,smartRepetition:smartRepetition}));}catch(e){}}
function loadProgress(){try{var r=localStorage.getItem(PROGRESS_KEY);if(!r)return{correctCountries:{},continentCorrect:{},perfectQuizzes:0,wrongCounts:{}};var p=JSON.parse(r);return{correctCountries:p.correctCountries||{},continentCorrect:p.continentCorrect||{},perfectQuizzes:Number(p.perfectQuizzes)||0,wrongCounts:p.wrongCounts||{}};}catch(e){return{correctCountries:{},continentCorrect:{},perfectQuizzes:0,wrongCounts:{}};}}
function saveProgress(){try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress));}catch(e){}}
