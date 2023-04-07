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

// login
const loginEmailInput = document.querySelector('#emailLogin');
const loginPasswordInput = document.querySelector('#passwordLogin');
const emailError = document.querySelector('#emailErrorLogin');
const passwordError = document.querySelector('#passwordErrorLogin');
const loginBtn = document.querySelector('.buttonLogin');

loginBtn.addEventListener('click', function(event) {
  if (loginEmailInput.validity.valid && loginPasswordInput.validity.valid) {
    // Navigate to index.html if both fields are valid
    showPopup();
  } else {
    // Show error messages for any invalid fields
    showError(loginEmailInput, emailError, 'email');
    showError(loginPasswordInput, passwordError, 'password');
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

// register 
const form = document.getElementById('registerForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const registerEmailInput = document.getElementById('emailRegister');
  const registerPasswordInput = document.getElementById('passwordRegister');
    const registerTelInput = document.getElementById('tel');
    const registerDropdown = document.getElementById('dropdownRegister');

    let isValid = true;

    if (!registerEmailInput.checkValidity()) {
      document.getElementById('emailErrorRegister').textContent = registerEmailInput.validationMessage;
      isValid = false;
    } else if (!registerPasswordInput.checkValidity()) {
      document.getElementById('passwordErrorRegister').textContent = registerPasswordInput.validationMessage;
      isValid = false;
    } else if (!registerTelInput.checkValidity()) {
      document.getElementById('telErrorRegister').textContent = registerTelInput.validationMessage;
      isValid = false;
    } else if (registerDropdown.value === 'choose_option') {
      document.getElementById('dropdownErrorRegister').textContent = 'Please choose an option';
      isValid = false;
    }else{
      window.location.href = 'login.html';
    }
});
