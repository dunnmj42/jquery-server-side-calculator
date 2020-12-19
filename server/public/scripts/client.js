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

function renderToDom() {
    $.ajax({
        url : '/calculate',
        type : 'GET'
    }).then(function(response){
        
        let history = response;
        let lastAnswer = history[history.length - 1].result;

        console.log(history);
        
        $('#calcAnswer').text(`${lastAnswer}`)
        $('#historyList').empty();

        for (let i = 0; i < history.length; i++) {
            
            $('#historyList').append(`<li>
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
        renderToDom();
    });
}

function clrBtn() {
    $('#firstNum').val('');
    $('#secondNum').val('');
    $('#calcAnswer').text('');
    equation = {};
    console.log(equation);
}