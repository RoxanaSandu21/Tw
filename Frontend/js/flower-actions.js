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
        window.location.href = "login.html";
    } else{
        window.location.href = "profile.html";
    }
}

function isLoggedIn() {
    let token = localStorage.getItem('token');

     if (token === null) {
         window.location.href = 'login.html'; 
         return;
     }
}

document.addEventListener("DOMContentLoaded", () => {
    var name = localStorage.getItem("name");
    var kind = localStorage.getItem("kind");
    var plantingDate = localStorage.getItem("date");
    var humidity = localStorage.getItem("humidity");

    var flowerName = document.getElementById("name");
    var flowerKind = document.getElementById("kind");
    var flowerDate = document.getElementById("date");
    var flowerHumidity = document.getElementById("humidity");

    flowerName.textContent += name;
    flowerKind.textContent += kind;
    flowerDate.textContent += plantingDate;
    flowerHumidity.textContent += humidity;
});