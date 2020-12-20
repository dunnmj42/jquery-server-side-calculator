$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");

  $("#plusBtn").on("click", plusBtn);
  $("#subBtn").on("click", subBtn);
  $("#multBtn").on("click", multBtn);
  $("#diviBtn").on("click", diviBtn);
  $("#eqBtn").on("click", eqBtn);
  $("#clrBtn").on("click", clrBtn);
  $(".numBtns").on("click", ".key", numKey);
  $("#delBtn").on("click", delBtn);
  $("#historyList").on("click", ".histItem", recallHistory);
}

let equation = {};
let history = [];

function numKey(e) {
  let key = e.target;
  let value = key.textContent; // get button element text content for value

  console.log(value);

  $("#calcDisplay").val(function (n, c) {
    return c + value; // "append" new button inputs to input field
  });
}

function renderToDom() {
  // ajax get lives here
  $.ajax({
    url: "/calculate",
    type: "GET",
  }).then(function (response) {
    history = response;
    let lastEq = history[history.length - 1]; // most recent (current) evaluation

    console.log(history);

    $("#result").text(` = ${lastEq.result}`); // result display

    $("#historyList").empty();

    for (let i = 0; i < history.length; i++) {
      $("#historyList").append(`<li class="list-group-item histItem" id="${i}">
            ${history[i].firstNum}
            ${history[i].operator}
            ${history[i].secondNum} = 
            ${history[i].result}</li>
            `); // history list append
    }
  });
}

// equation operator functions: this could have maybe been more terse by applying
// the textContent method I ended up using above.

function plusBtn() {
  equation.operator = "+";

  equation.firstNum = $("#calcDisplay").val();

  if (!equation.firstNum) {
    equation.firstNum = history[history.length - 1].result;
  }

  $("#lastEq").children().text("");

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

function subBtn() {
  equation.operator = "-";

  equation.firstNum = $("#calcDisplay").val();

  if (!equation.firstNum) {
    equation.firstNum = history[history.length - 1].result;
  }

  $("#lastEq").children().text("");

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

function multBtn() {
  equation.operator = "*";

  equation.firstNum = $("#calcDisplay").val();

  if (!equation.firstNum) {
    equation.firstNum = history[history.length - 1].result;
  }

  $("#lastEq").children().text("");

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

function diviBtn() {
  equation.operator = "/";

  equation.firstNum = $("#calcDisplay").val();

  if (!equation.firstNum) {
    equation.firstNum = history[history.length - 1].result;
  }

  $("#lastEq").children().text("");

  $("#calcDisplay").val("");

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
}

// "equals" or submit button: this does some null checks, allows for concurrent
// evaluation, and makes the ajax req to server

function eqBtn() {
  if (!equation.secondNum) {
    equation.secondNum = $("#calcDisplay").val();
    $("#calcDisplay").val("");
    console.log(equation);
  }
  if (equation.secondNum) {
    $("#secondNum").text(equation.secondNum);
    console.log(equation);
    $.ajax({
      url: "/calculate",
      type: "POST",
      data: equation,
    }).then(function (response) {
      console.log(response);
      equation = {};
      renderToDom();
    });
  }
}

// This one clears the input field and the "current" evaluation

function clrBtn() {
  $("#calcDisplay").val("");

  equation = {};
  console.log(equation);
  $("#lastEq").children().text("");
}

// delete history, ajax DELETE, and clearing history from DOM

function delBtn() {
  $.ajax({
    url: "/history",
    type: "DELETE",
  }).then(function (response) {
    console.log(response);
    history = response;
    $("#lastEq").children().text("");
    $("#historyList").empty();
  });
}

// targets and recalls history equation for reevaluation, I wanted to get the
// cursor to stop turning into a text cursor on mouseover for the history items,
// but didn't get to it.

function recallHistory() {
  let recallTarget = this.id;
  let recallEq = history[recallTarget];
  console.log("Recall target id is:", recallTarget);
  console.log(recallEq);

  $("#lastEq").children().text("");

  equation.firstNum = recallEq.firstNum;
  equation.operator = recallEq.operator;
  equation.secondNum = recallEq.secondNum;

  $("#firstNum").text(equation.firstNum);
  $("#operator").text(equation.operator);
  $("#secondNum").text(equation.secondNum);
}
