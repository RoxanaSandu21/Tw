let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.getElementById("login").onclick = () => {
    if(localStorage.getItem("token") === null){
        window.location.href = "index.html";
    } else{
        window.location.href = "profile.html";
    }
}

function isLoggedIn() {
    let token = localStorage.getItem('token');

     if (token === null) {
         window.location.href = 'index.html'; 
         return;
     }
}

isLoggedIn();


 const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Loop through cart items and display them
cartItems.forEach(item => {
  const newCartItem = document.createElement('div');
  newCartItem.className = 'cart-item';
  newCartItem.innerHTML = `
    <span class="fas fa-times"></span>
    <img src="images/product-3.jpg" alt="">
    <div class="content">
      <h3>${item.name}</h3>
      <div class="price">${item.price}</div>
    </div>
  `;

  // Append the new cart item to the cart items container
  const cartItemsContainer = document.querySelector('.cart-items-container');
  cartItemsContainer.insertBefore(newCartItem, cartItemsContainer.lastElementChild);
});

calculateTotalPrice();
 
// Function to remove an item from the shopping cart
function removeFromCart(productName) {
    // Get the existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Find the index of the item to be removed
    const itemIndex = cartItems.findIndex(item => item.name === productName);
  console.log(itemIndex);
    // If the item is found, remove it from the cartItems array
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
  
      // Update the cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
      // Remove the corresponding cart item element from the DOM
      const cartItemElement = document.querySelector(`[data-name="${productName}"]`);
      if (cartItemElement) {
        cartItemElement.remove();
        calculateTotalPrice();
      }
    }
  }
  
  // Attach click event listener to cart item icons
  const cartItemRemove = document.querySelectorAll('.fas.fa-times');
  
  cartItemRemove.forEach(icon => {
    icon.addEventListener('click', () => {
        console.log('remove event listener');
      const cartItem = icon.parentElement;
      const productName = cartItem.querySelector('h3').innerText;
  
      removeFromCart(productName);
      
    });
  });

  function calculateTotalPrice() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;
  
    cartItems.forEach(item => {
      totalPrice += parseFloat(item.price);
    });
  
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerHTML = 'Total: ' + totalPrice + ' RON';
  }