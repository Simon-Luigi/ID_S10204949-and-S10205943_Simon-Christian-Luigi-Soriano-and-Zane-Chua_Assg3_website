$(document).ready(function () {
  InitializeItems();
  InitializeVouchers();
  DisplayPaymentInfo();
})

document.getElementById("Clear").addEventListener("click", function() {
  ClearCart();
});


function InitializeItems(){
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var check = localStorage.key(i).includes("inventory");
    var check2 = localStorage.key(i).includes("Voucher");
    if (localStorage.key(i) !== "Tokens" && check == false && check2 == false){
      var item_name = key.name;
      var item_qty = key.qty;
      var price = key.price;
      var total_price = item_qty * key.price;
      item = "<tr> + <td data-th = 'Product'> <div class = 'row'> <div class='col-md-6 text-left mt-sm-2'>" + `<h4>${item_name}</h4> </div> </div> </td> <td data-th = "Price">${price}</td> <td data-th = "Quantity">${item_qty}</td> <td data-th = "Total-Price">${total_price}</td> </tr>`;
      $(".chosenItems").append(item);
    }
  }
} 

function DisplayPaymentInfo(){
  var subtotal = 0;
  var total_items = 0;
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var check = localStorage.key(i).includes("inventory");
    var check2 = localStorage.key(i).includes("Voucher");
    if (localStorage.key(i) !== "Tokens" && check == false && check2 == false){
      var item_qty = key.qty;
      var price = key.price;
      var total_price = item_qty * key.price;
      total_items += item_qty;
      subtotal += total_price;
    }
  }
  $("i").html(`${total_items}`)
  $(".total-price").html(`$${subtotal}`)
  $(".subtotalText").html("Subtotal:")
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
      voucherData = `<div style="color: rgb(234, 67, 67);">${voucherList[i][1]} ${voucherList[i][0]} Voucher(s)` + `<div><label style="color: white;"><input type = "checkbox" class = "applyVoucher" value = "${voucherList[i][0]}" name = "applyVoucher" onclick = "ChangeValues()"/> Select to apply voucher</label></div></div><br></br>`
      $("#Voucher").append(voucherData);
    }
  }
}

function ChangeValues(){
  $('input:checkbox').on('change', function() {
    $('input:checkbox').not(this).prop('checked', false); 
    var checkedValue = $('.applyVoucher:checked').val();
    if (checkedValue !== undefined){
      DisplayDiscountedPaymentInfo(checkedValue)
    }
    else{
      DisplayPaymentInfo();
    }
});
  /*// $("input:checkbox").on('click', function() {
  //   var $box = $(this);
  //   if ($box.is(":checked")) {
  //     var group = "input:checkbox[name='" + $box.attr("name") + "']";
  //     $(group).prop("checked", false);
  //     $box.prop("checked", false);
  //   } else {
  //     $box.prop("checked", false);
  //   }
  //   });*/
}

function DisplayDiscountedPaymentInfo(checkedValue){
  var discount = checkedValue;
  var subtotal = 0;
  var total_items = 0;
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var key = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var check = localStorage.key(i).includes("inventory");
    var check2 = localStorage.key(i).includes("Voucher");
    if (localStorage.key(i) !== "Tokens" && check == false && check2 == false){
      var item_qty = key.qty;
      var price = key.price;
      var total_price = item_qty * key.price;
      total_items += item_qty;
      subtotal += total_price;
    }
  }
  $("i").html(`${total_items}`)
  if (discount == "Basic"){
    savings = round(subtotal * 0.1);
    subtotal = round(subtotal * 0.9);
    $(".total-price").html(`$${subtotal}`);
    $(".subtotalText").html(`Subtotal (basic voucher applied), saving you $${savings}:`);
  }
  else if (discount == "Premium"){
    savings = round(subtotal * 0.3);
    subtotal = round(subtotal * 0.7);
    $(".total-price").html(`$${subtotal}`);
    $(".subtotalText").html(`Subtotal (premium voucher applied), saving you $${savings}:`);
  }
  else{
    subtotal = round(subtotal * 0.5);
    $(".total-price").html(`$${subtotal}`);
    $(".subtotalText").html(`Subtotal (super voucher applied, saving you $${subtotal}:`)
  }
}

function Pay(){
  var subtotalraw = $(".total-price").html();
  var subtotal = subtotalraw.substring(1);
  console.log(subtotal);
  if (subtotal == 0){
    alert("Error! No items in cart!")
  }
  else{
    var checkVoucher = $('.applyVoucher:checked').val();
    if (checkVoucher == undefined){
      console.log("No Voucher")
      AddTokens(subtotal); //no voucher used
    }
    else{
      console.log("Have Voucher")
      if (checkVoucher == "Basic"){
        var voucheramount = localStorage.getItem("VoucherBasic");
        var newAmount = parseInt(voucheramount) - 1;
        localStorage.setItem(`VoucherBasic`, newAmount);

      }
      else if (checkVoucher == "Premium"){
        var voucheramount = localStorage.getItem("VoucherPremium");
        var newAmount = parseInt(voucheramount) - 1;
        localStorage.setItem(`VoucherPremium`, newAmount);
      }  
      else{
        var voucheramount = localStorage.getItem("VoucherSuper");
        var newAmount = parseInt(voucheramount) - 1;
        localStorage.setItem(`VoucherSuper`, newAmount);
      }
      AddTokens(subtotal);
    }
  }
}

function AddTokens(subtotal){
  var tokens = parseInt(localStorage.getItem("Tokens"));
  var earnedtokens  = Math.floor(subtotal);
  var totaltokens = earnedtokens + tokens;
  localStorage.setItem("Tokens", totaltokens);
  alert(`Successfully paid. Received ${earnedtokens} tokens. Total tokens = ${totaltokens}`);
  ClearCart();
}

function test(){
    localStorage.setItem("Tokens", 0);
    localStorage.setItem("VoucherBasic", 0);
    localStorage.setItem("VoucherPremium", 0);
    localStorage.setItem("VoucherSuper", 0);
}

function round(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}