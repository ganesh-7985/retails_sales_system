# Architecture Document

## Overview

The Retail Sales Management System is a full-stack web application designed to manage and analyze retail sales data. It follows a client-server architecture with clear separation of concerns between the frontend and backend components.

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture Pattern**: MVC (Model-View-Controller)

### Folder Structure
```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   └── salesController.js
│   ├── services/          # Business logic layer
│   │   └── salesService.js
│   ├── routes/            # API route definitions
│   │   ├── salesRoutes.js
│   │   └── filterRoutes.js
│   ├── models/            # MongoDB schemas
│   │   └── Sale.js
│   ├── utils/             # Helper functions
│   │   ├── queryBuilder.js
│   │   └── seedDatabase.js
│   └── index.js           # Application entry point
├── package.json
└── README.md
```

### Module Responsibilities

#### Controllers (`/controllers`)
- Handle HTTP requests and responses
- Validate input parameters
- Delegate business logic to services
- Format and return responses

#### Services (`/services`)
- Implement business logic
- Interact with database through models
- Process and transform data
- Handle complex queries

#### Routes (`/routes`)
- Define API endpoints
- Map URLs to controller methods
- Group related endpoints

#### Models (`/models`)
- Define MongoDB schemas
- Create database indexes
- Define data validation rules

#### Utils (`/utils`)
- Query builder for MongoDB operations
- Database seeding utility
- Helper functions

### API Design

The backend exposes a RESTful API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sales` | GET | Get paginated sales with filters |
| `/api/sales/:id` | GET | Get single sale by ID |
| `/api/filters/options` | GET | Get filter dropdown options |

### Query Parameters

- **Pagination**: `page`, `limit`
- **Search**: `search` (searches customerName, phoneNumber)
- **Sorting**: `sortBy`, `sortOrder`
- **Filters**: `customerRegion`, `gender`, `ageMin`, `ageMax`, `productCategory`, `tags`, `paymentMethod`, `dateFrom`, `dateTo`

---

## Frontend Architecture

### Technology Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Architecture Pattern**: Component-based with Custom Hooks

### Folder Structure
```
frontend/
├── src/
│   ├── components/        # React UI components
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── SalesTable.jsx
│   │   └── Pagination.jsx
│   ├── hooks/             # Custom React hooks
│   │   └── useSales.js
│   ├── services/          # API communication layer
│   │   └── api.js
│   ├── utils/             # Utility functions
│   │   └── formatters.js
│   ├── styles/            # Global styles
│   │   └── index.css
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── public/
├── package.json
└── README.md
```

### Module Responsibilities

#### Components (`/components`)
- **Header**: Application header with logo and refresh button
- **SearchBar**: Debounced search input for customer name/phone
- **FilterPanel**: Multi-select filters for various attributes
- **SortDropdown**: Dropdown for selecting sort field and order
- **SalesTable**: Data table displaying sales records
- **Pagination**: Navigation controls for paged results

#### Hooks (`/hooks`)
- **useSales**: Central state management for sales data, handles:
  - Data fetching
  - Search, filter, sort state
  - Pagination state
  - Loading and error states

#### Services (`/services`)
- **api.js**: Axios-based API client with:
  - Request configuration
  - Response transformation
  - Error handling

#### Utils (`/utils`)
- **formatters.js**: Formatting functions for:
  - Currency values
  - Dates
  - Status badges
  - Text truncation

---

## Data Flow

### Request Flow
```
User Action → Component → useSales Hook → API Service → Backend API
```

### Response Flow
```
Backend API → API Service → useSales Hook → Component State → UI Update
```

### State Management Flow
```
1. User interacts with UI (search/filter/sort/paginate)
2. Component calls handler from useSales hook
3. Hook updates query state
4. useEffect triggers API call with new parameters
5. Response updates sales data and pagination
6. Components re-render with new data
```

---

## Database Schema

### Sale Document
```javascript
{
  // Customer Fields
  customerId: String,
  customerName: String,      // Indexed for search
  phoneNumber: String,       // Indexed for search
  gender: String,            // Indexed for filter
  age: Number,               // Indexed for filter
  customerRegion: String,    // Indexed for filter
  customerType: String,

  // Product Fields
  productId: String,
  productName: String,
  brand: String,
  productCategory: String,   // Indexed for filter
  tags: [String],            // Indexed for filter

  // Sales Fields
  quantity: Number,          // Indexed for sort
  pricePerUnit: Number,
  discountPercentage: Number,
  totalAmount: Number,
  finalAmount: Number,

  // Operational Fields
  date: Date,                // Indexed for filter and sort
  paymentMethod: String,     // Indexed for filter
  orderStatus: String,
  deliveryType: String,
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
}
```

### Indexes
- Text index on `customerName` and `phoneNumber` for search
- Compound index on `date` and `customerName` for sorting
- Individual indexes on filter fields for query performance

---

## Key Design Decisions

1. **Separation of Concerns**: Clear separation between frontend and backend with API-based communication

2. **Centralized State Management**: Custom hook (`useSales`) manages all sales-related state to avoid prop drilling and ensure consistency

3. **Query Builder Pattern**: Backend uses a query builder utility to construct MongoDB queries from URL parameters, ensuring maintainability

4. **Debounced Search**: Frontend implements debounced search to reduce API calls during typing

5. **Parallel Data Fetching**: Backend fetches data and count in parallel for better performance

6. **Responsive Design**: UI components are built with mobile-first approach using Tailwind CSS

7. **Error Handling**: Both frontend and backend implement comprehensive error handling with user-friendly messages
