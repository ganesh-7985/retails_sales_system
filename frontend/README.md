# Frontend

React app for the retail sales dashboard.

## Setup

```bash
npm install
npm run dev
```

Runs on http://localhost:3000

## Build

```bash
npm run build
```

## Files

- `src/components/` - UI components (Sidebar, DataTable, FilterBar, etc.)
- `src/hooks/useSales.js` - Data fetching and state management
- `src/services/api.js` - API calls

## Config

The app proxies `/api` requests to the backend (configured in `vite.config.js`).
