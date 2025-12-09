# Retail Sales Management System

A web app for browsing and filtering retail sales data. Uses React + Tailwind for the frontend and Node.js + MongoDB for the backend.

## Quick Start

```bash
# Install everything
npm install
cd backend && npm install
cd ../frontend && npm install

# Set up backend config
cd backend
cp .env.example .env
# Add your MongoDB connection string to .env

npm run seed

# Run the app
cd ..
npm run dev
```

Open http://localhost:3000 in your browser.

## What it does

- Search by customer name or phone number
- Filter by region, gender, age, category, tags, payment method, date
- Sort by date, quantity, or customer name
- Paginate results (10/25/50/100 per page)

## Tech used

**Frontend:** React 18, Vite, Tailwind CSS, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose

## Project layout

```
backend/          # API server
  src/
    controllers/  # Route handlers
    models/       # DB schemas
    routes/       # API endpoints
    services/     # Business logic
    utils/        # Helpers

frontend/         # React app
  src/
    components/   # UI components
    hooks/        # Custom hooks
    services/     # API calls
```

## API

- `GET /api/sales` - List sales (with search/filter/sort/pagination)
- `GET /api/sales/:id` - Get one sale
- `GET /api/filters/options` - Get filter dropdown options
# retails_sales_system
