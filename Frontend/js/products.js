 sessionStorage.removeItem("id-prod");

 let items = document.getElementsByClassName("box-container")[0];


 async function loadItems() {
     let token = localStorage.getItem('token');

     if (token === null) {
         window.location.href = 'index.html'; 
        return;
     }


    
     const response2 = await fetch(`http://127.0.0.1:8080/api/flowers/listed`, {
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
         }
     });

     if (!response2.ok) {
         console.log('An error occurred:', response2.statusText);
         return;
     }

     const data = await response2.json();
     console.log(data);

     data.map((product) => {
        //if(product.status == "LISTED") 
        createItem(product);
         console.log(product);
     })

 }



 function createItem(product) {
     let id = product.id;
     //product = product.productData;
     let item = document.createElement("div");
     let icons = document.createElement("div");
     let icon1 = document.createElement("a");
     let icon2 = document.createElement("a");
     let imageBox = document.createElement("div");
     let image = document.createElement("img");
     let content = document.createElement("div");
     let name = document.createElement("h3");
     let price = document.createElement("div");
     let former = document.createElement("span");
     item.classList.add("box");
     icons.classList.add("icons");
     icon1.classList.add("fas");
     icon1.classList.add("fa-shopping-cart");
     //icon1.href = "#";
     icon2.classList.add("fas");
     icon2.classList.add("fa-eye");
     icon2.setAttribute('data-id', id);
     console.log(id);
     icons.appendChild(icon1);
     icons.appendChild(icon2);
     imageBox.classList.add("image");
     image.src = "images/about-img.jpg";
     imageBox.appendChild(image);
     content.classList.add("content");
     name.innerHTML = product.name + ' ' + product.kind;
     price.classList.add("price");
     price.innerHTML = product.price + ' RON';
     price.appendChild(former);
     content.appendChild(name);
     content.appendChild(price);
     item.appendChild(icons);
     item.appendChild(imageBox);
     item.appendChild(content);
     items.appendChild(item);
     
     icon1.addEventListener('click', () => {
        // Get the parent element of the icon (the cart item)
        const cartItem = icon1.parentElement.parentElement;
        // Get the product name and price from the cart item
        const productName = cartItem.querySelector('h3').innerText;
        console.log(productName);
        const productPrice = cartItem.querySelector('.price').innerText;

        
        addToCart(productName, productPrice);
      });
    
     
 }



loadItems();


function addToCart(productName, productPrice) {
  // Get the existing cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Create a new cart item object
  const newCartItem = {
    name: productName,
    price: productPrice
  };

  // Add the new cart item to the cartItems array
  cartItems.push(newCartItem);

  // Update the cart items in localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  calculateTotalPrice();
  refreshCart();
  
}

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
      refreshCart();
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


  function refreshCart() {
    const cartItemsContainer = document.querySelector('.cart-items-container');
  
    // Clear the existing cart items
    //cartItemsContainer.innerHTML = '';
    cartItemsContainer.innerHTML = `<div id="totalPrice"></div>
      <a href="checkOut.html" class="btn">Checkout now</a>`;
  
    // Get the cart items from local storage
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
      cartItemsContainer.insertBefore(newCartItem, cartItemsContainer.lastElementChild);
    });
  
    
    calculateTotalPrice();
    // Attach click event listener to cart item icons
    const cartItemRemove = document.querySelectorAll('.fas.fa-times');
    cartItemRemove.forEach(icon => {
      icon.addEventListener('click', () => {
        const cartItem = icon.parentElement;
        const productName = cartItem.querySelector('h3').innerText;
        
        removeFromCart(productName);
        refreshCart(); // Refresh the cart after removing an item
      });
    });
  }
  
  // Call refreshCart when the page loads
  //window.addEventListener('load', refreshCart);
  

//base js

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

//

// search filter
document.getElementById("search-box").addEventListener("change", filterSearch);
function filterSearch(ev) {
    var value = ev.target.value;
    var cards = document.getElementsByClassName("flower");

    for(var i=0; i<cards.length; i++) {
        var card = cards[i];

        if(card.id.toUpperCase() === "add-card".toUpperCase()) {
            continue;
        }
        
        if(card.innerHTML.toUpperCase().includes(value.toUpperCase())) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    }
}