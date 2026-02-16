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

  const getArrow = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div style={tableWrapper}>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Producto</th>
            <th style={thStyle}>Cantidad</th>

            <th
              style={{ ...thStyle, cursor: "pointer" }}
              onClick={() => handleSort("total")}
            >
              Total {getArrow("total")}
            </th>

            <th
              style={{ ...thStyle, cursor: "pointer" }}
              onClick={() => handleSort("date")}
            >
              Fecha {getArrow("date")}
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedSales.map((sale) => (
            <tr key={sale.id} style={rowStyle}>
              <td style={tdStyle}>{sale.id}</td>
              <td style={tdStyle}>Producto {sale.product_id}</td>
              <td style={tdStyle}>{sale.quantity}</td>
              <td style={{ ...tdStyle, fontWeight: "600" }}>
                ${sale.total}
              </td>
              <td style={tdStyle}>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableWrapper = {
  marginTop: "1.5rem",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#ffffff",
};

const theadStyle = {
  background: "#f9fafb",
};

const thStyle = {
  padding: "14px 16px",
  textAlign: "left",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#374151",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "14px 16px",
  fontSize: "0.9rem",
  color: "#1f2937",
  borderBottom: "1px solid #f0f0f0",
};

const rowStyle = {
  transition: "background 0.2s ease",
};

export default SalesTable;
