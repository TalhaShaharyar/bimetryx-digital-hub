import {list} from '@vercel/blob';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
export default async function handler(req,res){
  if(req.method!=='GET') return res.status(405).json({error:'Method not allowed'});
  try{
    const out=await list({prefix:'portfolio/site-content.json',limit:1});
    if(out.blobs&&out.blobs.length){
      const r=await fetch(out.blobs[0].url,{cache:'no-store'});
      if(r.ok){
        res.setHeader('Cache-Control','no-store');
        return res.status(200).json(await r.json());
      }
    }
  }catch{}
  const raw=await readFile(path.join(process.cwd(),'data','site.json'),'utf8');
  res.setHeader('Cache-Control','no-store');
  return res.status(200).json(JSON.parse(raw));
}