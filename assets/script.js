// 年份
const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

// 主题切换
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
function setMode(m){ root.style.setProperty('color-scheme', m==='light'?'light':'dark'); }
let pref = localStorage.getItem('mode') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
setMode(pref);
if(themeToggle){ themeToggle.addEventListener('click', ()=>{ pref = (pref==='dark'?'light':'dark'); localStorage.setItem('mode', pref); setMode(pref); }); }

// 滚动进度条
const progressBar = document.getElementById('progressBar');
function updateProgress(){
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY || window.pageYOffset) / (h || 1);
  if(progressBar){ progressBar.style.height = (scrolled*100) + '%'; }
}
addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// 观察可见章节，控制圆点激活 / 步骤显隐
const dots = Array.from(document.querySelectorAll('.dot'));
const sections = Array.from(document.querySelectorAll('.observe'));
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    const id = e.target.getAttribute('id');
    if(e.isIntersecting){
      // 激活对应圆点
      dots.forEach(d=>d.classList.toggle('active', d.getAttribute('href') === '#'+id));
    }
  });
},{rootMargin: '-40% 0px -40% 0px', threshold: 0.1});
sections.forEach(s=>io.observe(s));

// 步骤进入动画
const stepIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=> e.target.classList.toggle('visible', e.isIntersecting));
},{rootMargin:'-20% 0px -20% 0px', threshold:0.1});
document.querySelectorAll('.step').forEach(st=>stepIo.observe(st));
