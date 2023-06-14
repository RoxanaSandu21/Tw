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

document.getElementById("logoutButton").onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

const token = localStorage.getItem("token");

function parseJwt(token) {
    if (!token){ 
      return;
    }
    console.log(token);
    const base64 = token.split('.')[1]; // extracting payload
    return JSON.parse(window.atob(base64));
  }

var hashedPass = 0;
var role = 0;

document.addEventListener("DOMContentLoaded",async (event) => {
    event.preventDefault();
    var apiUrl = 'http://127.0.0.1:8080/api/users/{email}';
    var userEmail = parseJwt(token).sub.toLowerCase();
    var url = apiUrl.replace("{email}", userEmail);
    var response = await fetch(url,{
            method : 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        });
        if(!response.ok){
            if(response.status === 401){
                console.log("Authorization refused!");
                window.location.href = "index.html";
            }
            return;
        }
        var data = await response.json();
        console.log(data);
        hashedPass = data.passwordHash;
        var email = data.email;
        var name = data.name;
        var city = data.city;
        role = data.role;
        var phoneNumber = data.phoneNumber;
        document.getElementsByName('fullName')[0].value = name;
        document.getElementsByName('email')[0].textContent += email;
        document.getElementsByName('city')[0].value = city;
        document.getElementsByName('phoneNumber')[0].value = phoneNumber;
        document.getElementsByName('accountPurpose')[0].textContent += role;
  });

const editButton = document.getElementById('editButton')
editButton.addEventListener("click", async (event) => {
        event.preventDefault();
        var url = 'http://127.0.0.1:8080/api/users';
        const toChangeData = {
            "email" : document.getElementsByName('email')[0].value,
            "name" : document.getElementsByName('fullName')[0].value,
            "passwordHash" : hashedPass,
            "city" : document.getElementsByName('city')[0].value,
            "phoneNumber" : document.getElementsByName('phoneNumber')[0].value,
            "role" : role
        }
        const response = fetch(url,{
            method : 'PUT',
            headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(toChangeData)
        });
        setTimeout(function() {
            alert("You succefully modified your profile!");
            location.reload();  // Refresh la pagina după 1 secunda
          }, 1000);          
        if(!response.ok){
            if(response.status === 401){
                console.log("Authorization refused!");
            }
            return;
        }
    })


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