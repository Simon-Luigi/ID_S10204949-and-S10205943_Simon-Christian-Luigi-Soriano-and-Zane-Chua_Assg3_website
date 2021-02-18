$(document).ready(function () {
  InitializeItems();
  InitializeVouchers();
  ClickToApply();
})

document.getElementById("Clear").addEventListener("click", function() {
  ClearCart();
});


function InitializeItems(){
  var subtotal = 0;
  var total_items = 0;
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var check = localStorage.key(i).includes("inventory");
    var check2 = localStorage.key(i).includes("Voucher");
    if (localStorage.key(i) !== "Tokens" && check == false && check2 == false){
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
      alert(`Successfully paid. Received ${earnedtokens} tokens. Total tokens = ${totaltokens}`);
      ClearCart();
    }
  });
  $("i").html(`${total_items}`)
  $(".total-price").html(`$${subtotal}`)
} 

function ClearCart(){
  for ( var i = 0; i < localStorage.length; ++i ){
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    console.log(localStorage.key(i));
    if (key.isItem !== undefined){
      localStorage.removeItem(localStorage.key(i));
    }
  }
  window.location.reload();
}


function InitializeVouchers(){
  var basicVoucher = parseInt(localStorage.getItem("VoucherBasic"));
  var premiumVoucher = parseInt(localStorage.getItem("VoucherPremium"));
  var superVoucher = parseInt(localStorage.getItem("VoucherSuper"));
  
  var voucherList = [["Basic", basicVoucher], ["Premium", premiumVoucher], ["Super", superVoucher]]
  for (var i = 0; i < voucherList.length; i++){
    if (voucherList[i][1] !== 0){
      voucherData = `<div><p>${voucherList[i][1]} ${voucherList[i][0]} Voucher(s)</p>` + `<label><input type = "checkbox" class = radio value = "${voucherList[i][0]}" name = "applyVoucher"/>Select to apply voucher</label></div>`
      $("#Voucher").append(voucherData);
    }
  }
}

function ClickToApply(){
  $("input:checkbox").on('click', function() {
  // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
      // the name of the box is retrieved using the .attr() method
      // as it is assumed and expected to be immutable
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      // the checked state of the group/box on the other hand will change
      // and the current value is retrieved using .prop() method
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
    });
  check = $("checkbox:checked").val()
  if (check !== undefined){
    check.addEventListener('change', function() {
    console.log(check);
  });
  } 
}