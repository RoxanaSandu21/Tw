
var statusNames = ["READY TO PLANT", "READY TO HARVEST", "HARVESTED", "NEEDS ATTENTION"];
var bgColors = ["#fcf4a3", "#c2fbd7", "#f2f2f2", "#8b0000"];
var textColors = ["#b5a505", "green", "#7d7d7d", "#FFA8A8"];

var flowers = ["Lalele", "Garoafe", "Zambile", "Clorofile"];

var shadows = [
    "rgba(181, 165, 5, .2) 0 -25px 18px -14px inset,rgba(181, 165, 5, .15) 0 1px 2px,rgba(181, 165, 5, .15) 0 2px 4px,rgba(181, 165, 5, .15) 0 4px 8px,rgba(181, 165, 5, .15) 0 8px 16px,rgba(181, 165, 5, .15) 0 16px 32px",
    "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px",
    "rgba(125, 125, 125, .2) 0 -25px 18px -14px inset,rgba(125, 125, 125, .15) 0 1px 2px,rgba(125, 125, 125, .15) 0 2px 4px,rgba(125, 125, 125, .15) 0 4px 8px,rgba(125, 125, 125, .15) 0 8px 16px,rgba(125, 125, 125, .15) 0 16px 32px",
    "rgba(255, 168, 168, .2) 0 -25px 18px -14px inset,rgba(255, 168, 168, .15) 0 1px 2px,rgba(255, 168, 168, .15) 0 2px 4px,rgba(255, 168, 168, .15) 0 4px 8px,rgba(255, 168, 168, .15) 0 8px 16px,rgba(255, 168, 168, .15) 0 16px 32px"
];

var generateNumber = function(max) {
    return Math.floor(Math.random() * max);
}

var generateCards = function(nrOfTimes) {
    var temp = document.getElementById("card-template");
    for(var i=0; i<nrOfTimes; i++) {
        var clon = temp.content.cloneNode(true);

        var randomBtn = generateNumber(4);
        var statusBtn = clon.getElementById("statusBtn");

        clon.getElementById("title").innerText = flowers[generateNumber(4)];

        statusBtn.style.background = bgColors[randomBtn];
        statusBtn.style.color = textColors[randomBtn];
        statusBtn.innerText = statusNames[randomBtn];
        statusBtn.style.boxShadow = shadows[randomBtn];
        document.getElementById("informationWrapper").appendChild(clon);
    }

    if(nrOfTimes > 0) {
        document.getElementById("searchInput").parentNode.style.display = '';
    } 
    document.getElementById("searchInput").addEventListener("change", filterSearch);
}

var filterSearch = function(ev) {
    var value = ev.target.value;
    var cards = document.getElementsByClassName("card");

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

setTimeout(() => { generateCards(32); }, 10);

function checkValid(){
    const dropDownOption = document.getElementById("dropDownFlower");
    const kind = document.getElementById("kind");
    const date = document.getElementById("date");
    let valid = true;
    if(dropDownOption.value == "choose_option"){
        document.getElementById("dropDownErrorFlower").textContent = ("Please choose an option");
        valid = false;
    }
    else{
        document.getElementById("dropDownErrorFlower").textContent = ("");
    }
    if(kind.value == null || kind.value == ""){
        document.getElementById("kindError").textContent = ("Please enter a name of a kind");
        valid = false;
    }
    else{
        document.getElementById("kindError").textContent = ("");
    }
    if(isNaN(Date.parse(date.value))){
        document.getElementById("dateError").textContent = ("Please select a valid date");
        valid = false;
    }
    else{
        document.getElementById("dateError").textContent = ("");
    }
    if(valid){
        closeForm();
    }
}


var closeForm = function () {
    document.getElementById("overlay").style.display = 'none';
    document.getElementById("div-form").style.display = 'none';
}

var openForm = function () {
    document.getElementById("overlay").style.display = 'initial';
    document.getElementById("div-form").style.display = 'initial';
}