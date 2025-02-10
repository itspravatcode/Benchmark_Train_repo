async function fetchProducts() {
    try {
      const response = await fetch(API_URL);
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  