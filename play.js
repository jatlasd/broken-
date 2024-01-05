squares.forEach(square => {
    square.addEventListener('click', () => {
        assignClickedPiece(square)
        handlePieceClick(event)
        // 
        movePiece()
    })
})



function movePiece() {
    squares.forEach(square => {
        square.addEventListener('click', handleClick);
    });
}

function handleClick(e) {
    const square = e.target;
    if(square.dataset.occupied) {
        handlePieceClick(e)
        square.dataset.move = true
        console.log(moveSquares);
    
        if (square.classList.contains('black-available') || square.classList.contains('white-available')) {
            removeMoveSquares()
            setNewSquare(square);
            clearOldSquare();
            removeHighlightAvailableSquares();
            moveSquares = []
            clickedPiece = {}
        }
    }
}

function handlePieceClick(e) {
    const target = e.target;
    const isSelectedBlack = target.classList.contains('selected-black');
    const isSelectedWhite = target.classList.contains('selected-white');
    const isOdd = target.classList.contains('odd');
    
        if (!isSelectedBlack && !isSelectedWhite) {
            target.classList.add(isOdd ? 'selected-black' : 'selected-white');
            moveSquares.push(target.id)
            switch(target.dataset.piece) {
                case 'pawn':
                    return handlePawnMove();
                case 'rook':
                    return handleRookMove();
                case 'knight':
                    return handleKnightMove();
                case 'bishop':
                    return handleBishopMove();
                case 'king':
                    return handleKingMove();
                case 'queen':
                    return handleQueenMove()
                }
            } else if (isSelectedBlack || isSelectedWhite) {
                clickedPiece = {};
                moveSquares = []
                removeSelectedSquares()
                removeHighlightAvailableSquares();
                if(target.dataset.move) {
                    target.dataset.move = ''
                }
                clearCaptureClass()
            }
    }