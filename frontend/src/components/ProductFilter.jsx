function ProductFilter({ products, selectedProduct, onChange }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        style={{
          marginRight: "1rem",
          fontWeight: "600",
          fontSize: "0.9rem",
        }}
      >
        Filtrar por producto:
      </label>

      <select
        value={selectedProduct}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        <option value="all">Todos</option>

        {products.map((productId) => (
          <option key={productId} value={productId}>
            Producto {productId}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilter;
