// CART DATA
let cart = [];
let total = 0;

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("total").innerText = total;

  const li = document.createElement("li");
  li.innerText = ${name} - ₹${price};
  document.getElementById("cart-items").appendChild(li);
}

// TOGGLE CART VISIBILITY
function toggleCart() {
  document.getElementById("cart").classList.toggle("show");
}

// FILTER PRODUCTS BY CATEGORY
function filterProducts(category, btn) {
  document.querySelectorAll(".product").forEach(product => {
    product.style.display =
      category === "all" || product.classList.contains(category)
        ? "block"
        : "none";
  });

  document
    .querySelectorAll(".categories button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");
}

// CHECKOUT (CONNECTED TO BACKEND)
async function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  try {
    const response = await fetch(
      "https://zesty-nature.up.railway.app/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cart })
      }
    );

    const data = await response.json();

    alert(
      ${data.message}\nItems: ${data.items}\nTotal Amount: ₹${data.totalAmount}
    );

    // RESET AFTER SUCCESS
    cart = [];
    total = 0;
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-count").innerText = 0;
    document.getElementById("total").innerText = 0;

  } catch (error) {
    alert("Checkout failed. Backend not reachable.");
    console.error(error);
  }
}