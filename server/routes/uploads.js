import {Router} from 'express';import multer from 'multer';import path from 'node:path';import fs from 'node:fs';import crypto from 'node:crypto';import {db} from '../lib/db.js';import {auth} from '../lib/auth.js';
const r=Router();const directory=path.resolve('public/assets/uploads');fs.mkdirSync(directory,{recursive:true});
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:4*1024*1024,files:1,fields:0}});
r.post('/:id',auth,upload.single('image'),(req,res)=>{const item=db.prepare('SELECT id FROM items WHERE id=?').get(req.params.id);if(!item)return res.status(404).json({error:'Item not found'});if(!req.file)return res.status(400).json({error:'Choose an image'});const b=req.file.buffer;
let ext='';if(b.length>12&&b[0]===0xff&&b[1]===0xd8&&b[2]===0xff)ext='.jpg';else if(b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))ext='.png';else if(b.subarray(0,4).toString()==='RIFF'&&b.subarray(8,12).toString()==='WEBP')ext='.webp';
if(!ext)return res.status(400).json({error:'Only JPEG, PNG and WebP images are accepted'});
const filename=crypto.randomUUID()+ext;fs.writeFileSync(path.join(directory,filename),b,{flag:'wx'});const image='/assets/uploads/'+filename;db.prepare('UPDATE items SET image=? WHERE id=?').run(image,item.id);res.json({image});});
export default r;
