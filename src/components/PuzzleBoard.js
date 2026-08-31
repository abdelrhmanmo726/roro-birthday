import {
    createPuzzle,
    checkWin
} from "../core/PuzzleManager";

import { puzzleSuccessAnimation }
from "../core/PuzzleAnimation";

import { navigate } from "../core/Router.js";
import { Puzzle2 } from "../pages/Puzzle2.js";

let dragged = null;
let puzzleCompleted = false;

export function PuzzleBoard(image){
    const pieces = createPuzzle();

    setTimeout(()=>{
        initPuzzle();
    },0);

    return `
    <div class="puzzle-board">
    ${
        pieces.map((piece)=>{
            return `
            <div
                class="puzzle-piece"
                draggable="true"
                data-id="${piece}"
                style="
                    background-image:url('${image}');
                    background-position:${getPosition(piece)};
                "
            >
            </div>
            `;
        }).join("")
    }
    </div>
    `;
}

export function initPuzzle(){
    const pieces = document.querySelectorAll(".puzzle-piece");

    pieces.forEach(piece=>{
        piece.addEventListener(
        "dragstart",
        ()=>{
            if(puzzleCompleted)
                return;
            dragged = piece;
            piece.style.opacity="0.5";
        });

        piece.addEventListener(
        "dragend",
        ()=>{
            piece.style.opacity="1";
        });

        piece.addEventListener(
        "dragover",
        (e)=>{
            e.preventDefault();
        });

        piece.addEventListener(
        "drop",
        ()=>{
            if(puzzleCompleted)
                return;

            if(!dragged || dragged === piece)
                return;

            const parent = piece.parentNode;
            const children = [...parent.children];
            const draggedIndex = children.indexOf(dragged);
            const targetIndex = children.indexOf(piece);

            if(draggedIndex < targetIndex){
                parent.insertBefore(
                    dragged,
                    piece.nextSibling
                );
            }
            else{
                parent.insertBefore(
                    dragged,
                    piece
                );
            }

            dragged=null;

            if(checkWin()){
                puzzleCompleted=true;
                puzzleSuccessAnimation();
                showSuccessMessage();

                document
                .querySelectorAll(".puzzle-piece")
                .forEach(piece=>{
                    piece.draggable=false;
                });
            }
        });
    });
}

function showSuccessMessage(){
    if(document.querySelector(".puzzle-success"))
        return;

    const message = document.createElement("div");
    message.className="puzzle-success";

    message.innerHTML = `
    <div class="card-cover"></div>
    <div class="card-content">
        <h2>
            🎂 Happy Birthday ❤️
        </h2>
        <p>
            A small surprise for someone special ✨
            <br><br>
            May your day be filled with happiness,
            <br>
            love, and endless smiles 💖
        </p>
        <button id="continue-btn" type="button">
            Continue
        </button>
    </div>
    `;

    const layout = document.querySelector(".puzzle-layout");
    if (layout) {
        layout.appendChild(message);
        layout.classList.add("completed");
    }

    const container = document.querySelector(".puzzle-container");
    if (container) {
        container.classList.add("completed");
    }

    // ربط زر Continue بإيقاف الأغنية والانتقال لصفحة Puzzle2 باستخدام الراوتر
    const continueBtn = document.getElementById("continue-btn");
    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            // إيقاف أي صوت أو أغنية شغالة في الصفحة
            document.querySelectorAll("audio").forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });

            // الانتقال للبازل الثاني
            navigate(Puzzle2);
        });
    }
}

function getPosition(index){
    const positions=[
        "0% 0%",
        "50% 0%",
        "100% 0%",
        "0% 50%",
        "50% 50%",
        "100% 50%",
        "0% 100%",
        "50% 100%",
        "100% 100%"
    ];
    return positions[index];
}