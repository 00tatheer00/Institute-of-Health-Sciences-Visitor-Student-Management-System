# Institute of Health Sciences — Visitor & Student Entry Management System

A web application for reception and administration teams to manage visitor check-in/check-out and student entry records at the Institute of Health Sciences.

## Capabilities

- **Visitor check-in and check-out:** Record visitor details, visitor type, purpose, person to meet, and visit times.
- **Visitor badges:** Generate printable visitor badges after check-in.
- **Student entry scanning:** Record student entry with a USB QR/barcode scanner or a laptop camera.
- **Student registration:** Register students individually or import CSV, JSON, and Excel files.
- **Dashboards:** View active visitors, today's visitors, student entries, and recent trends.
- **Reports and exports:** Search visitor logs, review student entry logs, and export records.
- **Administration:** Manage student records and application settings, including card themes.

## Technology

| Layer | Stack |
|---|---|
| Frontend | React 18, Vite 5 |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose |
| Charts | Recharts |
| QR scanning | html5-qrcode |
| Spreadsheet import | xlsx |

## Requirements

- Node.js 18+
- npm
- MongoDB (local or remote)

## Local setup

Install the backend and frontend dependencies from the repository root:

```bash
git clone https://github.com/00tatheer00/Institute-of-Health-Sciences-Visitor-Student-Management-System.git
cd Institute-of-Health-Sciences-Visitor-Student-Management-System
npm run install:all
```

Configure the backend environment before starting the API. Create `backend/.env` and set:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ihs-visitor-management
NODE_ENV=development
```

If the frontend needs a separate API base URL, configure `VITE_API_URL` in the client environment according to the deployment environment.

Run the backend and frontend in separate terminals:

Terminal 1:

```bash
npm run backend
```

Terminal 2:

```bash
npm run client
```

The backend listens on port 5000. The Vite development server uses port 3000 as configured in the project.

## Useful scripts

| Command | Purpose |
|---|---|
| `npm run install:all` | Install backend and frontend dependencies |
| `npm run backend` | Start the Express API |
| `npm run client` | Start the Vite development server |
| `npm run build` | Build the frontend for production |

## Documentation

See [FEATURES.md](./FEATURES.md) for step-by-step instructions for visitor badges, bulk student import, QR scanning, dashboards, and reports.

## Security and deployment

- Do not commit `.env` files or production database credentials.
- Replace development/demo administrator credentials before deployment.
- Configure CORS, session/authentication settings, and the database for the target environment.
- The repository contains a generated `client/dist/` folder in Git history. Keep future build output out of version control; rebuild it with `npm run build` when needed.

## License

No license file was identified during this documentation review. Confirm the intended license before redistributing or reusing the project.
