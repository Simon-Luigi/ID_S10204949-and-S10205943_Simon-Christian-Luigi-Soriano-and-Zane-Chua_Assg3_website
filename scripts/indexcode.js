$(document).ready(function () {
  var check = localStorage.hasOwnProperty('Tokens'); //check if new user
  if (check == false){
    localStorage.setItem("Tokens", 0);
  }
})