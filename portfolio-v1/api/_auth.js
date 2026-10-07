import crypto from 'node:crypto';
const COOKIE='portfolio_admin';
function b64(v){return Buffer.from(v).toString('base64url')}
function sign(payload){return crypto.createHmac('sha256',process.env.SESSION_SECRET||'').update(payload).digest('base64url')}
export function createSession(){const payload=b64(JSON.stringify({exp:Date.now()+1000*60*60*24*7}));return payload+'.'+sign(payload)}
export function validSession(req){const raw=req.headers.cookie||'';const m=raw.match(new RegExp('(?:^|;\\s*)'+COOKIE+'=([^;]+)'));if(!m)return false;const parts=m[1].split('.');if(parts.length!==2)return false;const payload=parts[0],sig=parts[1],expected=sign(payload);try{if(sig.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return false;const obj=JSON.parse(Buffer.from(payload,'base64url').toString('utf8'));return obj.exp>Date.now()}catch{return false}}
export function setSessionCookie(res,token){res.setHeader('Set-Cookie',COOKIE+'='+token+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800')}
export function clearSessionCookie(res){res.setHeader('Set-Cookie',COOKIE+'=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0')}