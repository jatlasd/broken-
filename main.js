import { populateBoard } from "./src/board/populateBoard.js";
import { handlePawnMove } from "./src/pieces/pawn.js";

populateBoard();

let squares = document.querySelectorAll(".square");
let colorToMove = "white";

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (moveSquares.length == 0) {
      moveSquares.push(square.dataset.color);
    }
    if (square.dataset.color == colorToMove) {
      if (square.dataset.occupied) {
        assignClickedPiece(square);
        handlePieceClick(event);
        movePiece();
      }
    }
  });
});

// Important Variables
let availableSquares = [];
let clickedPiece = {};
let moveSquares = [];

function isEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

// Universal Functions
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

//! highlights.js

function highlightAvailableSquares() {
  squares.forEach((square) => {
    for (let i = 0; i < availableSquares.length; i++) {
      if (square.id === availableSquares[i]) {
        if (!square.dataset.occupied) {
          square.classList.contains("odd")
            ? square.classList.add("black-available")
            : square.classList.add("white-available");
        }
      }
    }
  });
}

function removeHighlightAvailableSquares() {
  availableSquares = [];
  squares.forEach((square) => {
    if (
      square.classList.contains("white-available") ||
      square.classList.contains("black-available")
    ) {
      square.classList.contains("odd")
        ? square.classList.remove("black-available")
        : square.classList.remove("white-available");
    }
  });
}

//!

// TODO: Take the piece check out of handlePawnMove and implement a universal piece check in handlePieceClick


function handlePieceClick(e) {
  const square = e.target;
  const isSelectedBlack = square.classList.contains("selected-black");
  const isSelectedWhite = square.classList.contains("selected-white");
  const isOdd = square.classList.contains("odd");

  if (!isSelectedBlack && !isSelectedWhite) {
    square.classList.add(isOdd ? "selected-black" : "selected-white");
    moveSquares.push(square.id);
    switch (square.dataset.piece) {
      case "pawn":
        return handlePawnMove(squares, clickedPiece, isEmpty, availableSquares, captureSquares, handleCaptureDown);
      case "rook":
        return handleRookMove();
      case "knight":
        return handleKnightMove();
      case "bishop":
        return handleBishopMove();
      case "king":
        return handleKingMove();
      case "queen":
        return handleQueenMove();
    }
  } else if (isSelectedBlack || isSelectedWhite) {
    clickedPiece = {};
    moveSquares = [];
    removeSelectedSquares();
    removeHighlightAvailableSquares();
    if (square.dataset.move) {
      square.dataset.move = "";
    }
    clearCaptureClass();
  }
}
// function handlePieceClick(e) {
//   const target = e.target;
//   const isSelectedBlack = target.classList.contains("selected-black");
//   const isSelectedWhite = target.classList.contains("selected-white");
//   const isOdd = target.classList.contains("odd");

//   if (!isSelectedBlack && !isSelectedWhite) {
//     target.classList.add(isOdd ? "selected-black" : "selected-white");
//     moveSquares.push(target.id);
//     switch (target.dataset.piece) {
//       case "pawn":
//         return handlePawnMove(target, clickedPiece);
//       case "rook":
//         return handleRookMove();
//       case "knight":
//         return handleKnightMove();
//       case "bishop":
//         return handleBishopMove();
//       case "king":
//         return handleKingMove();
//       case "queen":
//         return handleQueenMove();
//     }
//   } else if (isSelectedBlack || isSelectedWhite) {
//     clickedPiece = {};
//     moveSquares = [];
//     removeSelectedSquares();
//     removeHighlightAvailableSquares();
//     if (target.dataset.move) {
//       target.dataset.move = "";
//     }
//     clearCaptureClass();
//   }
// }

// Universal Piece Movement

function movePiece() {
  squares.forEach((square) => {
    square.addEventListener("click", handleClick);
  });
}

function handleClick(e) {
  const square = e.target
  const whiteToMove = colorToMove == "white";
  if (
    square.classList.contains("black-available") ||
    square.classList.contains("white-available")
  ) {
    colorToMove = whiteToMove ? "black" : "white";
    removeMoveSquares();
    setNewSquare(square);
    clearOldSquare();
    removeHighlightAvailableSquares();
    moveSquares = [];
    clickedPiece = {};
  }
}
// function handleClick(e) {
//   const whiteToMove = colorToMove == "white";
//   const square = e.target;
//   if (
//     square.classList.contains("black-available") ||
//     square.classList.contains("white-available")
//   ) {
//     colorToMove = whiteToMove ? "black" : "white";
//     removeMoveSquares();
//     setNewSquare(square);
//     clearOldSquare();
//     removeHighlightAvailableSquares();
//     moveSquares = [];
//     clickedPiece = {};
//   }
// }

function removeSelectedSquares() {
  squares.forEach((square) => {
    const isOdd = square.classList.contains("odd");
    square.classList.remove(isOdd ? "selected-black" : "selected-white");
  });
}

