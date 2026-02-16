function SalesList({ sales }) {
  return (
    <div>
      <h2>Listado de ventas</h2>

      <ul>
        {sales.map(sale => (
          <li key={sale.id}>
            Producto {sale.product_id} — ${sale.total} — {sale.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesList;
