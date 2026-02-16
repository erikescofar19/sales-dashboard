function ProductsList({ products }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Productos</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — {product.category} — $
            {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
