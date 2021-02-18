$(document).ready(function () {
  var tokens = localStorage.getItem("Tokens");
  $("i").html(`${tokens}`);
  GachaSystem(tokens);
})


function Popup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function GachaSystem(tokens){
    document.getElementById("Spin").addEventListener("click", function() {
      if (tokens == 0){
        alert("No tokens to spin");
      }
      else{
        tokens -= 50;
        $("i").html(`${tokens}`);
        localStorage.setItem("Tokens", tokens);
        prize = SpinPrize();
        check = AddPrizeToInventory(prize);
        if (check == false){
          tokens += 50
          alert("Inventory full! Use your existing vouchers!")
          $("i").html(`${tokens}`);
          localStorage.setItem("Tokens", tokens);
        }
      }
    })
}


function SpinPrize() {
  var prizes = [[60, "Basic Voucher"], [95, "Premium Voucher"], [100, "Super Voucher"]];
  var rand = Math.floor(Math.random() * 100) + 1; // 1-100
  //60% basic voucher, 35% prem voucher, 5% super voucher
  if (rand < prizes[0][0]){
    return prizes[0][1];
  }
  else if (rand < prizes[1][0]){
    return prizes[1][1];
  }
  else{
    return prizes[2][1];
  }
}

function AddPrizeToInventory(prize){
  var discount = 0
  if (prize == "Basic Voucher"){
    var voucheramount = localStorage.getItem("VoucherBasic")
    localStorage.setItem(`VoucherBasic`, voucheramount++);
  }
  else if (prize == "Premium Voucher"){
    var voucheramount = localStorage.getItem("VoucherBasic")
    localStorage.setItem(`VoucherSuper`, voucheramount++);
  }  
  else{
    var voucheramount = localStorage.getItem("VoucherBasic")
    localStorage.setItem(`VoucherSuper`, voucheramount++);
  }
}