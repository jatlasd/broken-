export function handleHighlightSelectedSquare(square) {
  const isSelectedBlack = square.classList.contains("black-selected");
  const isSelectedWhite = square.classList.contains("white-selected");
  const isBlack = square.dataset.squareColor == "black";
  if (square.dataset.occupied) {
      square.classList.add(isBlack ? "black-selected" : "white-selected");
    }
    if (isSelectedBlack || isSelectedWhite) {
      square.classList.remove(isBlack ? "black-selected" : "white-selected");
    }
}

