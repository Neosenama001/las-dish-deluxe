const foodItems = [
  { id: 1, name: "Meat Platter", price: 185, image: "a.jpeg" },
  { id: 2, name: "Meat Platter", price: 170, image: "b.jpeg" },
  { id: 3, name: "Chicken Pizza", price: 110, image: "c.jpeg" },
  { id: 4, name: "Meat Platter", price: 185, image: "d.jpeg" },
  { id: 5, name: "Mogodu", price: 90, image: "e.jpeg" },
  { id: 6, name: "Platter", price: 110, image: "f.jpeg" },
  { id: 7, name: "Platter", price: 210, image: "g.jpeg" },
  { id: 8, name: "Platter", price: 185, image: "h.jpeg" },
  { id: 9, name: "Platter for 2", price: 170, image: "i.jpeg" },
  { id: 10, name: "Platter for 1", price: 110, image: "j.jpeg" },
  { id: 11, name: "Cow trotters", price: 80, image: "k.jpeg" },
  { id: 12, name: "Half plate (Mogodu)", price: 110, image: "l.jpeg" }
];

const foodList = document.getElementById("food-list");
foodList.innerHTML = "";

// Row containers
const row1 = document.createElement("div");
row1.className = "row row-1";

const row2 = document.createElement("div");
row2.className = "row row-2";

const row3 = document.createElement("div");
row3.className = "row row-3";

const row4 = document.createElement("div");
row4.className = "row row-4";

// Card builders
function createNormalCard(item) {
  const card = document.createElement("div");
  card.className = "food-card";
  card.innerHTML = `
    <div class="image-container">
      <img src="${item.image}" alt="${item.name}">
      <div class="overlay-text">
        <h3>${item.name}</h3>
        <p>R${item.price}</p>
        <button onclick="openModal(${item.id})">View</button>
      </div>
    </div>
  `;
  return card;
}

function createLargeImageCard(item) {
  const card = document.createElement("div");
  card.className = "food-card large-card";
  card.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
  return card;
}

// Build row 1
const verticalStack = document.createElement("div");
verticalStack.className = "vertical-stack";
verticalStack.appendChild(createNormalCard(foodItems[0]));
verticalStack.appendChild(createNormalCard(foodItems[1]));

row1.appendChild(verticalStack);
row1.appendChild(createLargeImageCard(foodItems[2]));

// Build row 2 (4 horizontal cards)
for (let i = 3; i <= 6; i++) {
  row2.appendChild(createNormalCard(foodItems[i]));
}

// Build row 3 (card left + heading/para right)
const row3Card = createNormalCard(foodItems[7]);
const textBlock = document.createElement("div");
textBlock.className = "info-text-block";
textBlock.innerHTML = `
<h2>Special of the Day</h2>
<p>
  Discover today's extraordinary culinary creation, hand-selected by our head chef and crafted with only the freshest, locally-sourced ingredients. This dish is more than just a meal—it's a story on a plate, inspired by tradition and enhanced with modern flair. 
  Slow-cooked to perfection and seasoned with a secret blend of spices, this one-of-a-kind offering is available for one day only. 
  Whether you're looking to satisfy your cravings or try something truly unforgettable, our Special of the Day promises to excite your taste buds and leave you wanting more.
  Experience a flavorful journey and indulge in a masterpiece that represents the heart of Las'Dish Deluxe's kitchen.
</p>

`;

row3.appendChild(row3Card);
row3.appendChild(textBlock);

// Build row 4 (remaining 4 cards)
for (let i = 8; i < foodItems.length; i++) {
  row4.appendChild(createNormalCard(foodItems[i]));
}

// Append all rows
foodList.appendChild(row1);
foodList.appendChild(row2);
foodList.appendChild(row3);
foodList.appendChild(row4);

// Modal functions
function openModal(id) {
  const item = foodItems.find(f => f.id === id);
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.innerHTML = `
    <div class="modal-content">
      <img src="${item.image}" alt="${item.name}" style="width: 100%; border-radius: 10px;">
      <h2>${item.name}</h2>
      <p>Price: R${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
      <button onclick="closeModal()">Close</button>
    </div>
  `;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function addToCart(id) {
  const food = foodItems.find(f => f.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...food, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Item added to cart.");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

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

  