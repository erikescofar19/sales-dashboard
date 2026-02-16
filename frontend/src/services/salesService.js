const BASE_URL = "http://127.0.0.1:8000/sales";

/**
 * Manejo centralizado de respuestas HTTP
 */
const handleResponse = async (res) => {
  let data = null;

  try {
    data = await res.json();
  } catch {
    // Si no viene JSON válido
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
    // Error controlado desde handleResponse
    throw error;
  }

  // Error de red (backend apagado, CORS, etc.)
  throw {
    message: fallbackMessage,
    status: 500,
    isNetworkError: true,
  };
};

// ==============================
// GET SALES
// ==============================
export const getSales = async () => {
  try {
    const res = await fetch(`${BASE_URL}/`);
    return await handleResponse(res);
  } catch (error) {
    handleNetworkError(error, "No se pudieron obtener las ventas");
  }
};

// ==============================
// GET SUMMARY
// ==============================
export const getSummary = async (startDate, endDate) => {
  let url = `${BASE_URL}/summary`;
  const params = new URLSearchParams();

  if (startDate) params.append("start", startDate);
  if (endDate) params.append("end", endDate);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  try {
    const res = await fetch(url);
    return await handleResponse(res);
  } catch (error) {
    handleNetworkError(error, "No se pudo obtener el resumen");
  }
};

// ==============================
// CREATE SALE
// ==============================
export const createSale = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await handleResponse(res);
  } catch (error) {
    handleNetworkError(error, "No se pudo crear la venta");
  }
};
