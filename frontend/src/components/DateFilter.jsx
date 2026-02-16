function DateFilter({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "1.5rem",
        alignItems: "center",
      }}
    >
      <div>
        <label>Desde:</label>
        <br />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label>Hasta:</label>
        <br />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
}

export default DateFilter;
