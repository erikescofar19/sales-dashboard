import KpiCard from "./KpiCard";

function KpiSection({ sales, totalSales }) {
  const salesCount = sales.length;
  const average =
    salesCount > 0 ? (totalSales / salesCount).toFixed(2) : 0;

  // Producto más vendido
  const productCount = {};
  sales.forEach(sale => {
    productCount[sale.product_id] =
      (productCount[sale.product_id] || 0) + sale.quantity;
  });

  const topProduct = Object.keys(productCount).length
    ? Object.entries(productCount).sort((a, b) => b[1] - a[1])[0][0]
    : "—";

  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        flexWrap: "wrap",
        marginBottom: "2rem",
      }}
    >
      <KpiCard title="Total de ventas" value={`$${totalSales}`} />
      <KpiCard title="Ventas registradas" value={salesCount} />
      <KpiCard title="Promedio por venta" value={`$${average}`} />
      <KpiCard title="Producto más vendido" value={`Producto ${topProduct}`} />
    </div>
  );
}

export default KpiSection;
