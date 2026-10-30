import 'dotenv/config';import contactRoute from './routes/contact.js';import express from 'express';import helmet from 'helmet';import path from 'node:path';import {db} from './lib/db.js';import {login,logout,auth,checkOrigin} from './lib/auth.js';import content from './routes/content.js';import uploads from './routes/uploads.js';
const app=express();app.disable('x-powered-by');app.use(helmet({contentSecurityPolicy:false}));app.use(express.json({limit:'40kb'}));app.use(checkOrigin);
const attempts=new Map();app.post('/api/login',(req,res)=>{const ip=req.ip;let a=attempts.get(ip)||{count:0,until:0};if(a.until>Date.now())return res.status(429).json({error:'Too many attempts; retry later'});if(!login(String(req.body.username||''),String(req.body.password||''),res)){a.count++;if(a.count>=8){a={count:0,until:Date.now()+15*60*1000}}attempts.set(ip,a);return res.status(401).json({error:'Invalid credentials'})}attempts.delete(ip);res.json({ok:true});});
app.get('/api/me',auth,(req,res)=>res.json({username:req.username}));app.post('/api/logout',auth,logout);
app.use('/api',content);app.use('/api/uploads',uploads);
app.use('/api', contactRoute);
app.use(express.static(path.resolve('public'),{index:'index.html'}));app.use((err,req,res,next)=>{console.error(err.message);res.status(err.status||500).json({error:err.code==='LIMIT_FILE_SIZE'?'Image exceeds 4 MB': 'Request could not be completed'});});
const port=Number(process.env.PORT||3000);app.listen(port,()=>console.log(`Glad General Trading website: http://localhost:${port} | admin: http://localhost:${port}/admin.html`));
