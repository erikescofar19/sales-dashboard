const BASE_URL = "http://127.0.0.1:8000/products";

/**
 * Manejo centralizado de respuestas HTTP
 */
const handleResponse = async (res) => {
  let data = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw {
      message: data?.detail || "Error en la petición",
      status: res.status,
      isNetworkError: false,
    };
  }

  return data;
};

/**
 * Manejo centralizado de errores de red
 */
const handleNetworkError = (error, fallbackMessage) => {
  if (error?.status) {
    throw error; // error ya estructurado
  }

  throw {
    message: fallbackMessage,
    status: 500,
    isNetworkError: true,
  };
};

// ==============================
// GET PRODUCTS
// ==============================
export const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/`);
    return await handleResponse(res);
  } catch (error) {
    handleNetworkError(error, "No se pudieron obtener los productos");
  }
};

// ==============================
// CREATE PRODUCT
// ==============================
export const createProduct = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await handleResponse(res);
  } catch (error) {
    handleNetworkError(error, "No se pudo crear el producto");
  }
};

// ==============================
// UPDATE PRODUCT
// ==============================
export const updateProduct = async (id, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await handleResponse(res);
  } catch (error) {
    handleNetworkError(error, "No se pudo actualizar el producto");
  }
};

// ==============================
// DELETE PRODUCT
// ==============================
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    await handleResponse(res);
  } catch (error) {
    handleNetworkError(error, "No se pudo eliminar el producto");
  }
};
