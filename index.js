// assign DOM elements
const sketchpad = document.querySelector('.sketchpad');


// create surface function
function createSurface(columns, backgroundColor) {
    sketchpad.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    sketchpad.style.gridTemplateRows = `repeat(${columns}, 1fr)`;
    sketchpad.style.backgroundColor = backgroundColor;

    // create item divs
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < columns; j++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add(`col${j}`);
            newDiv.classList.add(`row${i}`);
            sketchpad.appendChild(newDiv);
        }
    }
}

// temporary exitSketch
function exitSketch() {
    return;
}

// sketch function
function sketch(e) {
    sketchpad.addEventListener('mouseup', exitSketch);
    
    // compute current margins of sketchpad to establish offsets for mouse position
    const sketchpadStyle = window.getComputedStyle(sketchpad);
    const offsetX = Number(sketchpadStyle.marginLeft.slice(0, -2));
    const offsetY = Number(sketchpadStyle.marginTop.slice(0, -2));
    
    console.log(e.clientX - offsetX, e.clientY - offsetY);
}

// create surface
createSurface(16, 'coral');

// if user has mouse down fire first event listenser
sketchpad.addEventListener('mousedown', sketch);