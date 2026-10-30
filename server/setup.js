import 'dotenv/config';import crypto from 'node:crypto';import {db} from './lib/db.js';import {hashPassword} from './lib/auth.js';
const username=process.env.GLAD_ADMIN_USER||'admin';const password=process.env.GLAD_ADMIN_PASSWORD;
if(!password||password.length<14){console.error('Set GLAD_ADMIN_PASSWORD to a strong password (14+ characters) for this command.');process.exit(1)}
const salt=crypto.randomBytes(24).toString('hex');db.prepare('INSERT OR REPLACE INTO admins(username,hash,salt) VALUES(?,?,?)').run(username,hashPassword(password,salt),salt);db.prepare('DELETE FROM sessions').run();console.log(`Admin ${username} configured. Remove GLAD_ADMIN_PASSWORD from environment after setup.`);
