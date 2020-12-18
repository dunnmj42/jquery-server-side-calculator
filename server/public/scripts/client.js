$(document).ready(handleReady);

function handleReady() {
    console.log("jquery is loaded!");
    
    $('#plusBtn').on('click', plusBtn);
    $('#subBtn').on('click', subBtn);
    $('#multBtn').on('click', multBtn);
    $('#diviBtn').on('click', diviBtn);
    $('#eqBtn').on('click', eqBtn);
    $('#clrBtn').on('click', clrBtn);
}

let equation = {};

function plusBtn() {
    equation.opperator = '+'
}

function subBtn() {
    equation.opperator = '-'
}

function multBtn() {
    equation.opperator = '*'
}

function diviBtn() {
    equation.opperator = '/'
}

function eqBtn() {
    
    equation.firstNum = $('#firstNum').val(),
    equation.secondNum = $('#secondNum').val(),
    
    console.log(equation);

    $.ajax({
        url: '/calculate',
        type: 'POST',
        data: equation
    }).then(function(response) {
       
        console.log(response);

    });
    
}

function clrBtn() {
    $('#firstNum').val('');
    $('#secondNum').val('');
    equation = {};
    console.log(equation);
}