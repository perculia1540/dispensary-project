# MUST Dispensary — Backend API

Node.js + Express + MongoDB backend for the MUST Dispensary Appointment
frontend. It powers two forms from your site:

- `appointment.html` → `POST /api/appointments`
- `contact.html` → `POST /api/contact`

## Folder structure

```
backend/
├── config/
│   ├── db.js          # MongoDB connection
│   └── seed.js         # optional sample-data script
├── controllers/
│   ├── appointmentController.js
│   └── contactController.js
├── middleware/
│   ├── errorHandler.js
│   └── rateLimiter.js
├── models/
│   ├── Appointment.js
│   └── ContactMessage.js
├── routes/
│   ├── appointmentRoutes.js
│   └── contactRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

## 1. Install Node.js

Download and install Node.js LTS (v18 or later) from https://nodejs.org
if you don't already have it. Check it worked:

```bash
node -v
npm -v
```

## 2. Install project dependencies

From inside the `backend` folder:

```bash
cd backend
npm install
```

This installs: `express`, `mongoose`, `cors`, `dotenv`,
`express-validator`, `helmet`, `morgan`, `express-rate-limit`, and
`nodemon` (dev only).

---

## 3. Set up MongoDB

You have two options — a local install, or a free cloud database
(MongoDB Atlas). Atlas is the easiest if you don't want to install
anything locally.

### Option A — MongoDB Atlas (cloud, recommended for beginners)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a
   free account.
2. Create a new **free (M0) cluster** — pick any cloud provider/region
   close to you.
3. Under **Database Access**, create a database user with a username
   and password (save these — you'll need them).
4. Under **Network Access**, click **Add IP Address** and choose
   **Allow Access from Anywhere** (`0.0.0.0/0`) for development, or add
   your current IP.
5. Once the cluster is created, click **Connect → Drivers**, choose
   **Node.js**, and copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your database user's
   credentials, and add a database name before the `?`, e.g.
   `.../must_dispensary?retryWrites=true...`.
7. Paste this into your `.env` file as `MONGODB_URI` (see step 4
   below).

### Option B — Local MongoDB install

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Windows:**
Download the MongoDB Community Server installer from
https://www.mongodb.com/try/download/community, run it (choose
"Install as a Service"), then MongoDB starts automatically.

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

Once installed and running, your local connection string is:
```
mongodb://127.0.0.1:27017/must_dispensary
```
The `must_dispensary` database and its collections are created
automatically the first time data is written — no manual setup
needed.

---

## 4. Configure environment variables

Copy the example env file and edit it:

```bash
cp .env.example .env
```

Open `.env` and set:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/must_dispensary
CLIENT_ORIGIN=http://127.0.0.1:5500
```

- `MONGODB_URI` — your local or Atlas connection string from step 3.
- `CLIENT_ORIGIN` — the URL your frontend is served from (e.g. the
  VS Code "Live Server" default `http://127.0.0.1:5500`, or wherever
  you host `index.html`). This is used for CORS so the browser allows
  the frontend to call the API.

`.env` is already listed in `.gitignore` — never commit real
credentials.

---

## 5. Run the server

Development (auto-restarts on file changes):
```bash
npm run dev
```

Production:
```bash
npm start
```

You should see:
```
MongoDB connected: <host>/must_dispensary
Server running on http://localhost:5000
```

Visit `http://localhost:5000` in a browser — you should see:
```json
{ "success": true, "message": "MUST Dispensary API is running" }
```

Optional: seed a couple of sample records:
```bash
npm run seed
```

---

## 6. API Reference

Base URL: `http://localhost:5000/api`

### Appointments

| Method | Endpoint              | Description                     |
|--------|------------------------|----------------------------------|
| POST   | `/appointments`        | Create a new appointment        |
| GET    | `/appointments`        | List all appointments           |
| GET    | `/appointments?status=Pending` | Filter by status        |
| GET    | `/appointments/:id`    | Get one appointment             |
| PUT    | `/appointments/:id`    | Update an appointment (e.g. status) |
| DELETE | `/appointments/:id`    | Delete/cancel an appointment    |

**POST /api/appointments** body (matches `appointment.html` fields):
```json
{
  "fullname": "Jane Mwakalinga",
  "registration": "MUST/2024/0123",
  "phone": "0712345678",
  "email": "jane@example.com",
  "gender": "Female",
  "date": "2026-09-15",
  "time": "10:30",
  "service": "General Consultation",
  "reason": "Routine checkup"
}
```

### Contact messages

| Method | Endpoint    | Description             |
|--------|-------------|--------------------------|
| POST   | `/contact`  | Submit a contact message |
| GET    | `/contact`  | List all messages        |

**POST /api/contact** body (matches `contact.html` fields):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "What are your opening hours on weekends?"
}
```

All responses follow this shape:
```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "...", "errors": [ ... ] }
```

---

## 7. Connecting your existing frontend

Your uploaded `js/script.js` currently only fakes a confirmation
message locally — it never sends data anywhere. A rewritten version
that calls this API is included alongside this backend
(`frontend-updates/js/script.js`). To use it:

1. Replace your `js/script.js` with the new one.
2. At the top of the file, `API_BASE_URL` is set to
   `http://localhost:5000/api` — update this if you deploy the backend
   elsewhere.
3. Make sure `CLIENT_ORIGIN` in your backend `.env` matches whatever
   URL you open the frontend from (e.g. Live Server's
   `http://127.0.0.1:5500`), so CORS allows the request.

**Note:** the `appointment.html`, `contact.html`, and `js/script.js`
files in your uploaded zip each start and end with a stray ` ```html `
/ ` ```javascript ` / ` ``` ` code-fence line (left over from copy-
pasting out of a Markdown source). Browsers will render these as
literal text at the top and bottom of the page. Delete those fence
lines from each file before deploying.

You'll also want two small CSS classes for error states — add this to
`style.css` near your existing `.success-message` rule:
```css
.error-message {
    background-color: #fdecea;
    border: 1px solid #f5c2c0;
    color: #611a15;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
}
```

---

## 8. Suggested next steps

- Add authentication (e.g. JWT) to protect the `GET`/`PUT`/`DELETE`
  admin endpoints so only staff can view or manage appointments.
- Build a small admin page that lists appointments from
  `GET /api/appointments` and lets staff update `status`.
- Add email/SMS notifications when an appointment is created.
- Deploy the backend (Render, Railway, Fly.io, etc.) and point
  `API_BASE_URL` in the frontend at the deployed URL.
