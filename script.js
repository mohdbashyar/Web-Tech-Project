// Fetch JSON data and render products
async function loadProducts() {
  try {
      const response = await fetch("products.json"); // Fetch the JSON file
      if (!response.ok) {
          throw new Error("Failed to fetch product data");
      }
      const products = await response.json(); // Parse the JSON data
      renderProducts(products);
  } catch (error) {
      console.error(error);
      document.getElementById("product-list").innerHTML =
          "<p>Failed to load products. Please try again later.</p>";
  }
}

// Render products to the DOM
function renderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="product-price">RM${product.price.toFixed(2)}</div>
              <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `;

      productList.appendChild(productCard);
  });
}

// Add to cart functionality
function addToCart(productId) {
  alert(`Product ID ${productId} has been added to your cart!`);
}

// Filter products by category
function filterCategory(category) {
  const filteredProducts = category === "all"
      ? products
      : products.filter(product => product.category === category);

  renderProducts(filteredProducts);
}

// Load products on page load
let products = [];
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("products.json");
  products = await response.json();
  renderProducts(products);
});
