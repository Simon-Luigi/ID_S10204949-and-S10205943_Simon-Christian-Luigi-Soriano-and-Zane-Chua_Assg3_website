document.getElementById("Check").addEventListener("click", function() {
  if (localStorage.length == 0){
    console.log("Data doesnt exist");
  }
  else{
    
  }
});


document.getElementById("Clear").addEventListener("click", function() {
  localStorage.clear();
  console.log("success");
});
