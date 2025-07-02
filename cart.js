// Load and render cart items
function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h3>${item.name}</h3>
        <p>
          Quantity:
          <button onclick="decreaseQuantity(${item.id})">−</button>
          ${item.quantity}
          <button onclick="increaseQuantity(${item.id})">+</button>
        </p>
        <p>Price: R${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div>
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
    totalPrice += item.price * item.quantity;
  });

  cartTotalElement.textContent = `Total: R${totalPrice.toFixed(2)}`;
  updateCartCount();
}

// Increase item quantity
function increaseQuantity(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

// Decrease item quantity or remove if zero
function decreaseQuantity(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

// Remove item from cart
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Proceed to checkout
function proceedToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message = "Order from Las'Dish Deluxe:\n";
  let totalItems = 0;
  cart.forEach(item => {
    message += `${item.name} x ${item.quantity}\n`;
    totalItems += item.quantity;
  });

  message += `\nTotal items: ${totalItems}`;
  const phone = prompt("Please enter your phone number for the order:");
  if (!phone) return;
  message += `\nPlease call me to finalise my order. My number is: ${phone}`;
  message += `\nPayment will be made upon collection or per arrangement.`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappNumber = "27725131675";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  const smsNumber = "27812629639";
  const smsURL = `sms:${smsNumber}?body=${encodedMsg}`;

  const confirmSend = confirm("Do you want to send your order via WhatsApp?");
  if (confirmSend) {
    window.open(whatsappURL, "_blank");
  } else {
    window.location.href = smsURL;
  }

  alert("Thank you! The order message has been prepared for sending.");

  localStorage.removeItem("cart");
  updateCartCount();
  loadCart();
}

// Update cart count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElements = document.querySelectorAll("#cart-count");
  cartCountElements.forEach(el => el.textContent = count);
}

// Include shared navbar into the current page
function includeNavbar() {
  fetch("/navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
      updateCartCount();
    });
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  includeNavbar();
  loadCart();
  updateCartCount();
});

// Sidebar toggle for mobile
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-show');
  hamburger.classList.toggle('hide');
});

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('sidebar-show');
    hamburger.classList.remove('hide');
  }
});
