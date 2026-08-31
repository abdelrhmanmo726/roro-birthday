let pieces=[];


export function createPuzzle(){


    pieces=[
        0,1,2,
        3,4,5,
        6,7,8
    ];


    shuffle();


    return pieces;

}



function shuffle(){


    pieces.sort(
        ()=>Math.random()-0.5
    );


}



export function checkWin(){


    const current =
    [...document.querySelectorAll(".puzzle-piece")]
    .map(piece=>Number(piece.dataset.id));



    return current.every(
        (value,index)=>value===index
    );


}