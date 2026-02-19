## Sales Dashboard

## Read this documentation in Spanish:
[🇪🇸 README en Español](./README.es.md)

Sales Dashboard is a web application designed to manage and analyze sales data.  
It allows users to register products and sales, visualize statistics and trends, and apply filters by product and date range.  
It is intended to be part of a professional portfolio, demonstrating full-stack skills in **React**, **FastAPI**, **SQLAlchemy**, and full-stack application design.

---

## 🚀 Live Demo

- **Live Application:** https://sales-dashboard-erikescofar19s-projects.vercel.app/
- **Live API:** https://sales-dashboard-1jev.onrender.com
- **API Documentation (Swagger):** https://sales-dashboard-1jev.onrender.com/docs

---
## Main Features

### Functionalities

- Product management (CRUD).
- Sales registration with custom date selection.
- Dashboard with key metrics (KPIs).
- Daily sales visualization through charts.
- Product and date range filtering.
- Sortable sales table.
- Loading and error state handling in the interface.
- Separate API using FastAPI for backend logic.

---

## 📁 Project Structure

```bash
sales-dashboard/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── SalesChart.jsx
│ │ │ ├── KpiSection.jsx
│ │ │ ├── SalesTable.jsx
│ │ │ ├── ProductFilter.jsx
│ │ │ ├── TopDayKpi.jsx
│ │ │ ├── ProductManager.jsx
│ │ │ └── SalesManager.jsx
│ │ ├── services/
│ │ │ ├── salesService.js
│ │ │ └── productService.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── package.json
├── backend/
│ ├── app/
│ │ ├── models.py
│ │ ├── schemas.py
│ │ ├── routers/
│ │ │ ├── products.py
│ │ │ └── sales.py
│ │ └── main.py
│ ├── database.py
│ └── requirements.txt
├── .gitignore
└── README.md
```

## Technologies Used
# Frontend

- React

- Recharts for data visualization

- Fetch API

- Modern CSS (modular styling)

# Backend

- FastAPI (Python)

- SQLAlchemy ORM

- Pydantic for validation

- SQLite (local database)

## Installation and Setup
# Local — Backend

1. Clone the repository

   ```bash
   git clone https://github.com/erikescofar19/sales-dashboard.git

2. Navigate to the backend folder

   ```bash
   cd sales-dashboard/backend
   
3. Create a virtual environment

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux / Mac
   .\venv\Scripts\activate    # Windows

4. Install dependencies

   ```bash
   pip install -r requirements.txt

5. Run the server

   ```bash
   uvicorn app.main:app --reload

The backend will be available at:

http://127.0.0.1:8000

# Local — Frontend

1. Navigate to the frontend folder

   ```bash
   cd ../frontend

2. Install dependencies

   ```bash
   npm install

3. Start the development server

   ```bash
   npm run dev

The application will run at:

http://localhost:5173

## Usage

- Upon entering the application, you will see the dashboard with general metrics.

- Use “Register Sale” to create new sales with a specific date.

- Use “Product Management” to add or edit products.

- Filter sales by product and date range.

-  The table allows sorting by total amount and date.

## Implemented Best Practices

- Clear separation between frontend and backend logic.

- Modular component architecture.

- Proper loading and error state handling.

- Backend validation with clear error messages.

- REST API endpoints correctly structured.

## Continuous Improvement

This project is prepared for future improvements such as:

- User authentication.

- Multi-user dashboards.

- Export reports to CSV/PDF.

- Deployment to services such as Vercel/Render.

## Author
Erik Eduardo Escobar Farias

Full-stack project developed as professional practice using React, FastAPI, and SQLAlchemy.
Focused on clean architecture, separation of concerns, frontend state management, REST API design, and implementation of real-world business rules for sales analysis and management.