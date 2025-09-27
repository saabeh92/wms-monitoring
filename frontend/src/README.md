# Warehouse Inventory Tracker

## Description
A web application to track warehouse inventory, built with **FastAPI** for the backend and **React** for the frontend.  

Features:
- Add, edit, delete inventory items (CRUD)
- Search items by name
- Highlight low stock items (quantity < 5)
- Total stock counter
- Interactive bar chart of item quantities
- Export inventory to CSV

---

## Setup Instructions

### Backend
1. Activate your Python virtual environment:
```bash
source venv/bin/activate
````

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the server:

```bash
uvicorn main:app --reload
```

* Backend will be available at `http://127.0.0.1:8000`

### Frontend

1. Go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

* Frontend will be available at `http://localhost:5173`

---

## Features

* CRUD operations for inventory items
* Search/filter by name
* Low stock alert (highlighted in red)
* Total stock counter
* Bar chart visualization
* CSV export

