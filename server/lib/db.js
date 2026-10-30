import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

/* DATABASE STORAGE - LOCAL & RAILWAY */

const base = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve('data');

fs.mkdirSync(base, { recursive: true });

const databasePath = path.join(base, 'glad.sqlite');

export const db = new Database(databasePath);

console.log(`Database location: ${databasePath}`);

db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT,section TEXT NOT NULL,title TEXT NOT NULL DEFAULT '',subtitle TEXT NOT NULL DEFAULT '',description TEXT NOT NULL DEFAULT '',image TEXT NOT NULL DEFAULT '',position INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS admins (username TEXT PRIMARY KEY,hash TEXT NOT NULL,salt TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (tokenhash TEXT PRIMARY KEY, username TEXT NOT NULL,expires INTEGER NOT NULL);`);

/* ==========================================
   PUBLIC WEBSITE PREVIEW DATA
   For temporary hosting without a disk
========================================== */

if (process.env.PUBLIC_PREVIEW_SEED === '1') {
  const seedFile = path.resolve('seed/public-content.json');

  if (!fs.existsSync(seedFile)) {
    throw new Error('Public preview seed file is missing');
  }

  const content = JSON.parse(
    fs.readFileSync(seedFile, 'utf8')
  );

  if (
    !Array.isArray(content.settings) ||
    !Array.isArray(content.items)
  ) {
    throw new Error('Invalid public preview data');
  }

  const loadPreview = db.transaction(() => {
    db.prepare('DELETE FROM settings').run();
    db.prepare('DELETE FROM items').run();

    const insertSetting = db.prepare(
      'INSERT INTO settings(key,value) VALUES(?,?)'
    );

    for (const setting of content.settings) {
      insertSetting.run(setting.key, setting.value);
    }

    const insertItem = db.prepare(`
      INSERT INTO items(
        section,title,subtitle,description,image,position
      )
      VALUES(?,?,?,?,?,?)
    `);

    for (const item of content.items) {
      insertItem.run(
        item.section,
        item.title,
        item.subtitle || '',
        item.description || '',
        item.image || '',
        item.position || 0
      );
    }
  });

  loadPreview();
  console.log('Public website preview content loaded.');
}

const defaults={company:'Glad General Trading',tagline:'Driven by purpose. Built on trust.',heroText:'A South Sudanese multipurpose company delivering general trading, construction, general supply, and clearance & forwarding solutions since 2013.',about:'Established in 2013, Glad General Trading is a multipurpose South Sudanese company providing trading, construction, supply, and logistics-related services.',established:'2013',registration:'18838',petroleum:'01852',address:'Kator, Tombura Road (Abayilif), Juba, South Sudan',phone1:'+211910010102',phone2:'+211927599955',email:'glasdgeneral2013@gmail.com',vision:'To be a trusted, leading multipurpose trading and service company in South Sudan, recognized for quality, integrity, and dependable delivery.',mission:'To provide reliable trading, construction, supply, and clearance and forwarding solutions that meet client needs and create lasting value.',goal:'To build sustainable client relationships through professional service, timely execution, and consistent quality.',aims:'To grow our service capabilities, uphold ethical business standards, create employment opportunities, and contribute to South Sudan’s development.'};
const set=db.prepare('INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)');for(const [k,v] of Object.entries(defaults))set.run(k,v);
const count=db.prepare('SELECT COUNT(*) n FROM items WHERE section=?');
const add=db.prepare('INSERT INTO items(section,title,subtitle,description,position) VALUES(?,?,?,?,?)');
const seed=(section,rows)=>{if(!count.get(section).n)rows.forEach((r,i)=>add.run(section,r[0],r[1]||'',r[2]||'',i))};
seed('services', [['General Trading','','Commercial trading, sourcing, and coordinated delivery of goods.'],['Construction','','Construction-related solutions, coordination, and materials.'],['General Supply','','Procurement and supply of products, equipment, and materials.'],['Clearance & Forwarding','','Shipment coordination, cargo clearance support, and forwarding services.']]);
seed('founders',Array.from({length:2},(_,i)=>[`Co-founder ${i+1} — Name`,'Co-founder','']));
seed('staff',Array.from({length:8},(_,i)=>[`Staff Member ${i+1} — Name`,'Staff','']));
// Portfolio and contractor lists start empty; don't fabricate credentials or clients.
export const sections=['services','founders','staff','contractors','portfolio'];
