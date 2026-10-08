let pieces = [];

export function createPuzzle() {
    pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    shuffle();
    return pieces;
}

function shuffle() {
    do {
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }
    } while (pieces.every((val, idx) => val === idx));
}

export function checkWin() {
    const current = [...document.querySelectorAll(".puzzle-piece")]
        .map(piece => Number(piece.dataset.id));

    return current.every((value, index) => value === index);
}