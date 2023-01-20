// assign DOM elements
const header = document.querySelector('.header');
const bodyContainer = document.querySelector('.body-container');
const sidebarContent = document.querySelector('.sidebar-content');
const sketchpad = document.querySelector('.sketchpad');
const toggleStatus = document.querySelector('.toggle-status');
const clearSketchpadBtn = document.querySelector('.clear-sketchpad-btn');

// assign DOM element forms
const sketchpadSizeForm = document.querySelector('#sketchpad-size');
const sketchpadColorForm = document.querySelector('#sketchpad-color');
const penColorForm = document.querySelector('#pen-color');

// set variables
let pen = false;
let penColor = 'black';
let sketchpadBackgroundColor = 'white';
let columns = 32;
let sketchpadSize = 576;
let currentColumn = 0;
let currentRow = 0;

// create surface
function createSurface(columns, sBackgroundColor) {
    sketchpad.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    sketchpad.style.gridTemplateRows = `repeat(${columns}, 1fr)`;
    sketchpad.style.backgroundColor = sBackgroundColor;

    // create item divs and attach row and column class
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < columns; j++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add(`col${j}row${i}`);
            sketchpad.appendChild(newDiv);
        }
    }
}

// clear surface
function clearSurface() {
    sketchpad.innerHTML = '';
    createSurface(columns, sketchpadBackgroundColor);
}

// toggle pen and color current cell if toggled on and in range
function togglePen(e) {
    if (e.code === "Space" || e.type === "click") {
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
    // on top, must account for all header elements
    // on left, must account for all auto margins and flex containers
    // remember, margins collapse vertically
    const sketchpadStyle = window.getComputedStyle(sketchpad);
    const headerStyle = window.getComputedStyle(header);
    const headerOffsetY = Number(headerStyle.height.slice(0, -2))
        + Number(headerStyle.marginTop.slice(0, -2))
        + Number(headerStyle.marginBottom.slice(0, -2));
    const bodyContainerStyle = window.getComputedStyle(bodyContainer);
    const bodyContainerOffsetX = Number(bodyContainerStyle.marginLeft.slice(0, -2));
    const sidebarContentStyle = window.getComputedStyle(sidebarContent);
    const sidebarContentOffsetX = Number(sidebarContentStyle.width.slice(0, -2));
    // account for new elements that may be added
    const totalOffsetX = bodyContainerOffsetX + sidebarContentOffsetX;
    const totalOffsetY = headerOffsetY;
    const offsetX = Number(sketchpadStyle.marginLeft.slice(0, -2)); // chop off 'px'
    const offsetY = Number(sketchpadStyle.marginTop.slice(0, -2)); // chop off 'px'

    // compute cell location
    const pixelsPerColumn = sketchpadSize / columns;
    const xPosition = e.clientX - offsetX - totalOffsetX;
    const yPosition = e.clientY - offsetY - totalOffsetY;
    const column = columns - Math.floor((sketchpadSize - xPosition) / pixelsPerColumn) - 1;
    const row = columns - Math.floor((sketchpadSize - yPosition) / pixelsPerColumn) - 1;

    currentColumn = column;
    currentRow = row;
} 

// color cell
function colorCell(column, row) {
    const gridBox = document.querySelector(`.col${column}row${row}`);
    if (penColor === 'eraser') {
        gridBox.style.backgroundColor = 'inherit';
    } else {
        gridBox.style.backgroundColor = penColor; 
    }
}

// mouse movement main drawing function
function draw(e) {
    // is the pen active?
    if (pen) {
        // are you on the sketchpad?
        if ((currentColumn >= 0 && currentColumn < columns) &&(currentRow >= 0 && currentRow < columns)) {
            colorCell(currentColumn, currentRow);
        }
    }
}

// create initial surface
createSurface(columns, sketchpadBackgroundColor);

// add event listeners
sketchpad.addEventListener('mousemove', draw); // only draw on the sketchpad
document.addEventListener('mousemove', trackPosition); // always track the position
document.addEventListener('keypress', togglePen);
sketchpad.addEventListener('click', togglePen);

// handle forms - getting the radio button data was a little tricky
sketchpadSizeForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(sketchpadSizeForm);
    [arrData] = [...data];
    columns = arrData[1];
    clearSurface();
});

sketchpadColorForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(sketchpadColorForm);
    [arrData] = [...data];
    sketchpadBackgroundColor = arrData[1];
    sketchpad.style.backgroundColor = sketchpadBackgroundColor;
    // clearSurface();
});

penColorForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(penColorForm);
    [arrData] = [...data];
    penColor = arrData[1];
});

// handle the clear sketchpad button
clearSketchpadBtn.addEventListener('click', e => {
    clearSurface();
});