const DRAFT_KEY = 'blueprintPortfolioDraft';
let siteData;
let activeFilter = 'ALL';

async function loadData(){
  const response = await fetch('./data/site.json', {cache:'no-store'});
  const base = await response.json();
  const draft = localStorage.getItem(DRAFT_KEY);
  siteData = draft ? safeParse(draft, base) : base;
  applyTheme(siteData.theme);
  renderAll();
}

function safeParse(value, fallback){
  try{return JSON.parse(value)}catch{return fallback}
}

function applyTheme(theme){
  const root = document.documentElement;
  const vars = {
    '--bg':theme.background,'--surface':theme.surface,'--ink':theme.ink,'--muted':theme.muted,
    '--accent':theme.accent,'--grid':theme.grid,'--line':theme.line,
    '--font-display':theme.fontDisplay,'--font-body':theme.fontBody,'--font-tech':theme.fontTechnical,
    '--lw':`${theme.lineWeight || 1}px`,'--grid-size':`${theme.gridSize || 24}px`,'--motion':theme.motion ?? 1
  };
  Object.entries(vars).forEach(([k,v])=>root.style.setProperty(k,v));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.background);
}

function renderAll(){
  document.title = siteData.meta.siteTitle;
  document.querySelector('meta[name="description"]')?.setAttribute('content',siteData.meta.siteDescription);
  renderHero();renderStats();renderFilters();renderTimeline();renderProjects();renderResearch();renderContact();setupReveal();
  document.getElementById('footerName').textContent = `${siteData.hero.name.split(' ').map(x=>x[0]).join('')} / ${new Date().getFullYear()}`;
}

function renderHero(){
  const h = siteData.hero;
  document.getElementById('hero').innerHTML = `
    <div class="dimension-line"></div><div class="hero-watermark">CONSTRUCTION INTELLIGENCE</div>
    <div class="hero-copy">
      <span class="technical kicker">${esc(h.eyebrow)}</span>
      <h1 class="hero-name">${esc(h.name)}</h1>
      <h2 class="hero-title">${esc(h.title)}</h2>
      <p class="hero-summary">${esc(h.summary)}</p>
      <div class="hero-actions"><a class="button" href="#log">${esc(h.primaryCta)} ↓</a><a class="button ghost" href="#research">${esc(h.secondaryCta)} →</a></div>
    </div>
    <div class="title-block technical">
      <div class="title-row"><span>SHEET</span><span>${esc(h.sheet)}</span></div>
      <div class="title-row"><span>REVISION</span><span>${esc(h.revision)}</span></div>
      <div class="title-row"><span>STATUS</span><span>${esc(h.issue)}</span></div>
      <div class="title-row"><span>SCALE</span><span>NTS</span></div>
    </div>`;
}

function renderStats(){
  document.getElementById('stats').innerHTML = siteData.stats.map(s=>`<div class="stat"><div class="stat-label">${esc(s.label)}</div><div class="stat-value">${esc(s.value)}</div></div>`).join('');
}

function renderFilters(){
  const cats=['ALL',...new Set(siteData.timeline.map(x=>x.category))];
  document.getElementById('filters').innerHTML=cats.map(c=>`<button class="filter ${c===activeFilter?'active':''}" data-filter="${escAttr(c)}">${esc(c)}</button>`).join('');
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.filter;renderFilters();renderTimeline();}));
}

function renderTimeline(){
  const items=siteData.timeline.filter(x=>activeFilter==='ALL'||x.category===activeFilter);
  document.getElementById('timeline').innerHTML=items.map(item=>`<article class="timeline-item">
    <div class="timeline-year">${esc(item.year)}</div>
    <div><div class="timeline-code">${esc(item.code)}</div><div class="timeline-code">${esc(item.category)}</div></div>
    <div><h3>${esc(item.title)}</h3><div class="timeline-org">${esc(item.org)}</div><p>${esc(item.description)}</p><div class="tags">${(item.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></div>
  </article>`).join('') || '<p class="technical">NO ITEMS IN THIS LAYER.</p>';
}

function renderProjects(){
  document.getElementById('projects').innerHTML=siteData.projects.map(p=>`<article class="project-card"><div class="project-number">${esc(p.number)}</div><div class="project-type">${esc(p.type)}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><div class="project-status">STATUS / ${esc(p.status)}</div></article>`).join('');
}

function renderResearch(){
  const r=siteData.research;
  document.getElementById('research').innerHTML=`<div class="section-title-row"><div><span class="technical kicker">${esc(r.label)}</span><h2>RESEARCH DIRECTION</h2></div><div class="scale-tag technical">${esc(r.sheet)}</div></div>
  <div class="research-card"><div class="research-side"><strong>${esc(r.sheet)}</strong><br><br>PROJECT KNOWLEDGE<br>+ PERCEPTION<br>+ PLANNING<br>+ MACHINE ACTION</div><div class="research-main"><blockquote>“${esc(r.statement)}”</blockquote><p>${esc(r.body)}</p></div></div>`;
}

function renderContact(){
  const c=siteData.contact;
  document.getElementById('contact').innerHTML=`<div class="contact-card"><div><span class="technical kicker">C-001 / CONTACT</span><h2>${esc(c.heading)}</h2><p>${esc(c.body)}</p></div><div class="contact-links"><a href="mailto:${escAttr(c.email)}">EMAIL / ${esc(c.email)}</a><a href="${escAttr(c.linkedin)}" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="${escAttr(c.github)}" target="_blank" rel="noreferrer">GITHUB ↗</a></div></div>`;
}

function setupReveal(){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}

function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function escAttr(v=''){return esc(v)}

document.addEventListener('mousemove',e=>{
  const c=document.getElementById('cursorCoordinate');
  if(c)c.textContent=`X:${String(e.clientX).padStart(4,'0')} Y:${String(e.clientY).padStart(4,'0')}`;
});

loadData().catch(err=>{console.error(err);document.body.insertAdjacentHTML('beforeend','<p style="padding:24px">Unable to load site data.</p>')});
