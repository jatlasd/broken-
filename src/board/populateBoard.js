
import { createBoard } from "./createBoard.js";
import { getPieceType } from "./getPieceType.js";



export function populateBoard() {
    const squares = document.querySelectorAll('.square')
    for (const square of squares) {
        const [file, row] = square.id.split('')
        const color = (row === '1' || row === '2') ? 'white' : (row === '7' || row === '8') ? 'black' : '';
        const pieceType = getPieceType(file, row, color)
        const isBlack = square.dataset.squareColor=='black'
        square.classList.add(isBlack ? 'black' : 'white')
        if(color) {
            // square.classList.add(pieceType)
            square.dataset.color = color
            square.dataset.piece = pieceType
            square.dataset.occupied = true
            square.style.setProperty('background-image', `url(assets/${color}-${pieceType}.png)`)
        }
    }
  }
  createBoard()