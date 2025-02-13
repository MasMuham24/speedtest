let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let xInput = document.getElementById('x');
let yInput = document.getElementById('y');
let splitButton = document.getElementById('splitButton');

canvas.width = 600;
canvas.height = 300;

let gameGrid = [];

class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
    }
    draw() {
        if (this.visible) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.clearRect(this.x, this.y, this.width, this.height);
        }
    }
}

function spliti() {
    gameGrid = [];
    let cellWidth = canvas.width / parseInt(xInput.value);
    let cellHeight = canvas.height / parseInt(yInput.value);
    
    for (let y = 0; y < canvas.height; y += cellHeight) {
        for (let x = 0; x < canvas.width; x += cellWidth) {
            gameGrid.push(new Cell(x, y, cellWidth, cellHeight));
        }
    }
}

function handle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
    }
}

function split() {
    spliti();
    handle();
    removeCellsRandomly();
}

// function removeCellsRandomly() {
//     let indexes = gameGrid.map((_, index) => index);
//     indexes = indexes.sort(() => Math.random() - 0.5); 
    
//     let interval = setInterval(() => {
//         if (indexes.length === 0) {
//             clearInterval(interval);
//             return;
//         }
//         let index = indexes.pop();
//         gameGrid[index].visible = false;
//         handle();
//     }, 900); 
// }

splitButton.addEventListener('click', split);
