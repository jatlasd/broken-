import { populateBoard } from "./src/board/populateBoard.js";
import { handleHighlightSelectedSquare } from "./src/highlights/highlights.js";
// import { removeHighlightSelectedSquare } from "./src/highlights/highlights.js";
// import { highlightSelectedSquare } from "./src/highlights/highlights.js";

populateBoard();

let squares = document.querySelectorAll(".square");

let clickedPiece = {};

function isEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

function assignClickedPiece(square) {
  if (isEmpty(clickedPiece)) {
    let splitSquare = square.id.split("");
    clickedPiece = {
      color: square.dataset.color,
      piece: square.dataset.piece,
      file: splitSquare[0],
      row: parseInt(splitSquare[1]),
      hasMoved: square.dataset.hasMoved,
      isTo: square.dataset.isTo,
    };
  }
}

squares.forEach((square) => {
  square.addEventListener("click", function () {
    handleHighlightSelectedSquare(square);
  });
});
