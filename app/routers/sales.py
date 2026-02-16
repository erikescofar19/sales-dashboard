from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date as date_type
from typing import List, Optional

from app.database import SessionLocal
from app import models, schemas


router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)


# ================================
# DB DEPENDENCY
# ================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================================
# READ - obtener ventas
# ================================

@router.get("/", response_model=List[schemas.SaleResponse])
def get_sales(db: Session = Depends(get_db)):
    return db.query(models.Sale).all()


# ================================
# CREATE - crear venta
# ================================

@router.post("/", response_model=schemas.SaleResponse)
def create_sale(
    sale: schemas.SaleCreate,
    db: Session = Depends(get_db)
):
    # Validaciones
    if sale.quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Quantity must be greater than 0"
        )

    if sale.total <= 0:
        raise HTTPException(
            status_code=400,
            detail="Total must be greater than 0"
        )

    if sale.date > date_type.today():
        raise HTTPException(
            status_code=400,
            detail="Date cannot be in the future"
        )

    product = db.query(models.Product).filter(
        models.Product.id == sale.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    new_sale = models.Sale(
        product_id=sale.product_id,
        quantity=sale.quantity,
        total=sale.total,
        date=sale.date
    )

    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)

    return new_sale


# ================================
# SUMMARY - datos para dashboard
# ================================

@router.get("/summary")
def sales_summary(
    start: Optional[date_type] = Query(None),
    end: Optional[date_type] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Sale)

    # Filtros opcionales por rango de fecha
    if start:
        query = query.filter(models.Sale.date >= start)

    if end:
        query = query.filter(models.Sale.date <= end)

    total_sales = query.with_entities(
        func.sum(models.Sale.total)
    ).scalar() or 0

    sales_by_day = (
        query.with_entities(
            models.Sale.date,
            func.sum(models.Sale.total).label("total")
        )
        .group_by(models.Sale.date)
        .order_by(models.Sale.date)
        .all()
    )

    return {
        "total_sales": total_sales,
        "by_day": [
            {"date": d.date, "total": d.total}
            for d in sales_by_day
        ]
    }
