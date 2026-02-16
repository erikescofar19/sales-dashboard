import { useState, useMemo } from "react";
import { createSale } from "../services/salesService";

function SalesManager({ products, onSaleCreated }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const isFormValid = useMemo(() => {
    return productId && quantity > 0 && date;
  }, [productId, quantity, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const selectedProduct = products.find(
      (p) => p.id === parseInt(productId)
    );

    if (!selectedProduct) {
      setMessage({ type: "error", text: "Producto inválido" });
      return;
    }

    const total = selectedProduct.price * parseInt(quantity);

    try {
      setLoading(true);
      setMessage(null);

      await createSale({
        product_id: parseInt(productId),
        quantity: parseInt(quantity),
        total: parseFloat(total),
        date,
      });

      setMessage({ type: "success", text: "Venta registrada correctamente" });

      setProductId("");
      setQuantity("");
      setDate(new Date().toISOString().split("T")[0]);

      onSaleCreated();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem" }}>Registrar Venta</h2>

      {message && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.7rem",
            borderRadius: "6px",
            backgroundColor:
              message.type === "success" ? "#d1fae5" : "#fee2e2",
            color: message.type === "success" ? "#065f46" : "#991b1b",
            fontSize: "0.9rem",
          }}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={inputStyle}
        >
          <option value="">Selecciona producto</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (${p.price})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={!isFormValid || loading}
          style={{
            ...buttonStyle,
            opacity: !isFormValid || loading ? 0.6 : 1,
          }}
        >
          {loading ? "Registrando..." : "Registrar Venta"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "0.6rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

const buttonStyle = {
  padding: "0.7rem",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#111827",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
};

export default SalesManager;
