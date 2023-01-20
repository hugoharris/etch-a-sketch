// assign DOM elements
const sketchpad = document.querySelector('.sketchpad');

// set variables
let pen = false;
let columns = 64;
let sketchpadSize = 576;

// create surface function
function createSurface(columns, backgroundColor) {
    sketchpad.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    sketchpad.style.gridTemplateRows = `repeat(${columns}, 1fr)`;
    sketchpad.style.backgroundColor = backgroundColor;

    // create item divs and attach row and column class
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < columns; j++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add(`col${j}row${i}`);
            // newDiv.classList.add(`row${i}`);
            sketchpad.appendChild(newDiv);
        }
    }
}

// toggle pen
function togglePen(e) {
    console.log(pen);
    console.log(e.code);
    if (e.code === "Space") {
        pen ? pen = false : pen = true;
    }
} 

// mouse movement
function moveMouse(e) {
    // is the pen active?
    if (pen) {
        // compute current margins of sketchpad to establish offsets for mouse position
        const sketchpadStyle = window.getComputedStyle(sketchpad);
        const offsetX = Number(sketchpadStyle.marginLeft.slice(0, -2));
        const offsetY = Number(sketchpadStyle.marginTop.slice(0, -2));

        // compute cell location
        const pixelsPerColumn = sketchpadSize / columns;
        const xPosition = e.clientX - offsetX;
        const yPosition = e.clientY - offsetY;
        console.log(xPosition, yPosition, sketchpadSize / columns);
        const column = columns - Math.floor((sketchpadSize - xPosition) / pixelsPerColumn) - 1;
        const row = columns - Math.floor((sketchpadSize - yPosition) / pixelsPerColumn) - 1;
        console.log(column, row);

        // color cell
        const gridBox = document.querySelector(`.col${column}row${row}`)
        gridBox.style.backgroundColor = 'black';

        // temporary log of mouse position
        console.log(xPosition, yPosition); 
    }
}

// create surface
createSurface(columns, 'coral');

// add event listeners
sketchpad.addEventListener('mousemove', moveMouse);
document.addEventListener('keypress', togglePen);