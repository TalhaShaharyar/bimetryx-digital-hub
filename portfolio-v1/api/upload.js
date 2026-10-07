import {put} from '@vercel/blob';
import {validSession} from './_auth.js';

function safeName(name='image'){
  return name.replace(/[^a-zA-Z0-9._-]+/g,'-').slice(-120);
}

async function bodyBuffer(req){
  if(Buffer.isBuffer(req.body)) return req.body;
  if(typeof req.body==='string') return Buffer.from(req.body);
  const chunks=[];
  for await(const c of req) chunks.push(Buffer.isBuffer(c)?c:Buffer.from(c));
  return Buffer.concat(chunks);
}

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(!validSession(req)) return res.status(401).json({error:'Not authorized'});
  const filename=safeName(req.query.filename||'image');
  const contentType=req.headers['content-type']||'application/octet-stream';
  if(!contentType.startsWith('image/')) return res.status(400).json({error:'Only image uploads are allowed'});
  const buf=await bodyBuffer(req);
  if(!buf.length) return res.status(400).json({error:'Empty upload'});
  if(buf.length>8*1024*1024) return res.status(413).json({error:'Image is too large. Maximum 8 MB.'});
  const blob=await put('portfolio/media/'+Date.now()+'-'+filename,buf,{access:'public',contentType});
  return res.status(200).json({ok:true,url:blob.url});
}