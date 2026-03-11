const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function getNetworkErrorMessage(actionText) {
  return `Cannot ${actionText}. Backend API is unreachable. Ensure backend is running on port 5000.`;
}

export async function getProducts() {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/products`);
  } catch (error) {
    throw new Error(getNetworkErrorMessage("fetch products"));
  }

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }
  return response.json();
}

export async function createProduct(product) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
  } catch (error) {
    throw new Error(getNetworkErrorMessage("add product"));
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Failed to add product." }));
    throw new Error(error.error || "Failed to add product.");
  }
  return response.json();
}

export async function deleteProduct(id) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE"
    });
  } catch (error) {
    throw new Error(getNetworkErrorMessage("delete product"));
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Failed to delete product." }));
    throw new Error(error.error || "Failed to delete product.");
  }
}
