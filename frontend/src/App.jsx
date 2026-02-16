import { useEffect, useState, useMemo, useCallback } from "react";
import SalesChart from "./components/SalesChart";
import KpiSection from "./components/KpiSection";
import SalesTable from "./components/SalesTable";
import ProductFilter from "./components/ProductFilter";
import TopDayKpi from "./components/TopDayKpi";
import ProductManager from "./components/ProductManager";
import SalesManager from "./components/SalesManager";
import Loader from "./components/Loader";

import { getSales, getSummary } from "./services/salesService";
import { getProducts } from "./services/productService";

function App() {
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({ total_sales: 0, by_day: [] });
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSales = useCallback(async () => {
    const data = await getSales();
    setSales(data);
  }, []);

  const fetchProductsData = useCallback(async () => {
    const data = await getProducts();
    setProducts(data);
  }, []);

  const fetchSummaryData = useCallback(async () => {
    const data = await getSummary(startDate, endDate);
    setSummary(data);
  }, [startDate, endDate]);

  const refreshDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all([
        fetchSales(),
        fetchSummaryData(),
        fetchProductsData(),
      ]);
    } catch (err) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  }, [fetchSales, fetchSummaryData, fetchProductsData]);

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const filteredSales = useMemo(() => {
    return sales.filter((sale) =>
      selectedProduct === "all"
        ? true
        : sale.product_id === Number(selectedProduct)
    );
  }, [sales, selectedProduct]);

  const productIds = products.map((p) => p.id);

  if (loading) return <Loader message="Cargando dashboard..." />;

  if (error) {
    return (
      <div style={centerWrapper}>
        <div style={errorCard}>
          <h2 style={{ marginBottom: "1rem" }}>⚠️ {error}</h2>
          <button onClick={refreshDashboard} style={retryButton}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={appWrapper}>
      <div style={container}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>📊 Sales Dashboard</h1>
          <p style={subtitleStyle}>
            Panel profesional de análisis y gestión de ventas
          </p>
        </header>

        <section style={responsiveGrid}>
          <div style={cardStyle}>
            <KpiSection sales={sales} totalSales={summary.total_sales} />
          </div>

          <div style={cardStyle}>
            <TopDayKpi byDay={summary.by_day} />
          </div>
        </section>

        <section style={cardStyle}>
          <SalesChart data={summary.by_day} />
        </section>

        <section style={responsiveGrid}>
          <div style={cardStyle}>
            <SalesManager
              products={products}
              onSaleCreated={refreshDashboard}
            />
          </div>

          <div style={cardStyle}>
            <ProductManager />
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={sectionTitle}>Filtros</h2>

          <ProductFilter
            products={productIds}
            selectedProduct={selectedProduct}
            onChange={setSelectedProduct}
          />

          <div style={dateWrapper}>
            <div>
              <label style={labelStyle}>Desde</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Hasta</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={sectionTitle}>Ventas</h2>
          <SalesTable sales={filteredSales} />
        </section>
      </div>
    </div>
  );
}

/* ================================
   ESTILOS PROFESIONALES CLAROS
================================ */

const appWrapper = {
  minHeight: "100vh",
  background: "#f3f4f6",
  padding: "2rem",
  fontFamily: "Inter, system-ui, sans-serif",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const headerStyle = {
  marginBottom: "2rem",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "0.5rem",
};

const subtitleStyle = {
  color: "#6b7280",
};

const cardStyle = {
  background: "#ffffff",
  padding: "1.8rem",
  borderRadius: "16px",
  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
};

const responsiveGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "1.5rem",
  marginBottom: "1.5rem",
};

const sectionTitle = {
  marginBottom: "1rem",
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "#111827",
};

const dateWrapper = {
  marginTop: "1.5rem",
  display: "flex",
  gap: "1.5rem",
  flexWrap: "wrap",
};

const labelStyle = {
  fontSize: "0.85rem",
  color: "#6b7280",
};

const inputStyle = {
  display: "block",
  marginTop: "0.5rem",
  padding: "0.6rem",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
};

const centerWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f3f4f6",
};

const errorCard = {
  padding: "2rem",
  borderRadius: "16px",
  background: "#ffffff",
  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
  textAlign: "center",
};

const retryButton = {
  padding: "0.6rem 1.2rem",
  borderRadius: "8px",
  border: "none",
  background: "#111827",
  color: "white",
  cursor: "pointer",
};

export default App;
