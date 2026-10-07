const DRAFT_KEY='blueprintPortfolioDraft';
let data;

const presets={
  blueprint:{label:'Blueprint Paper',background:'#f4f1e8',surface:'#faf8f1',ink:'#14233b',muted:'#687386',accent:'#d96b2b',grid:'#c8ced6',line:'#293a52'},
  cadDark:{label:'CAD Dark',background:'#0c1117',surface:'#121922',ink:'#e7edf5',muted:'#8d9aaa',accent:'#55d6be',grid:'#263445',line:'#a6b7ca'},
  fieldGreen:{label:'Field Green',background:'#eef1e7',surface:'#f8f9f3',ink:'#1f3026',muted:'#667068',accent:'#c45d2d',grid:'#c8d0c3',line:'#354c3d'},
  concrete:{label:'Concrete + Safety',background:'#ecebea',surface:'#f6f4f1',ink:'#242424',muted:'#6e6b68',accent:'#f36c21',grid:'#cfcac5',line:'#333333'},
  mono:{label:'Monochrome Plot',background:'#f8f8f5',surface:'#ffffff',ink:'#111111',muted:'#626262',accent:'#111111',grid:'#d8d8d2',line:'#111111'}
};

async function init(){
  const base=await (await fetch('./data/site.json',{cache:'no-store'})).json();
  const draft=localStorage.getItem(DRAFT_KEY);
  data=draft?JSON.parse(draft):base;
  bindTabs();renderContent();renderTheme();syncJson();bindActions();
}

function bindTabs(){
  document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab,.admin-tab-panel').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
    syncJson();
  }));
}

function input(label,path,value,full=false,area=false){
  return `<label class="${full?'full':''}">${label}${area?`<textarea data-path="${path}">${esc(value)}</textarea>`:`<input data-path="${path}" value="${esc(value)}">`}</label>`;
}

function renderContent(){
  const h=data.hero,r=data.research,c=data.contact;
  document.getElementById('contentEditor').innerHTML=
    card('HERO / A-001',[
      input('Eyebrow','hero.eyebrow',h.eyebrow),input('Name','hero.name',h.name),
      input('Title','hero.title',h.title,true),input('Summary','hero.summary',h.summary,true,true),
      input('Primary CTA','hero.primaryCta',h.primaryCta),input('Secondary CTA','hero.secondaryCta',h.secondaryCta),
      input('Sheet','hero.sheet',h.sheet),input('Revision','hero.revision',h.revision),input('Issue','hero.issue',h.issue,true)
    ])+
    card('RESEARCH / R-001',[
      input('Statement','research.statement',r.statement,true,true),input('Body','research.body',r.body,true,true),
      input('Sheet','research.sheet',r.sheet),input('Label','research.label',r.label)
    ])+
    card('CONTACT / C-001',[
      input('Heading','contact.heading',c.heading),input('Body','contact.body',c.body,true,true),
      input('Email','contact.email',c.email),input('LinkedIn','contact.linkedin',c.linkedin),input('GitHub','contact.github',c.github,true)
    ])+
    `<div class="admin-card"><h3>TIMELINE / PROJECT LOG</h3><div id="timelineEditor" class="array-editor"></div></div>
     <div class="admin-card"><h3>WORKS / PROJECT CARDS</h3><div id="projectEditor" class="array-editor"></div><div class="row-actions"><button class="button small" id="addProject">+ PROJECT CARD</button></div></div>`;

  document.querySelectorAll('[data-path]').forEach(el=>el.oninput=()=>{setPath(data,el.dataset.path,el.value);syncJson()});
  renderTimeline();renderProjects();
  document.getElementById('addProject').onclick=()=>{data.projects.push({number:'P-'+(101+data.projects.length),title:'NEW PROJECT',type:'PROJECT TYPE',description:'Describe the project.',status:'DRAFT'});renderContent();syncJson()};
}

function renderTimeline(){
  const box=document.getElementById('timelineEditor');
  box.innerHTML=data.timeline.map((x,i)=>`<div class="array-item"><div class="form-grid">
    ${arr('Year',i,'year',x.year)}${arr('Code',i,'code',x.code)}${arr('Category',i,'category',x.category)}${arr('Organization',i,'org',x.org)}
    ${arr('Title',i,'title',x.title,true)}${arr('Description',i,'description',x.description,true,true)}${arr('Tags, comma separated',i,'tags',(x.tags||[]).join(', '),true)}
  </div><div class="row-actions"><button class="button ghost small danger" data-remove-timeline="${i}">REMOVE ITEM</button></div></div>`).join('');
  box.querySelectorAll('[data-timeline-field]').forEach(el=>el.oninput=()=>{
    const i=+el.dataset.index,k=el.dataset.timelineField;
    data.timeline[i][k]=k==='tags'?el.value.split(',').map(v=>v.trim()).filter(Boolean):el.value;syncJson();
  });
  box.querySelectorAll('[data-remove-timeline]').forEach(el=>el.onclick=()=>{data.timeline.splice(+el.dataset.removeTimeline,1);renderContent();syncJson()});
}

function renderProjects(){
  const box=document.getElementById('projectEditor');
  box.innerHTML=data.projects.map((x,i)=>`<div class="array-item"><div class="form-grid">
    ${proj('Number',i,'number',x.number)}${proj('Type',i,'type',x.type)}${proj('Title',i,'title',x.title,true)}${proj('Description',i,'description',x.description,true,true)}${proj('Status',i,'status',x.status)}
  </div><div class="row-actions"><button class="button ghost small danger" data-remove-project="${i}">REMOVE CARD</button></div></div>`).join('');
  box.querySelectorAll('[data-project-field]').forEach(el=>el.oninput=()=>{data.projects[+el.dataset.index][el.dataset.projectField]=el.value;syncJson()});
  box.querySelectorAll('[data-remove-project]').forEach(el=>el.onclick=()=>{data.projects.splice(+el.dataset.removeProject,1);renderContent();syncJson()});
}

