// shopping-cart.js
// Comprehensive shopping cart functionality with improved error handling and user experience

// DOM Element Selectors
const cartButton = document.querySelector("#cart-btn");
const cartPopup = document.querySelector("#cart-popup");
const closeCartButton = document.querySelector("#close-cart-btn");
const continueShoppingButton = document.querySelector("#continue-shopping-btn");
const checkoutButton = document.querySelector("#checkout-btn");

// Cart State Elements
const emptyCart = document.querySelector("#empty-cart");
const filledCart = document.querySelector("#filled-cart");
const cartItemsList = document.getElementById("cart-items");
const totalPriceElement = document.querySelector(".total-price");

// Number Formatter for Price Display
const numberFormatter = new Intl.NumberFormat("de-DE");

// Cart Button Event Listeners
cartButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event propagation

  // Toggle cart popup visibility
  if (cartPopup.style.display === "flex") {
    cartPopup.style.display = "none";
  } else {
    fetchCartItems(); // Fetch and update cart items before displaying
    cartPopup.style.display = "flex";
  }
});

// Close Cart Button Event Listener
closeCartButton.addEventListener("click", function (event) {
  event.stopPropagation();
  cartPopup.style.display = "none";
});

// Continue Shopping Button Event Listener
continueShoppingButton.addEventListener("click", () => {
  cartPopup.style.display = "none";
});

// Checkout Button Event Listener
checkoutButton.addEventListener("click", () => {
  window.location.href = "/checkout";
});

/**
 * Update the cart items display in the UI
 * @param {Array} items - List of cart items to display
 */
function updateCartItems(items) {
  // Clear existing cart items
  cartItemsList.innerHTML = "";

  // Handle empty cart scenario
  if (items.length === 0) {
    filledCart.style.display = "none";
    emptyCart.style.display = "block";
    totalPriceElement.textContent = "0 ₫";
  } else {
    filledCart.style.display = "block";
    emptyCart.style.display = "none";

    // Render each cart item
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add("cart-item");
      
      li.innerHTML = `
        <div class="cart-item-details">
          <p class="cart-item-name">${item.productCartData.name}</p>
          <p class="cart-item-price">${numberFormatter.format(item.productCartData.price)}₫</p>
          <div class="cart-item-quantity">
            <span class="decrease-quantity" data-index="${index}">-</span>
            <span class="quantity">${item.quantity}</span>
            <span class="increase-quantity" data-index="${index}">+</span>
          </div>
        </div>
        <span class="remove-item-btn" data-index="${index}">X</span>
      `;
      
      cartItemsList.appendChild(li);
    });

    // Calculate and display total price
    const totalPrice = items.reduce(
      (acc, item) => acc + item.productCartData.price * item.quantity,
      0
    );
    totalPriceElement.textContent = `${numberFormatter.format(totalPrice)} ₫`;
  }

  // Add event listeners for quantity and removal buttons
  attachCartItemEventListeners();
}

/**
 * Attach event listeners to cart item buttons
 */
function attachCartItemEventListeners() {
  // Decrease quantity buttons
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      changeQuantity(index, -1);
    });
  });

  // Increase quantity buttons
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      changeQuantity(index, 1);
    });
  });

  // Remove item buttons
  document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      removeItem(index);
    });
  });
}

/**
 * Change quantity of a cart item
 * @param {number} index - Index of the cart item
 * @param {number} change - Amount to change quantity by (+1 or -1)
 */
async function changeQuantity(index, change) {
  try {
    // Fetch current user ID and cart items
    const userId = await fetchID();
    const cartItems = await fetchCurrentCartItems(userId);
    
    const currentItem = cartItems[index];
    if (!currentItem) {
      throw new Error("Cart item not found");
    }

    const currentQuantity = currentItem.quantity;
    const newQuantity = currentQuantity + change;

    // Validate quantity
    if (newQuantity < 1) {
      console.warn("Quantity must be at least 1");
      return;
    }
    console.log(currentItem.cart_item_id, userId,currentItem.pd_id, newQuantity);
    // Update cart item on server
    const response = await fetch("/api/update-cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart_item_id: currentItem.cart_item_id,
        user_id: userId,
        pd_id: currentItem.pd_id,
        quantity: newQuantity
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errCode === 0) {
      // Refresh cart items
      fetchCartItems();
    } else {
      throw new Error(result.errMessage || "Unknown error updating cart");
    }
  } catch (error) {
    console.error("Error changing cart item quantity:", error);
   
  }
}

/**
 * Remove an item from the cart
 * @param {number} index - Index of the cart item to remove
 */
async function removeItem(index) {
  try {
    
    const userId = await fetchID();
    const cartItems = await fetchCurrentCartItems(userId);
    
    const currentItem = cartItems[index];
    console.log(currentItem.pd_id, userId);
    const response = await fetch("/api/delete-cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        pd_id: currentItem.pd_id,
        user_id: userId 
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Delete cart response:", result);

    // After successful deletion, refetch cart items
    // This ensures we get the most up-to-date cart state
    await fetchCartItems();

   } catch (error) {
      console.error("Error removing cart item:", error);
      alert("Could not remove item from cart. Please try again.");
   }

}

/**
 * Fetch current user ID
 * @returns {Promise<string>} User ID
 */
async function fetchID() {
  try {
    const response = await fetch("/api/get-user-id");
    
    if (!response.ok) {
      throw new Error(`User ID fetch failed: ${response.status}`);
    }
    
    const user_id = await response.json();
    return user_id;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
}

/**
 * Fetch current cart items for a user
 * @param {string} userId - User ID to fetch cart for
 * @returns {Promise<Array>} Cart items
 */
async function fetchCurrentCartItems(userId) {
  try {
    const response = await fetch(`/api/get-cart-by-user-id?user_id=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Cart fetch failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
}

/**
 * Fetch and update cart items in the UI
 */
async function fetchCartItems() {
  try {
    const userId = await fetchID();
    const cartItems = await fetchCurrentCartItems(userId);
    updateCartItems(cartItems);
  } catch (error) {
    console.error("Error in cart initialization:", error);
    emptyCart.style.display = "block";
    filledCart.style.display = "none";
    
  }
}

// Close cart when clicking outside
document.addEventListener("click", (event) => {
  if (!cartPopup.contains(event.target) && event.target !== cartButton) {
    cartPopup.style.display = "none";
  }
});

// Initial cart load (optional, depending on your page load strategy)
document.addEventListener("DOMContentLoaded", fetchCartItems);