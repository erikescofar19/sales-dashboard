import { useState } from "react";

function KPICard({ title, value }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...cardStyle,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? "0 12px 28px rgba(0,0,0,0.12)"
          : "0 6px 18px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h4 style={titleStyle}>{title}</h4>
      <p style={valueStyle}>{value}</p>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "1.8rem",
  borderRadius: "18px",
  minWidth: "220px",
  transition: "all 0.25s ease",
  cursor: "default",
};

const titleStyle = {
  margin: 0,
  fontSize: "0.8rem",
  color: "#6b7280",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const valueStyle = {
  margin: "0.8rem 0 0",
  fontSize: "2.2rem",
  fontWeight: "800",
  color: "#111827",
};

export default KPICard;
