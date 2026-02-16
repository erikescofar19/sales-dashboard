from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app import models
from app.routers.sales import router as sales_router
from app.routers.products import router as products_router
from app.routers.dashboard import router as dashboard_router 

app = FastAPI(title="Sales Dashboard API")

# 🔥 CONFIGURACIÓN CORS CORRECTA
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # permite GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],
)

# crear tablas
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Sales Dashboard API running"}

# routers
app.include_router(sales_router)
app.include_router(products_router)
app.include_router(dashboard_router)
