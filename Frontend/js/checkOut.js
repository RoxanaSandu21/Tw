const countryInput = document.getElementById("country");
const cityInput = document.getElementById("city");
const addressInput = document.getElementById("address");
const nameInput = document.getElementById("name");
const cardInput = document.getElementById("card");
const ccvInput = document.getElementById("ccv");
const expirationInput = document.getElementById("start");
//const checkoutForm = document.getElementById("placeOrder");
const placeOrderButton = document.getElementById('placeOrder');

placeOrderButton.addEventListener('click', () => {
    //event.preventDefault();
console.log('eventListener');
    if(validateCheckout()) {
        console.log("Checkout form is valid");
        clearCart();
        window.location.href = 'done.html';
    }
});

function validateCheckout() {
    let valid = true;

    if(countryInput.value === "") {
        document.getElementById("countryError").textContent = "Invalid country";
        valid = false;
    } else {
        document.getElementById("countryError").textContent = "";
    }

    if(cityInput.value === "") {
        document.getElementById("cityError").textContent = "Invalid city";
        valid = false;
    } else {
        document.getElementById("cityError").textContent = "";
    }

    if(addressInput.value === "") {
        document.getElementById("addressError").textContent = "Invalid address";
        valid = false;
    } else {
        document.getElementById("addressError").textContent = "";
    }

    if(nameInput.value === "") {
        document.getElementById("nameError").textContent = "Invalid name";
        valid = false;
    } else {
        document.getElementById("nameError").textContent = "";
    }

    if(!validateCardNumber(cardInput.value)) {
        document.getElementById("cardError").textContent = "Invalid card number";
        valid = false;
    } else {
        document.getElementById("cardError").textContent = "";
    }

    if(!validateCardNumber(ccvInput.value)) {
        document.getElementById("ccvError").textContent = "Invalid CCV";
        valid = false;
    } else {
        document.getElementById("ccvError").textContent = "";
    }


    if(!validateExpirationDate()) {
        document.getElementById("expirationError").textContent = "Invalid expiration date";
        valid = false;
    } else {
        document.getElementById("expirationError").textContent = "";
    }

    return valid;
}


function validateCardNumber(cardNumber) {
    var cardNumberRegex = /^[0-9]{3,16}$/;
    return cardNumberRegex.test(cardNumber);
  }
  

function validateExpirationDate(){
    const date = new Date(expirationInput.value);
    const currentDate = new Date();
    if(date <= currentDate) return false;
    else return true;
}

function clearCart() {
    // Remove all items from the cart in local storage
    localStorage.removeItem('cartItems');
    
    // Clear the HTML content of the cart items container
    const cartItemsContainer = document.querySelector('.cart-items-container');
    //cartItemsContainer.innerHTML = '';
  
    // Recalculate and update the total price
    //calculateTotalPrice();
  }
  
