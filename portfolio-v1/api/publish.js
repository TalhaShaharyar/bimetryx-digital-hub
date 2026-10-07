const DATA_PATH = 'portfolio-v1/data/site.json';

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const required=['GITHUB_TOKEN','ADMIN_PUBLISH_KEY'];
  const missing=required.filter(k=>!process.env[k]);
  if(missing.length) return res.status(503).json({error:`Publishing is not configured. Missing Vercel environment variables: ${missing.join(', ')}`});
  if(req.headers['x-admin-publish-key']!==process.env.ADMIN_PUBLISH_KEY) return res.status(401).json({error:'Invalid admin publish key'});

  const repo=process.env.GITHUB_REPO || 'TalhaShaharyar/bimetryx-digital-hub';
  const branch=process.env.GITHUB_BRANCH || 'main';
  const [owner,name]=repo.split('/');
  if(!owner||!name) return res.status(500).json({error:'GITHUB_REPO must use owner/name format'});

  const token=process.env.GITHUB_TOKEN;
  const headers={Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'};
  const fileUrl=`https://api.github.com/repos/${owner}/${name}/contents/${DATA_PATH}?ref=${encodeURIComponent(branch)}`;
  const getFile=await fetch(fileUrl,{headers});
  if(!getFile.ok) return res.status(502).json({error:`Could not read current GitHub content (${getFile.status})`});
  const current=await getFile.json();

  const content=Buffer.from(JSON.stringify(req.body,null,2)+'\n','utf8').toString('base64');
  const update=await fetch(`https://api.github.com/repos/${owner}/${name}/contents/${DATA_PATH}`,{
    method:'PUT',headers,body:JSON.stringify({message:'Update portfolio content via admin',content,sha:current.sha,branch})
  });
  const result=await update.json();
  if(!update.ok) return res.status(502).json({error:result.message||`GitHub update failed (${update.status})`});
  return res.status(200).json({ok:true,commitSha:result.commit?.sha||null});
}