function setMoveSquares() {
  squares.forEach((square) => {
    const isOdd = square.dataset.squareColor == "odd";
    if (square.dataset.move) {
      square.classList.add(isOdd ? "black-to" : "white-to");
    }
  });
}

function removeMoveSquares() {
  squares.forEach((square) => {
    const isOdd = square.dataset.squareColor == "odd";
    if (square.dataset.move) {
      square.classList.remove(isOdd ? "black-to" : "white-to");
    }
    square.dataset.move = "";
  });
}

function setNewSquare(square) {
  square.classList.add(clickedPiece.color, clickedPiece.piece);
  square.dataset.move = true;
  square.dataset.color = clickedPiece.color;
  square.dataset.piece = clickedPiece.piece;
  if (clickedPiece.piece == "pawn") {
    square.dataset.hasMoved = true;
  }
  square.dataset.occupied = true;
  square.style.setProperty(
    "background-image",
    `url(assets/${clickedPiece.color}-${clickedPiece.piece}.png)`
  );
}

function clearOldSquare() {
  squares.forEach((square) => {
    if (square.id == moveSquares[1]) {
      const isOdd = square.classList.contains("odd");
      square.classList.remove(clickedPiece.color, clickedPiece.piece);
      square.dataset.move = true;
      square.dataset.color = "";
      square.dataset.piece = "";
      square.dataset.occupied = "";
      square.style.setProperty("background-image", "");
      setMoveSquares();
      square.classList.remove(isOdd ? "selected-black" : "selected-white");
    }
  });
}

// Individual Piece Movements and Captures

let captureSquares = [];

function handleCaptureDown(square) {
  const isOdd = square.dataset.squareColor == "odd";
  if (captureSquares.includes(square.id)) {
    square.classList.remove(isOdd ? "black-to" : "white-to");
  }
}

function clearCaptureClass() {
  squares.forEach((square) => {
    const isBlack = square.classList.contains("capture-black");
    square.classList.remove(isBlack ? "capture-black" : "capture-white");
  });
  captureSquares = [];
  setMoveSquares();
}

//! Pawn

// function handlePawnMove() {
//   squares.forEach((square) => {
//     const [file, row] = square.id;
//     const newRow = parseInt(row);
//     checkPawnCapture(square);
//     const moveDirection = clickedPiece.color === "white" ? 1 : -1;

//     if (
//       !clickedPiece.hasMoved &&
//       (newRow === clickedPiece.row + moveDirection ||
//         newRow === clickedPiece.row + 2 * moveDirection)
//     ) {
//       if (file === clickedPiece.file) {
//         availableSquares.push(`${file}${newRow}`);
//         highlightAvailableSquares();
//       }
//     } else if (
//       clickedPiece.hasMoved &&
//       newRow === clickedPiece.row + moveDirection
//     ) {
//       if (file === clickedPiece.file) {
//         availableSquares.push(`${file}${newRow}`);
//         highlightAvailableSquares();
//       }
//     }
//     // }
//   });
// }

// function checkPawnCapture(square) {
//   if (!isEmpty(clickedPiece)) {
//     const fileDiff = square.id.charCodeAt(0) - clickedPiece.file.charCodeAt(0);
//     const rowDiff = square.id.charAt(1) - clickedPiece.row;

//     const isCaptureLeftWhite = fileDiff === -1 && rowDiff === 1;
//     const isCaptureRightWhite = fileDiff === 1 && rowDiff === 1;
//     const isCaptureLeftBlack = fileDiff === -1 && rowDiff === -1;
//     const isCaptureRightBlack = fileDiff === 1 && rowDiff === -1;

//     // Check if the square satisfies capture conditions
//     if (clickedPiece.color == "white") {
//       if (isCaptureLeftWhite || isCaptureRightWhite) {
//         if (
//           square.dataset.piece &&
//           square.dataset.color !== clickedPiece.color
//         ) {
//           captureSquares.push(square.id);
//           handleCaptureDown(square);
//           square.classList.add("capture-black");
//         }
//       }
//     } else if (clickedPiece.color == "black") {
//       if (isCaptureLeftBlack || isCaptureRightBlack) {
//         if (
//           square.dataset.piece &&
//           square.dataset.color !== clickedPiece.color
//         ) {
//           captureSquares.push(square.id);
//           handleCaptureDown(square);
//           square.classList.add("capture-white");
//         }
//       }
//     }
//   }
// }

// Universal Functions for Rest of Pieces

//

//! Rook

function handleRookMove() {
  // const clickedFile = clickedPiece.file.charCodeAt(0);
  // squares.forEach((square) => {
  //   const [file, row] = square.id;
  //   const newRow = parseInt(row);
  //   for(let )
  // });
}

//! Bishop

function handleBishopMove() {}

//! Knight

function handleKnightMove() {}

//! Queen

function handleQueenMove() {}

//! King

function handleKingMove() {}