function renderTheme(){
  document.getElementById('presetGrid').innerHTML=Object.entries(presets).map(([k,p])=>`<button class="preset" data-preset="${k}"><div class="preset-swatches"><span style="background:${p.background}"></span><span style="background:${p.ink}"></span><span style="background:${p.accent}"></span></div><strong>${p.label}</strong></button>`).join('');
  document.querySelectorAll('[data-preset]').forEach(el=>el.onclick=()=>{Object.assign(data.theme,presets[el.dataset.preset],{preset:el.dataset.preset});renderTheme();syncJson()});

  const t=data.theme, fonts=['Arial, Helvetica, sans-serif','Georgia, serif','Verdana, Geneva, sans-serif',"Impact, Haettenschweiler, sans-serif","'Courier New', Courier, monospace"];
  document.getElementById('themeEditor').innerHTML=
    ['background','surface','ink','muted','accent','grid','line'].map(k=>`<label>${k.toUpperCase()}<input type="color" data-theme="${k}" value="${t[k]}"><input data-theme="${k}" value="${t[k]}"></label>`).join('')+
    select('DISPLAY FONT','fontDisplay',t.fontDisplay,fonts)+select('BODY FONT','fontBody',t.fontBody,fonts)+select('TECHNICAL FONT','fontTechnical',t.fontTechnical,fonts)+
    range('LINE WEIGHT','lineWeight',t.lineWeight,1,3,.5)+range('GRID SIZE','gridSize',t.gridSize,16,48,2)+range('MOTION','motion',t.motion,0,1,.1);

  document.querySelectorAll('[data-theme]').forEach(el=>el.oninput=()=>{
    const k=el.dataset.theme;data.theme[k]=el.type==='range'?Number(el.value):el.value;
    document.querySelectorAll('[data-theme="'+k+'"]').forEach(other=>{if(other!==el)other.value=el.value});
    syncJson();
  });
}

function bindActions(){
  document.getElementById('addTimeline').onclick=()=>{data.timeline.push({year:'2027',code:'NEW-01',category:'NEW LAYER',title:'New Timeline Item',org:'Organization',description:'Describe the milestone.',tags:['Tag']});renderContent();syncJson()};
  document.getElementById('saveDraft').onclick=()=>{localStorage.setItem(DRAFT_KEY,JSON.stringify(data));status('DRAFT SAVED. OPEN PREVIEW TO INSPECT.')};
  document.getElementById('resetDraft').onclick=()=>{localStorage.removeItem(DRAFT_KEY);location.reload()};
  document.getElementById('applyJson').onclick=()=>{try{data=JSON.parse(document.getElementById('jsonEditor').value);renderContent();renderTheme();syncJson();status('JSON APPLIED TO DRAFT')}catch(e){status('JSON ERROR: '+e.message)}};
  document.getElementById('exportJson').onclick=()=>{const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='portfolio-site.json';a.click();URL.revokeObjectURL(a.href)};
  document.getElementById('importJson').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{data=JSON.parse(await f.text());renderContent();renderTheme();syncJson();status('JSON IMPORTED')}catch(err){status('IMPORT ERROR: '+err.message)}};
  document.getElementById('publishButton').onclick=publish;
}

async function publish(){
  status('PUBLISHING REVISION…');
  try{
    const res=await fetch('./api/publish',{method:'POST',headers:{'Content-Type':'application/json','x-admin-publish-key':document.getElementById('publishKey').value},body:JSON.stringify(data)});
    const out=await res.json();if(!res.ok)throw new Error(out.error||'Publish failed');
    localStorage.removeItem(DRAFT_KEY);status('PUBLISHED\nCOMMIT: '+out.commitSha+'\nVERCEL REDEPLOY WILL FOLLOW.');
  }catch(e){status('NOT PUBLISHED\n'+e.message+'\n\nSAVE DRAFT + EXPORT JSON STILL WORK.')}
}

function card(title,fields){return `<div class="admin-card"><h3>${title}</h3><div class="form-grid">${fields.join('')}</div></div>`}
function arr(label,i,k,v,full=false,area=false){return `<label class="${full?'full':''}">${label}${area?`<textarea data-index="${i}" data-timeline-field="${k}">${esc(v)}</textarea>`:`<input data-index="${i}" data-timeline-field="${k}" value="${esc(v)}">`}</label>`}
function proj(label,i,k,v,full=false,area=false){return `<label class="${full?'full':''}">${label}${area?`<textarea data-index="${i}" data-project-field="${k}">${esc(v)}</textarea>`:`<input data-index="${i}" data-project-field="${k}" value="${esc(v)}">`}</label>`}
function select(label,k,v,opts){return `<label>${label}<select data-theme="${k}">${opts.map(o=>`<option value="${esc(o)}" ${o===v?'selected':''}>${esc(o)}</option>`).join('')}</select></label>`}
function range(label,k,v,min,max,step){return `<label>${label}<input type="range" data-theme="${k}" min="${min}" max="${max}" step="${step}" value="${v}"></label>`}
function setPath(o,path,v){const p=path.split('.');let x=o;for(let i=0;i<p.length-1;i++)x=x[p[i]];x[p[p.length-1]]=v}
function syncJson(){document.getElementById('jsonEditor').value=JSON.stringify(data,null,2)}
function status(msg){document.getElementById('publishStatus').textContent='STATUS: '+msg}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

init().catch(e=>document.body.insertAdjacentHTML('beforeend','<pre>'+esc(e.message)+'</pre>'));
