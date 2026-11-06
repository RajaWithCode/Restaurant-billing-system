const foodItems = document.getElementById("foodItems");
const cartItemsContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const gstElement = document.getElementById("gst");
const grandTotalElement = document.getElementById("grandTotal");
const discountInput = document.getElementById("discountInput");
const discountElement = document.getElementById("discount");
const clearCartBtn = document.getElementById("clearCart");
const searchValue = document.getElementById("search-value");
const categoryButtons = document.querySelectorAll(".categories button");

const foodItemsArr = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 199,
    category: "Pizza",
    image: "./assets/images/pizza.png",
  },
  {
    id: 2,
    name: "Burger",
    price: 149,
    category: "Burger",
    image: "./assets/images/burger.png",
  },
  {
    id: 3,
    name: "Cold Drink",
    price: 99,
    category: "Drink",
    image: "./assets/images/Drink.png",
  },
  {
    id: 4,
    name: "French fraie",
    price: 89,
    category: "French",
    image: "./assets/images/French.jpg",
  },
  {
    id: 5,
    name: "Pasta",
    price: 179,
    category: "Pasta",
    image: "./assets/images/Pasta.png",
  },
  {
    id: 6,
    name: "Sandwich",
    price: 49,
    category: "Sandwich",
    image: "./assets/images/Sandwich.png",
  },
];
let cartItems = [];

searchValue.addEventListener("input", () => {
  const searchText = searchValue.value.toLowerCase();
  const filteredFoods = foodItemsArr.filter((item) => {
    return item.name.toLowerCase().includes(searchText);
  });

  renderFoodItems(filteredFoods);
});

function renderFoodItems(foods) {
  foodItems.innerHTML = "";
  foods.forEach((items) => {
    const card = `
      <div class="food-card">
        <img src="${items.image}" />
        <h3>${items.name}</h3>
        <p>₹${items.price}</p>
        <button data-id="${items.id}">Add to Cart</button>
      </div>
    `;

    foodItems.innerHTML += card;
  });
}
renderFoodItems(foodItemsArr);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    let filteredFoods;

    if (selectedCategory === "All") {
      filteredFoods = foodItemsArr;
    } else {
      filteredFoods = foodItemsArr.filter((item) => {
        return item.category === selectedCategory;
      });
    }

    renderFoodItems(filteredFoods);

    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});

function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML =
      "<p class='empty-cart'>No items added yet.</p>";
  }

  cartItems.forEach((items) => {
    const cartItem = `
              <div class="cart-item">
                <h4>${items.name}</h4>
                <p>${items.price}</p>
                <div class="quantity-controls">
                  <button data-id="${items.id}" data-action="decrease">-</button>

                  <span>${items.quantity}</span>

                  <button data-id="${items.id}" data-action="increase">+</button>
                </div>

                <p>Total: ₹${items.price * items.quantity}</p>
              </div>
          `;

    cartItemsContainer.innerHTML += cartItem;
  });

  const subtotal = cartItems.reduce((total, items) => {
    return total + items.price * items.quantity;
  }, 0);
  subtotalElement.textContent = `₹${subtotal}`;

  const gst = (subtotal * 5) / 100;
  gstElement.textContent = `₹${gst.toFixed(2)}`;

  const discount = Number(discountInput.value) || 0;
  const finalDiscount = Math.min(discount, subtotal + gst);
  discountElement.textContent = `₹${finalDiscount.toFixed(2)}`;

  const grandTotal = subtotal + gst - finalDiscount;
  grandTotalElement.textContent = `₹${grandTotal.toFixed(2)}`;
}

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const itemId = Number(button.dataset.id);
  const action = button.dataset.action;

  const selectedItem = cartItems.find((items) => {
    return items.id === itemId;
  });
  if (action === "increase") {
    selectedItem.quantity += 1;
  } else if (action === "decrease") {
    selectedItem.quantity -= 1;

    if (selectedItem.quantity === 0) {
      cartItems = cartItems.filter((items) => {
        return items.id !== selectedItem.id;
      });
    }
  }

  renderCart();
});

foodItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const foodId = Number(button.dataset.id);

  const selectedFood = foodItemsArr.find((items) => {
    return items.id === foodId;
  });
  if (!selectedFood) {
    return;
  }

  const existingItem = cartItems.find((items) => {
    return items.id === selectedFood.id;
  });
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      ...selectedFood,
      quantity: 1,
    });
  }

  renderCart();
});

discountInput.addEventListener("input", () => {
  renderCart();
});

clearCartBtn.addEventListener("click", () => {
  cartItems = [];
  discountInput.value = "";
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  renderCart();
});
