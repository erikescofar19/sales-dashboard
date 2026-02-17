## Sales Dashboard

## Read this documentation in English:
[🇺🇸 English README](./README.md) 

Sales Dashboard es una aplicación web para gestionar y analizar ventas.  
Permite registrar productos y ventas, visualizar estadísticas y tendencias, y aplicar filtros por producto y rango de fechas.  
Está diseñado para ser parte de tu portafolio, demostrando habilidades completas en **React**, **FastAPI**, **SQLAlchemy**, y diseño de aplicaciones full-stack.

---

## Características principales

###  Funcionalidades

- Gestión de productos (CRUD).
- Registro de ventas con fecha personalizada.
- Dashboard con métricas clave (KPIs).
- Visualización de ventas por día en gráficas.
- Filtros por producto y fechas.
- Ordenamiento sortable en tabla de ventas.
- Manejo de estados de carga y errores en la interfaz.
- API separada usando FastAPI para lógica backend.

---

## 📁 Estructura del proyecto

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

---

## Tecnologías usadas

### Frontend
- React
- Recharts para gráficos
- Fetch API
- CSS moderno (estilos modulables)

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- Pydantic para validaciones
- SQLite (local)

---

## Instalación y configuración

### Local — Backend

1. Clonar el repositorio  

   ```bash
   git clone https://github.com/erikescofar19/sales-dashboard.git

2. Entrar a la carpeta backend

   ```bash
   cd sales-dashboard/backend

3. Crear entorno virtual

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux / Mac
   .\venv\Scripts\activate    # Windows

4. Instalar dependencias

   ```bash
   pip install -r requirements.txt

5. Correr el servidor

   ```bash
   uvicorn app.main:app --reload

El backend será accesible en:

http://127.0.0.1:8000

### Local — Frontend

1. Ir a la carpeta frontend

   ```bash
   cd ../frontend

2. Instalar dependencias

   ```bash
   npm install

3. Levantar el frontend

   ```bash
   npm run dev

La app correrá en:

http://localhost:5173

### Uso

- Al ingresar a la aplicación podrás ver el dashboard con métricas generales.

- Usar “Registrar Venta” para crear nuevas ventas con fecha específica.

- Usar “Gestión de Productos” para agregar o editar productos.

- Filtrar ventas por producto y rango de fechas.

- La tabla permite ordenar por total y fecha.

### Buenas prácticas implementadas

- Separación de lógica frontend/backend.

- Arquitectura modular de componentes.

- Manejo de estados de error y carga.

- Validación en backend con mensajes claros.

- API con endpoints REST correctamente estructurados.

### Mejora continua

Este proyecto está preparado para futuras mejoras, tales como:

- Autenticación de usuarios.

- Dashboards por usuario.

- Exportación de reportes a CSV/PDF.

- Despliegue en servicios como Vercel/Render.

## Autor

Erik Eduardo Escobar Farías

Proyecto full-stack desarrollado como práctica profesional utilizando React, FastAPI y SQLAlchemy. 
Enfocado en arquitectura limpia, separación de responsabilidades, manejo de estado en frontend, diseño de APIs REST y aplicación de reglas de negocio reales para análisis y gestión de ventas.
