let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("total").innerText = total;

  const li = document.createElement("li");
  li.innerText = `${name} - ₹${price}`;
  document.getElementById("cart-items").appendChild(li);
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("show");
}

function filterProducts(category, btn) {
  document.querySelectorAll(".product").forEach(p => {
    p.style.display =
      category === "all" || p.classList.contains(category)
        ? "block"
        : "none";
  });

  document.querySelectorAll(".categories button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  alert(`Order Placed Successfully!\nTotal Amount: ₹${total}`);
  location.reload();
}
