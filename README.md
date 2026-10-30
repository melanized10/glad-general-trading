# Glad General Trading — full-stack VS Code project

A section-based website in **HTML, CSS and JavaScript**, with **Node.js + Express** API and **SQLite** database. The old all-in-one editor is replaced with a database-backed **Admin Dashboard**.

## Setup (Windows PowerShell in VS Code)
1. Install Node.js (current supported LTS) and VS Code.
2. Extract ZIP, then VS Code → File → Open Folder → select this folder.
3. In VS Code Terminal, run `npm install`.
4. Run `Copy-Item .env.example .env`.
5. Configure administrator credentials (choose your own password):
   ```powershell
   $env:GLAD_ADMIN_USER="admin"
   $env:GLAD_ADMIN_PASSWORD="YOUR-UNIQUE-STRONG-PASSWORD-14-CHARS-OR-MORE"
   npm run setup
   Remove-Item Env:GLAD_ADMIN_PASSWORD
   ```
6. Run `npm start` or `npm run dev`.
7. Open `http://localhost:3000` (public website) and `http://localhost:3000/admin.html` (editor). **Do not open index.html by double-clicking or Live Server**; backend API needs Node running.

## Project map
- `public/index.html` HTML shell and navigation
- `public/css/style.css` global blue/black/white theme
- `public/js/sections/hero.js`, `about.js`, `services.js`, `purpose.js`, `team.js`, `contractors.js`, `portfolio.js`, `contact.js` — independent frontend sections
- `public/js/main.js` fetches content from backend and renders sections
- `public/admin.html`, `public/js/admin.js` editor UI
- `server/app.js` Express startup, login and security
- `server/routes/content.js` CRUD for settings and section items
- `server/routes/uploads.js` image upload endpoint
- `server/lib/db.js` SQLite structure and initial company records
- `server/lib/auth.js` password checking and login sessions
- `data/glad.sqlite` automatically created; backup this file regularly (and image folder).
- `public/assets/uploads/` uploaded image files

## Editing each feature
- **Hero/About/Vision/Mission/Goal/Aims/Contact**: Admin → Company information, then Save the individual field.
- **Services, Team (2 founders and 8 staff), Contractors, Portfolio**: Admin → Choose Section → edit rows, add or delete entries, upload image.
- Images can be JPEG, PNG or WebP, maximum 4 MB each.
- Client/contractor names and portfolio entries are intentionally blank until confirmed. Team names are placeholders. Draft purpose statements need management approval.

## Important safety / deployment notes
This is a functional **local development starter**, not a security-certified production deployment. For public hosting: place behind HTTPS, configure `NODE_ENV=production` and trusted reverse-proxy settings as appropriate, implement durable rate limiting, image re-encoding and malware scanning, backup and restore procedures, database migration, role-based access where needed, audit logs, CSRF defenses for all browser clients, and monitoring. Test and review prior to deployment. Do not commit `.env`, SQLite files, or sensitive files. Verify business registration claims before publicly presenting them as independently verified.

## API
`GET /api/site` public data; `POST /api/login`, `POST /api/logout`; authenticated `PUT /api/settings/:key`, `POST /api/items/:section`, `PUT /api/items/:id`, `DELETE /api/items/:id`, `POST /api/uploads/:id`.
