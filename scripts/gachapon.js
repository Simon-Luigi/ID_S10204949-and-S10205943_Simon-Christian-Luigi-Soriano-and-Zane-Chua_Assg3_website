$(document).ready(function () {
  InitializeTokens();
  GachaSystem();
})

function InitializeTokens(){
  var tokens = localStorage.getItem("Tokens");
  $("i").html(`${tokens}`);
}

function Popup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}