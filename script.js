let num = 16;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var blackSquares = function(element) {
    return function() {
        //     element.style.transition = 'None';
        element.setAttribute('style', `border:1px solid; background-color: rgba(0,0,0)`);
    }
}

var colorSquares = function(element) {
    return function() {
        element.style.transition = 'None';
        let red = getRandomInt(0, 255);
        let green = getRandomInt(0, 255);
        let blue = getRandomInt(0, 255);
        element.setAttribute('style', `border: 1px solid; background-color: rgba(${red},${green},${blue})`);
    }
}

let functionSelected = blackSquares;

const start = document.getElementById('start');
start.addEventListener('click', function() {
    num = prompt('Enter the Size of the grid(max 64): ');
    const div = document.querySelector('#container')
    if (num <= 64) {
        container.innerHtml = '';
        div.remove('div')
        createGrid(num, functionSelected);
    } else if (num > 64) {
        alert('You exceeded limits. Try Again: ');
    }
})

const reset = document.getElementById('reset');
reset.addEventListener('click', function() {
    const div = document.querySelector('#container');
    div.remove('div');
    createGrid(num, functionSelected);
})

function createGrid(num, paint) {

    const main = document.querySelector('main')
        // creating a div element
    const div = document.createElement('div');
    // setting id and style
    div.setAttribute('id', 'container');
    div.setAttribute('style', `grid-template-columns: repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr);)`);
    // add div to main
    main.appendChild(div);
    // getting the div with id container
    const container = document.querySelector('#container')

    for (let i = 0; i < num * num; i++) {
        const div = document.createElement('div');
        // naming the class
        div.setAttribute('class', 'grid-item')
            // setting the style
        div.setAttribute('style', 'border:1px solid')
            // add grid sq to container div
        container.appendChild(div)
    }

    const divsList = document.querySelectorAll('.grid-item')
        // setting the color on hover
    divsList.forEach(element => {
        element.addEventListener('mouseover', paint(element))
    })
}

createGrid(num, functionSelected)

function paint(e) {
    functionSelected(e);
}

let buttonColors = document.getElementById('colors')
buttonColors.onclick = function() {
    const div = document.querySelector('#container')
    div.remove('div');
    functionSelected = colorSquares;
    createGrid(num, functionSelected)
}
let buttonBlack = document.getElementById('black');
buttonBlack.onclick = function() {
    const div = document.querySelector('#container')
    div.remove('div');
    functionSelected = blackSquares;
    createGrid(num, functionSelected)
}