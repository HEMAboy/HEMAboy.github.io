
function toggleMenu(){ document.getElementById('nav').classList.toggle('open'); }
const y=document.getElementById('year'); if(y){ y.textContent = new Date().getFullYear(); }
// Theme toggle
const btn = document.getElementById('themeToggle');
const root = document.documentElement;
function setMode(m){ if(m==='light'){ root.style.setProperty('color-scheme','light'); } else { root.style.setProperty('color-scheme','dark'); } }
let pref = localStorage.getItem('mode') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
setMode(pref);
if(btn){ btn.addEventListener('click', ()=>{ pref = (pref==='dark'?'light':'dark'); localStorage.setItem('mode', pref); setMode(pref); }); }
