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


function validateLogin(){
    const emailInput = document.getElementById("emailLogin");
    const passwordInput = document.getElementById("passwordLogin");
    let valid = true;

    if(!validateEmail(emailInput.value)){
        document.getElementById("emailErrorLogin").textContent = "Invalid email address"
        valid = false;
    } else{
        document.getElementById("emailErrorLogin").textContent = "";
    }

    if(!validatePassword(passwordInput.value)){
        document.getElementById("passwordErrorLogin").textContent = "Password must be at least 8 characters"
        valid = false;
    } else {
        document.getElementById("passwordErrorLogin").textContent = "";
    }

    return valid;

}

function validateEmail(email){
    var emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(email);
}

function validatePassword(password){
    return password.length >= 8;
}