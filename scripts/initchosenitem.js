var chosenItem = window.location.search;
chosenItem = chosenItem.replace("?item=", '');
console.log(chosenItem);

const APIKEY = "600405bf1346a1524ff12b5e";

var GetItemData = {
  "async": true,
  "crossDomain": true,
  "url": `https://interactivedev-ec04.restdb.io/rest/${chosenItem}`,
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": APIKEY,
    "cache-control": "no-cache"
  }
}


$(document).ready(function () {
  $.ajax(GetItemData).done(function (response) {
    console.log(response);
    DisplayItem(response);
    document.getElementById("AddToCart").addEventListener("click", function() {
      if (localStorage.getItem(`${response._id}`) !== null){
        var oldItem = JSON.parse(localStorage.getItem(`${response._id}`));
        var oldQuantity = oldItem.qty;
        var newItems = {
        'id' : oldItem.id,
        'name': oldItem.name,
        'qty': oldQuantity + 1,
        'price': oldItem.price,
        'isItem' : "yes"
        }
        localStorage.setItem(`${response._id}`, JSON.stringify(newItems));
        console.log("Added 1 more of same item to cart");
      }
      else {
        var newItem = {
        'id' : response._id,
        'name': response.item_name,
        'qty': 1,
        'price': response.price,
        'isItem': "yes"
      }
      localStorage.setItem(`${response._id}`, JSON.stringify(newItem))
      console.log("Added item to cart");
      }
    });
  });
})

function DisplayItem(response) {
  var name = response.item_name;
  var desc = response.item_desc;
  var cat = response.category;
  var price = response.price;
  var image = "https://interactivedev-ec04.restdb.io/media/" + response.item_image[0];

  $(".itemName").html(name);
  $(".itemCat").html(cat);
  $(".itemPrice").html("$" + price);
  $(".itemDesc").html(desc);
  $(".itemImage").attr("src", `${image}`);
  $(".itemImage").attr("alt", `${name}`);
}
