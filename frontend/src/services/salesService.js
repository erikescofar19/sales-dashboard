const API_URL = "https://sales-dashboard-1jev.onrender.com";

export const getSales = async () => {
  const res = await fetch(`${API_URL}/sales/`);
  if (!res.ok) throw new Error("Error fetching sales");
  return res.json();
};

export const getSummary = async (startDate, endDate) => {
  let url = `${API_URL}/sales/summary`;
  const params = new URLSearchParams();

  if (startDate) params.append("start", startDate);
  if (endDate) params.append("end", endDate);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching summary data");
  return res.json();
};

export const createSale = async (payload) => {
  const res = await fetch(`${API_URL}/sales/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.detail
        ? JSON.stringify(errorData.detail)
        : "Error creating sale"
    );
  }

  return res.json();
};
