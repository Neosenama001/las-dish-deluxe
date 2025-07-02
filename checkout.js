const cart = JSON.parse(localStorage.getItem("cart")) || [];
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const checkoutTotal = document.getElementById("checkoutTotal");

// Redirect to login if not logged in
if (!user) {
  alert("Please login first.");
  window.location.href = "login.html";
}

let total = 0;
cart.forEach(item => {
  total += item.price * item.quantity;
});
checkoutTotal.textContent = `R${total}`;

document.getElementById("checkoutForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;

  const response = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      items: cart,
      total,
      deliveryOption
    })
  });

  const data = await response.json();
  if (response.ok) {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  } else {
    alert(data.error || "Failed to place order.");
  }
});
