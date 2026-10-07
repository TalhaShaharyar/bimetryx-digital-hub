import {validSession} from './_auth.js';
export default function handler(req,res){const ok=validSession(req);return res.status(ok?200:401).json({ok})}