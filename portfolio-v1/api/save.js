import {put} from '@vercel/blob';
import {validSession} from './_auth.js';
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(!validSession(req)) return res.status(401).json({error:'Not authorized'});
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
  await put('portfolio/site-content.json',JSON.stringify(body,null,2),{
    access:'public',
    addRandomSuffix:false,
    allowOverwrite:true,
    contentType:'application/json'
  });
  return res.status(200).json({ok:true});
}