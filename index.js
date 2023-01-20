// assign DOM elements
const sketchpad = document.querySelector('.sketchpad');
const toggleStatus = document.querySelector('.toggle-status');

// set variables
let pen = false;
let columns = 64;
let sketchpadSize = 576;
let currentColumn = 0;
let currentRow = 0;

// create surface
function createSurface(columns, backgroundColor) {
    sketchpad.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    sketchpad.style.gridTemplateRows = `repeat(${columns}, 1fr)`;
    sketchpad.style.backgroundColor = backgroundColor;

    // create item divs and attach row and column class
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < columns; j++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add(`col${j}row${i}`);
            sketchpad.appendChild(newDiv);
        }
    }
}

// toggle pen and color current cell if toggled on and in range
function togglePen(e) {
    if (e.code === "Space") {
        if (pen === false) {
            pen = true;
            toggleStatus.innerHTML = '<p>The Pen is ON!</p>'
            if ((currentColumn >= 0 && currentColumn < columns) &&(currentRow >= 0 && currentRow < columns)) {
                colorCell(currentColumn, currentRow);
            }
        } else {
            pen = false;
            toggleStatus.innerHTML = '<p>The Pen is OFF!</p>'
        }
    }
} 

// track the position of the cursor and update currentColumn and currentRow
function trackPosition(e) {
    // compute current margins of sketchpad to establish offsets for mouse position
    const sketchpadStyle = window.getComputedStyle(sketchpad);
    const offsetX = Number(sketchpadStyle.marginLeft.slice(0, -2)); // chop off 'px'
    const offsetY = Number(sketchpadStyle.marginTop.slice(0, -2)); // chop off 'px'

    // compute cell location
    const pixelsPerColumn = sketchpadSize / columns;
    const xPosition = e.clientX - offsetX;
    const yPosition = e.clientY - offsetY;
    console.log(xPosition, yPosition, sketchpadSize / columns);
    const column = columns - Math.floor((sketchpadSize - xPosition) / pixelsPerColumn) - 1;
    const row = columns - Math.floor((sketchpadSize - yPosition) / pixelsPerColumn) - 1;
    console.log(column, row);

    currentColumn = column;
    currentRow = row;
} 

// color cell
function colorCell(column, row) {
    const gridBox = document.querySelector(`.col${column}row${row}`)
    gridBox.style.backgroundColor = 'black'; 
}

// mouse movement main drawing function
function draw(e) {
    // is the pen active?
    if (pen) {
        // color cell
        colorCell(currentColumn, currentRow);
    }
}

// create surface
createSurface(columns, 'coral');

// add event listeners
sketchpad.addEventListener('mousemove', draw);
document.addEventListener('mousemove', trackPosition);
document.addEventListener('keypress', togglePen);