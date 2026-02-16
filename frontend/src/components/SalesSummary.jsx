function SalesSummary({ totalSales, salesCount }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Total de ventas: ${totalSales}</h2>
      <p>Ventas registradas: {salesCount}</p>

      {salesCount > 0 && (
        <p>
          Promedio por venta: ${(totalSales / salesCount).toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default SalesSummary;
