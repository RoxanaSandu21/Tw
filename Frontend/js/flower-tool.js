
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

// var generateNumber = function(max) {
//     return Math.floor(Math.random() * max);
// }

// var generateCards = function(nrOfTimes) {
//     var temp = document.getElementById("card-template");
//     for(var i=0; i<nrOfTimes; i++) {
//         var clon = temp.content.cloneNode(true);

//         var randomBtn = generateNumber(4);
//         var statusBtn = clon.getElementById("statusBtn");

//         clon.getElementById("title").innerText = flowers[generateNumber(4)];

//         statusBtn.style.background = bgColors[randomBtn];
//         statusBtn.style.color = textColors[randomBtn];
//         statusBtn.innerText = statusNames[randomBtn];
//         statusBtn.style.boxShadow = shadows[randomBtn];
//         document.getElementById("informationWrapper").appendChild(clon);
//     }

//     if(nrOfTimes > 0) {
//         document.getElementById("searchInput").parentNode.style.display = '';
//     } 
//     document.getElementById("searchInput").addEventListener("change", filterSearch);
// }

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

// setTimeout(() => { generateCards(32); }, 10);

function checkValid(){
    const dropDownOption = document.getElementById("name");
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
}

const token = localStorage.getItem("token");

function parseJwt(token) {
    if (!token){ 
      return;
    }
    const base64 = token.split('.')[1]; // extracting payload
    return JSON.parse(window.atob(base64));
  }

  function getMonthIndex(month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.findIndex(m => m === month) + 1; // Adăugăm 1 pentru a obține indexul corect al lunii
  }

  document.addEventListener("DOMContentLoaded",async (event) => {
    event.preventDefault();
    var apiUrl = 'http://127.0.0.1:8080/api/flowersByEmail/{email}';
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
        data.forEach(json => {
            const cardContainer = document.getElementById('informationWrapper');
            const template = document.getElementById('card-template');
            const cardClone = template.content.cloneNode(true);
          
            const titleElement = cardClone.querySelector('.title h2');
            titleElement.textContent = json.name;
          
            const dateElement = cardClone.querySelector('.information p:first-child');
            dateElement.textContent = 'Date: ' + json.plantingDate;
          
            const soiElement = cardClone.querySelector('.information p:nth-child(2)');
            soiElement.textContent = 'Kind: ' + json.kind;
          
            const irigareElement = cardClone.querySelector('.information p:nth-child(3)');
            irigareElement.textContent = 'Humidity: Good';

            var statusBtn = cardClone.getElementById("statusBtn");
            statusBtn.textContent = json.status;
          
            const optionsButton = cardClone.querySelector('.options-button');
            optionsButton.addEventListener('click', function () {
              // Preia datele din boxul respectiv folosind indexul corespunzător
              const boxTitle = titleElement.textContent;
              const boxDate = dateElement.textContent;
              const boxKind = soiElement.textContent;
              const boxHumidity = 'Good';
          
              // Poți efectua acțiuni cu datele preluate, cum ar fi afișarea lor în consolă
              localStorage.setItem("name", boxTitle);
              localStorage.setItem("date", boxDate);
              localStorage.setItem("kind", boxKind);
              localStorage.setItem("humidity", boxHumidity);
              window.location.href = "flowerInfoActions.html";
            });
          
            cardContainer.appendChild(cardClone);
          });
          
  });

//   window.onload = function(){
//   Caman(img, function() {
//     console.log("Am intrat");
//   // Calculează culoarea predominantă
//   var pixeli = this.getImageData();
//   var pixeliData = pixeli.data;
//   var culoare = { R: 0, G: 0, B: 0 };
//   var numarPixeli = pixeliData.length / 4;


//   for (var i = 0; i < pixeliData.length; i += 4) {
//       culoare.R += pixeliData[i];
//       culoare.G += pixeliData[i + 1];
//       culoare.B += pixeliData[i + 2];
//   }

//   culoare.R = Math.round(culoare.R / numarPixeli);
//   culoare.G = Math.round(culoare.G / numarPixeli);
//   culoare.B = Math.round(culoare.B / numarPixeli);
  
//   console.log("Culoarea predominanta este: ");
//   console.log(culoare);
// });
//   }
const addFlowerForm = document.getElementById("addFlowerForm");

addFlowerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    var userEmail = parseJwt(token).sub.toLowerCase();
    console.log(userEmail);
        var url = 'http://127.0.0.1:8080/api/flowers';
        var kind = document.getElementById('kind');
        var name = document.getElementById('name');
        var formDate = document.getElementById('date');
        var dateVal = formDate.value;
        var date = new Date(dateVal);
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        var formattedDate = day + '-' + month + '-' + year;
        const flowerData = {
            "name" : (name.options[name.selectedIndex].text).toLowerCase(),
            "kind" : kind.value.toLowerCase(),
            "plantingDate" : formattedDate,
            "ownerEmail" : userEmail,
            "status" : ""
        }
        console.log(flowerData);
        var response = await fetch(url,{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(flowerData)
        });
        if(!response.ok){
            if(response.status === 401){
                console.log("Authorization refused!");
            }
            return;
        }
        setTimeout(function() {
            alert("Flower added succefully!");
            location.reload();
          }, 1000);    
})



function closeForm() {

    document.getElementById("overlay").style.display = 'none';
    document.getElementById("div-form").style.display = 'none';
}

var openForm = function () {
    document.getElementById("overlay").style.display = 'initial';
    document.getElementById("div-form").style.display = 'initial';
}

document.getElementById("login").onclick = () => {
    if(token === null){
        window.location.href = "index.html";
    } else{
        window.location.href = "profile.html";
    }
}


