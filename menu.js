const foodItems = [
  { id: 1, name: "Platter for two", price: 100, image: "a.jpeg", desc: "Tender grilled chicken served with sides." },
  { id: 2, name: "Platter for one", price: 145, image: "b.jpeg", desc: "Fresh veggie wrap with hummus and sauce." },
  { id: 3, name: "Platter for 1 (Chicken)", price: 170, image: "c.jpeg", desc: "Juicy beef burger with cheese and chips." },
  { id: 4, name: "Platter", price: 165, image: "d.jpeg", desc: "Crispy battered fish with golden fries." },
  { id: 5, name: "Skopo", price: 95, image: "e.jpeg", desc: "Creamy pasta with grilled chicken and herbs." },
  { id: 6, name: "Lamb Chops Platter", price: 185, image: "f.jpeg", desc: "Juicy lamb chops grilled to perfection." },
  { id: 7, name: "Full Platter", price: 300, image: "g.jpeg", desc: "Hot and spicy chicken wings with dip." },
  { id: 8, name: "Platter for two", price: 150, image: "3.jpeg", desc: "Fluffy pancakes served with syrup and fresh berries." },
  { id: 9, name: "Platter for 3", price: 185, image: "h.jpeg", desc: "Crispy waffles topped with whipped cream and honey." },
  { id: 10, name: "Platter for 4", price: 245, image: "i.jpeg", desc: "Three-egg omelette with veggies and cheese." },
];

const menuContainer = document.getElementById("menu-items");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
  const sidebarCount = document.getElementById("cart-count-sidebar");
  if (sidebarCount) sidebarCount.textContent = count;
}

const searchBar = document.getElementById("searchBar");

function renderMenu(items) {
  menuContainer.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>R${item.price}</p>
    `;
    div.onclick = () => openModal(item);
    menuContainer.appendChild(div);
  });
}

renderMenu(foodItems);

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filtered = foodItems.filter(item =>
    item.name.toLowerCase().includes(query)
  );
  renderMenu(filtered);
});

let selectedItem;
let selectedQty = 1;

function openModal(item) {
  selectedItem = item;
  selectedQty = 1;
  document.getElementById("modal-img").src = item.image;
  document.getElementById("modal-name").textContent = item.name;
  document.getElementById("modal-desc").textContent = item.desc;
  document.getElementById("modal-price").textContent = item.price;
  document.getElementById("quantity").textContent = selectedQty;
  document.getElementById("food-modal").classList.remove("hidden");
}

document.querySelector(".close-btn").onclick = () => {
  document.getElementById("food-modal").classList.add("hidden");
};

document.getElementById("increase").onclick = () => {
  selectedQty++;
  document.getElementById("quantity").textContent = selectedQty;
};

document.getElementById("decrease").onclick = () => {
  if (selectedQty > 1) {
    selectedQty--;
    document.getElementById("quantity").textContent = selectedQty;
  }
};

document.getElementById("add-to-cart-modal").onclick = () => {
  const existing = cart.find(f => f.id === selectedItem.id);
  if (existing) {
    existing.quantity += selectedQty;
  } else {
    cart.push({ ...selectedItem, quantity: selectedQty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  document.getElementById("food-modal").classList.add("hidden");
  alert("Item added to cart.");
};

updateCartCount();

window.addEventListener("DOMContentLoaded", () => {
  const fadeElems = document.querySelectorAll(".fade-in-element");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElems.forEach(elem => observer.observe(elem));
});

// On load
const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-show');
    hamburger.classList.toggle('hide');
  });

  // Hide sidebar and show hamburger again when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('sidebar-show');
      hamburger.classList.remove('hide');
    }
  });
