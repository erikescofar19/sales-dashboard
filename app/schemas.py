from pydantic import BaseModel, Field
from datetime import date
from typing import Optional


# ======================
# SALES
# ======================

class SaleBase(BaseModel):
    product_id: int = Field(..., gt=0)
    quantity: int = Field(..., gt=0)
    total: float = Field(..., gt=0)
    date: date


class SaleCreate(SaleBase):
    pass


class SaleResponse(SaleBase):
    id: int

    model_config = {
        "from_attributes": True
    }


# ======================
# PRODUCTS
# ======================

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    model_config = {
        "from_attributes": True
    }
