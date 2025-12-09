# Backend

Express API server for the retail sales system.

## Setup

```bash
npm install
cp .env.example .env   # Add your MongoDB URI
npm run dev
```

Runs on http://localhost:5001

## Seed Database

To import data from CSV:

```bash
npm run seed
```

Place your CSV file at `data/truestate_assignment_dataset.csv`

## API Endpoints

**GET /api/sales** - List sales with filters

Query params: `page`, `limit`, `search`, `sortBy`, `sortOrder`, `customerRegion`, `gender`, `ageMin`, `ageMax`, `productCategory`, `tags`, `paymentMethod`, `dateFrom`, `dateTo`

**GET /api/sales/:id** - Get single sale

**GET /api/filters/options** - Get dropdown options

## Files

- `src/controllers/` - Route handlers
- `src/services/` - Business logic
- `src/models/` - MongoDB schemas
- `src/utils/` - Query builder, seeder
