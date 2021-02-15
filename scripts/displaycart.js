$(document).ready(function () {
  InitializeItems();
})

document.getElementById("Clear").addEventListener("click", function() {
  var tokens = localStorage.getItem("Tokens");
  localStorage.clear();
  localStorage.setItem("Tokens", tokens)
  window.location.reload();
  console.log("success");
});


function InitializeItems(){
  var subtotal = 0;
  var total_items = 0;
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (localStorage.key(i) !== "Tokens"){
      var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
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
      localStorage.clear();
      var earnedtokens  = Math.floor(subtotal);
      var totaltokens = earnedtokens + tokens;
      localStorage.setItem("Tokens", totaltokens);
      window.location.reload();
      alert(`Successfully paid. Received ${earnedtokens} tokens. Total tokens = ${totaltokens}`);
    }
  });
  $("i").html(`${total_items}`)
  $(".total-price").html(`$${subtotal}`)
  console.log("Success total")
}