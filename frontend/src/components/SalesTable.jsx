import { useState } from "react";

function SalesTable({ sales }) {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const sortedSales = [...sales].sort((a, b) => {
    if (sortConfig.key === "date") {
      return sortConfig.direction === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }

    if (sortConfig.key === "total") {
      return sortConfig.direction === "asc"
        ? a.total - b.total
        : b.total - a.total;
    }

    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <thead style={{ background: "#f0f0f0" }}>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Producto</th>
          <th style={thStyle}>Cantidad</th>

          {/* ORDENAR POR TOTAL */}
          <th
            style={{ ...thStyle, cursor: "pointer" }}
            onClick={() => handleSort("total")}
          >
            Total 
          </th>

          {/* ORDENAR POR FECHA */}
          <th
            style={{ ...thStyle, cursor: "pointer" }}
            onClick={() => handleSort("date")}
          >
            Fecha 
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedSales.map((sale) => (
          <tr key={sale.id}>
            <td style={tdStyle}>{sale.id}</td>
            <td style={tdStyle}>Producto {sale.product_id}</td>
            <td style={tdStyle}>{sale.quantity}</td>
            <td style={tdStyle}>${sale.total}</td>
            <td style={tdStyle}>{sale.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "0.9rem",
};

const tdStyle = {
  padding: "12px",
  borderTop: "1px solid #eaeaea",
  fontSize: "0.9rem",
};

export default SalesTable;
