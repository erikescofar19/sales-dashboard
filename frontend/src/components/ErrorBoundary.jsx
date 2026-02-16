import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error capturado:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={wrapper}>
          <div style={card}>
            <h2>⚠️ Algo salió mal</h2>
            <p>Ocurrió un error inesperado.</p>
            <button onClick={this.handleReload}>Recargar aplicación</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
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

export default ErrorBoundary;
