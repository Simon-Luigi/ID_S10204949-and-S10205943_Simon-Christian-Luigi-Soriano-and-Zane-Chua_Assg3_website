$(document).ready(function () {
  InitializeTokens();
})

function InitializeTokens(){
  var tokens = localStorage.getItem("Tokens");
  $("i").html(`${tokens}`);
}
