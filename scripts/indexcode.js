$(document).ready(function () {
  var check = localStorage.hasOwnProperty('Tokens'); //check if new user
  if (check == false){
    localStorage.setItem("Tokens", 0);
    localStorage.setItem("VoucherBasic", 0);
    localStorage.setItem("VoucherPremium", 0);
    localStorage.setItem("VoucherSuper", 0);
  }
})