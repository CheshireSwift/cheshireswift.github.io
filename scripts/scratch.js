$(document).ready(function(){
  $( "#core-cell" ).html("Changed!")

})

var addRowTop = function() {
  $("#core-cell").html("up!");
  var table = document.getElementById("expanding-table")
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHtml = "<p>new!</p>";
}

var addRowBottom = function() {
  $("#core-cell").html("down!")
}


var addColumnLeft = function() {
  $("#core-cell").html("left!")
}


var addColumnRight = function() {
  $("#core-cell").html("right!")
}
