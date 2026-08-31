import { gsap } from "gsap";
import confetti from "canvas-confetti";


export function puzzleSuccessAnimation(){


    const pieces =
    document.querySelectorAll(".puzzle-piece");


    const board =
    document.querySelector(".puzzle-board");



    const tl = gsap.timeline();



    tl.to(pieces,{

        scale:1.08,

        duration:.2,

        stagger:.05,

        ease:"back.out"

    })

    .to(pieces,{

        scale:1,

        duration:.2,

        stagger:.05

    })

    .to(board,{

        boxShadow:
        "0 0 50px rgba(255,120,180,.8)",

        duration:.4

    });



    confetti({

        particleCount:150,

        spread:100,

        origin:{
            y:.6
        }

    });


}