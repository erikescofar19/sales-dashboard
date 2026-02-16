import { useEffect, useState, useMemo } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const isFormValid = useMemo(() => {
    return name.trim() && category.trim() && price > 0;
  }, [name, category, price]);

  const fetchProductsData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setMessage({ type: "error", text: "Error cargando productos" });
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = {
      name: name.trim(),
      price: parseFloat(price),
      category: category.trim(),
    };

    try {
      setLoading(true);
      setMessage(null);

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      setMessage({
        type: "success",
        text: editingId
          ? "Producto actualizado"
          : "Producto agregado",
      });

      resetForm();
      await fetchProductsData();
    } catch {
      setMessage({ type: "error", text: "Error guardando producto" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      await fetchProductsData();
      setMessage({ type: "success", text: "Producto eliminado" });
    } catch {
      setMessage({ type: "error", text: "Error eliminando producto" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setEditingId(null);
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>

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

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={!isFormValid || loading}
          style={buttonStyle}
        >
          {loading
            ? "Guardando..."
            : editingId
            ? "Actualizar"
            : "Agregar"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: "0.5rem" }}
          >
            Cancelar
          </button>
        )}
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{p.name}</strong> ({p.category}) — $
            {p.price.toFixed(2)}

            <button
              onClick={() => {
                setName(p.name);
                setPrice(p.price);
                setCategory(p.category);
                setEditingId(p.id);
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              ✏️
            </button>

            <button
              onClick={() => handleDelete(p.id)}
              style={{ marginLeft: "0.5rem" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputStyle = {
  marginRight: "0.5rem",
  padding: "0.4rem",
};

const buttonStyle = {
  padding: "0.5rem 0.8rem",
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ProductManager;
