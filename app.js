const tileDisplay = document.querySelector('.tile-container');
const keyBoard = document.querySelector('.keyboard-container');
const messageDisplay = document.querySelector('.message-container');

const wordle = 'RUMON';

// keyboard keys array
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
];

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

// making grid
guessRows.forEach((guessRow, guessRowIndex)=>{
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((guess, guessIndex)=>{
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    })
    tileDisplay.append(rowElement);
});

// making keyboard button element
keys.forEach((key)=>{
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', ()=>handleClick(key));
    keyBoard.append(buttonElement);
});

// clicking button
const handleClick = (letter)=>{
    if(letter === '«'){
        deleteLetter();
        return;
    };
    if(letter === 'ENTER'){
        checkRow();
        return;
    }
    addLetter(letter);
};

// adding a letter in the function
const addLetter = (letter)=>{
    if(currentTile < 5 && currentRow < 6){
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        // also updating the guess rows
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
    }
};

// delete the letter
const deleteLetter = ()=> {
    if(currentTile > 0){
        currentTile--; 
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
};

// checking the row
const checkRow = () =>{
    const guess = guessRows[currentRow].join('');
    flipTile();
    if(currentTile > 4){
        console.log('guess is ' + guess, 'wordle is ' + wordle);
        if(wordle == guess){
            showMessage('Good Job!');
            isGameOver = true;
            return;
        }else{
            if(currentRow >= 5){ // check if it reaches the last row
                isGameOver = true;
                showMessage('Game Over');
                return;
            };
            if(currentRow < 5){
                currentRow++;
                currentTile = 0;// increment the row and switch to the first cell
            }
        }
    }
};

const showMessage = (message)=>{
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(()=>{
        messageDisplay.removeChild(messageElement);
    }, 2000);
};

const addColorToKey = (dataLetter, color)=>{
    const keyElement = document.getElementById(dataLetter);
    keyElement.classList.add(color);
}

// flipping tile
const flipTile = ()=>{
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    rowTiles.forEach((tile, index)=>{
        console.log(tile);
        const dataLetter = tile.innerText;

        setTimeout(()=>{
            tile.classList.add('flip');
            if(dataLetter == wordle[index]){
                tile.classList.add('green-overlay');
                addColorToKey(dataLetter, 'green-overlay');
            }else if(wordle.includes(dataLetter)){
                tile.classList.add('yellow-overlay');
            }else{
                tile.classList.add('grey-overlay');
            }
        },500 * index)
    })
}

