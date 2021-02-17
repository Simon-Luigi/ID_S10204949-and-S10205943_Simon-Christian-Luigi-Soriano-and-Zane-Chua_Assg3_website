var chosenShop = window.location.search;
chosenShop = chosenShop.replace("?shop=", ''); 
console.log(chosenShop);

const APIKEY = "600405bf1346a1524ff12b5e";
$(document).ready(function () {

  if (chosenShop == "uwuzon"){
    $(".shopname").attr("src", "./images/uwuzonname.png");
    GetUwuzonData();
  }
  else if (chosenShop == "abay"){
    $(".shopname").attr("src", "./images/abayname.png");
    GetAbayData();
  }
  else if (chosenShop == "ladzada"){
    $(".shopname").attr("src", "./images/ladzadaname.png");
    GetLadzadaData();
  }
  else if (chosenShop == "souppee"){
    $(".shopname").attr("src", "./images/souppeename.png");
    GetSouppeeData();
  }
})


function GetSouppeeData(){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://interactivedev-ec04.restdb.io/rest/souppee",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
  InitData(response);
});
}

function GetLadzadaData(){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://interactivedev-ec04.restdb.io/rest/ladzada",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
  InitData(response);
});
}

function GetUwuzonData(){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://interactivedev-ec04.restdb.io/rest/uwuzon",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
  InitData(response);
});
}

function GetAbayData(){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://interactivedev-ec04.restdb.io/rest/abay",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
  InitData(response);
});
}

function InitData(response){
  var categories = []; //get list of unique categories
  for (var i = 0; i < Object.keys(response).length - 1; i++){
    categories.push(response[i].category);
    var itemImage = "https://interactivedev-ec04.restdb.io/media/" + response[i].item_image[0];
    var itemId = response[i]._id;
     
    itemData = `<div><img class="itemimg" src = "${itemImage}" onclick = "location.href='./chosenitem.html?item=${chosenShop}/${itemId}'"></div>`;
    $(".itemcontainer").append(itemData);
    console.log(itemData);
  }
  var uniqueCategories = categories.filter((v, i, a) => a.indexOf(v) === i);
  console.log(uniqueCategories)

}

