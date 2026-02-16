function Loader({ message = "Cargando..." }) {
  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={spinner}></div>
        <h2 style={{ marginTop: "1rem" }}>{message}</h2>
      </div>
    </div>
  );
}

const wrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const card = {
  padding: "2rem",
  borderRadius: "12px",
  background: "#1f2937",
  color: "white",
  textAlign: "center",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #ccc",
  borderTop: "4px solid #6366f1",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

export default Loader;
