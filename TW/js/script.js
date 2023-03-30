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

function showPopup() {
    alert("You succefully signed in!");
    window.location.href = 'index.html';
  }

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const loginBtn = document.querySelector('.buttonLogin');
const registerBtn = document.querySelector('.buttonRegister')

loginBtn.addEventListener('click', function(event) {
  if (emailInput.validity.valid && passwordInput.validity.valid) {
    // Navigate to index.html if both fields are valid
    showPopup();
  } else {
    // Show error messages for any invalid fields
    showError(emailInput, emailError, 'email');
    showError(passwordInput, passwordError, 'password');
    // Prevent the form from being submitted
    event.preventDefault();
  }
});

function showError(input, error, inputName) {
  if (input.validity.valueMissing) {
    error.textContent = 'Please fill out this field.';
  } else if (input.validity.typeMismatch) {
    error.textContent = 'Please enter a valid email address.';
  } else if (input.validity.patternMismatch) {
    if (inputName === 'password') {
      error.textContent = 'Please enter a password with at least 8 characters.';
    }
  }
  error.className = 'error active';
}
