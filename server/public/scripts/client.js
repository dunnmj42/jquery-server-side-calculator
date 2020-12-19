$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");

  $("#plusBtn").on("click", plusBtn);
  $("#subBtn").on("click", subBtn);
  $("#multBtn").on("click", multBtn);
  $("#diviBtn").on("click", diviBtn);
  $("#eqBtn").on("click", eqBtn);
  $("#clrBtn").on("click", clrBtn);
  $(".numBtns").on("click", numKey);
  $("#delBtn").on("click", delBtn);
}

let equation = {};
let history = [];

function numKey(e) {
  let key = e.target;
  let value = key.textContent;

  console.log(value);

  $("#calcDisplay").val(function (n, c) {
    return c + value;
  });
}

function renderToDom() {
  $.ajax({
    url: "/calculate",
    type: "GET",
  }).then(function (response) {
    history = response;
    let lastEq = history[history.length - 1];

    console.log(history);

    $("#result").text(` = ${lastEq.result}`);

    $("#historyList").empty();

    for (let i = 0; i < history.length; i++) {
      $("#historyList").append(`<li>
            ${history[i].firstNum}
            ${history[i].operator}
            ${history[i].secondNum} = 
            ${history[i].result}</li>
            `);
    }
  });
}

function plusBtn() {
  equation.operator = "+";

  equation.firstNum = $("#calcDisplay").val();

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

function subBtn() {
  equation.operator = "-";

  equation.firstNum = $("#calcDisplay").val();

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

function multBtn() {
  equation.operator = "*";

  equation.firstNum = $("#calcDisplay").val();

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

function diviBtn() {
  equation.operator = "/";

  equation.firstNum = $("#calcDisplay").val();

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

function eqBtn() {
  equation.secondNum = $("#calcDisplay").val();
  $("#calcDisplay").val("");
  console.log(equation);

  if (equation.secondNum) {
    $("#secondNum").text(equation.secondNum);
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
  $("#firstNum").text("");
  $("#operator").text("");
  $("#secondNum").text("");
  $("#result").text("");
}

function delBtn() {
  $.ajax({
    url: "/history",
    type: "DELETE",
  }).then(function (response) {
    console.log(response);
    history = response;
    $("#historyList").empty();
  });
}
