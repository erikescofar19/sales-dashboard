from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import SessionLocal
from app import models

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    total_sales = db.query(func.sum(models.Sale.total)).scalar() or 0
    total_orders = db.query(func.count(models.Sale.id)).scalar() or 0

    sales_by_day = (
        db.query(
            models.Sale.date,
            func.sum(models.Sale.total).label("total")
        )
        .group_by(models.Sale.date)
        .order_by(models.Sale.date)
        .all()
    )

    return {
        "total_sales": total_sales,
        "total_orders": total_orders,
        "sales_by_day": [
            {
                "date": d.date,
                "total": d.total
            }
            for d in sales_by_day
        ]
    }
