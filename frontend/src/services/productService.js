const API_URL = "https://sales-dashboard-1jev.onrender.com";

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products/`);
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
};

export const createProduct = async (payload) => {
  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creating product");
  return res.json();
};

export const updateProduct = async (id, payload) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error updating product");
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting product");
};
