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
    discount = Math.random() * (10-5);
  }
  else if (prize == "Premium Voucher"){
    discount = Math.random() * (40-10) + 10;
  }
  else{
    discount = Math.random() * (60-40) + 40;
  }
  for(i = 1; i < 100; i++){
    var inventory = localStorage.getItem("inventoryno" + `${i}`)
    if (inventory == null){
      alert(`inventoryno${i}`);
      data = {'voucher_name' : `${prize}`,
      'voucher_disc' : discount}
      localStorage.setItem(`inventoryno${i}`, JSON.stringify(data));
      return true;
    }
  }
  return false;
}