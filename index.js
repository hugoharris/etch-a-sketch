// assign DOM elements
const sketchpad = document.querySelector('.sketchpad');

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

createSurface(16, 'coral');