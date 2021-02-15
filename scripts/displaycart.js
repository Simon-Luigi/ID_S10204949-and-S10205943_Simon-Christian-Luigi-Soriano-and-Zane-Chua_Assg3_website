$(document).ready(function () {
  InitializeItems();
})

document.getElementById("Clear").addEventListener("click", function() {
  ClearCart();
  console.log("success");
});


function InitializeItems(){
  var subtotal = 0;
  var total_items = 0;
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var check = localStorage.key(i).includes("inventory");
    if (localStorage.key(i) !== "Tokens" && check == false){
      var item_name = key.name;
      var item_qty = key.qty;
      var price = key.price;
      var total_price = item_qty * key.price;
      total_items += item_qty;
      subtotal += total_price; 
      item = "<tr> + <td data-th = 'Product'> <div class = 'row'> <div class='col-md-6 text-left mt-sm-2'>" + `<h4>${item_name}</h4> </div> </div> </td> <td data-th = "Price">${price}</td> <td data-th = "Quantity">${item_qty}</td> <td data-th = "Total-Price">${total_price}</td> </tr>`;
      $(".chosenItems").append(item);
    }
  }
  document.getElementById("Pay").addEventListener("click", function() {
    if (subtotal == 0){
      alert("Error! No items in cart!")
    }
    else{
      var tokens = parseInt(localStorage.getItem("Tokens"));
      var earnedtokens  = Math.floor(subtotal);
      var totaltokens = earnedtokens + tokens;
      localStorage.setItem("Tokens", totaltokens);
      ClearCart();
      alert(`Successfully paid. Received ${earnedtokens} tokens. Total tokens = ${totaltokens}`);
    }
  });
  $("i").html(`${total_items}`)
  $(".total-price").html(`$${subtotal}`)
} 

function ClearCart(){
  for ( var i = 0, len = localStorage.length; i < len; ++i ){
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (key.isItem !== undefined){
      localStorage.removeItem(localStorage.key(i));
      window.location.reload();
    }
  }
}