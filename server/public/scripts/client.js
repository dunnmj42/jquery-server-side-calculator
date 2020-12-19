$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");

  $("#plusBtn").on("click", plusBtn);
  $("#subBtn").on("click", subBtn);
  $("#multBtn").on("click", multBtn);
  $("#diviBtn").on("click", diviBtn);
  $("#eqBtn").on("click", eqBtn);
  $("#clrBtn").on("click", clrBtn);
  $(".numBtns").on("click", numKey)
}

function numKey(e){
  let key = e.target
  let value = key.textContent
  
  console.log(value);

  $('#calcDisplay').val(function(n, c){
    return c + value
  })
}

function renderToDom() {
  $.ajax({
    url: "/calculate",
    type: "GET",
  }).then(function (response) {
    let history = response;
    let lastAnswer = history[history.length - 1].result;

    console.log(history);

    $("#calcDisplay").val(`${lastAnswer}`);
    $("#historyList").empty();

    for (let i = 0; i < history.length; i++) {
      $("#historyList").append(`<li>
            ${history[i].firstNum}
            ${history[i].opperator}
            ${history[i].secondNum} = 
            ${history[i].result}</li>
            `);
    }
  });
}

let equation = {};

function plusBtn() {
  equation.opperator = "+";

  equation.firstNum = $("#calcDisplay").val()

  $("#calcDisplay").val("")
}

function subBtn() {
  equation.opperator = "-";

  equation.firstNum = $("#calcDisplay").val()

  $("#calcDisplay").val("")
}

function multBtn() {
  equation.opperator = "*";

  equation.firstNum = $("#calcDisplay").val()

  $("#calcDisplay").val("")
}

function diviBtn() {
  equation.opperator = "/";

  equation.firstNum = $("#calcDisplay").val()

  $("#calcDisplay").val("")
}

function eqBtn() {
  equation.secondNum = $("#calcDisplay").val()
  $("#calcDisplay").val("")
    console.log(equation);

  if (equation.secondNum) {
    $.ajax({
      url: "/calculate",
      type: "POST",
      data: equation,
    }).then(function (response) {
      console.log(response);
      renderToDom();
    });
  }
}

function clrBtn() {
  $("#calcDisplay").val("");

  equation = {};
  console.log(equation);
}
