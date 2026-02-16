function TopDayKpi({ byDay }) {
  if (!byDay || byDay.length === 0) return null;

  const topDay = byDay.reduce((max, current) =>
    current.total > max.total ? current : max
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem 1.5rem",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        marginBottom: "1.5rem",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>📅 Día con más ventas</h3>
      <p style={{ fontSize: "1.1rem", margin: 0 }}>
        {topDay.date} — <strong>${topDay.total}</strong>
      </p>
    </div>
  );
}

export default TopDayKpi;
