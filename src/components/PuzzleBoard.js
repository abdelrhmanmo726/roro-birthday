import {
    createPuzzle,
    checkWin
} from "../core/PuzzleManager";

import { puzzleSuccessAnimation }
from "../core/PuzzleAnimation";

import { navigate } from "../core/Router.js";
import { Puzzle2 } from "../pages/Puzzle2.js";
import { stopAllAudio } from "../core/AudioManager.js";

let dragged = null;
let selectedPiece = null;
let puzzleCompleted = false;

export function PuzzleBoard(image){
    const pieces = createPuzzle();

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

function handleWin() {
    puzzleCompleted = true;
    if (selectedPiece) {
        selectedPiece.classList.remove("selected-piece");
        selectedPiece = null;
    }
    puzzleSuccessAnimation();
    showSuccessMessage();

    document
    .querySelectorAll(".puzzle-piece")
    .forEach(piece=>{
        piece.draggable = false;
        piece.classList.remove("selected-piece");
    });
}

function swapPieces(nodeA, nodeB) {
    const parent = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    nodeB.parentNode.insertBefore(nodeA, nodeB);
    parent.insertBefore(nodeB, siblingA);
}

export function initPuzzle(){
    puzzleCompleted = false;
    dragged = null;
    selectedPiece = null;

    const pieces = document.querySelectorAll(".puzzle-piece");

    pieces.forEach(piece=>{
        // 1. الدعم باللمس / الضغط للتبديل (Tap to Swap - ممتاز للهواتف والكمبيوتر)
        piece.addEventListener("click", () => {
            if (puzzleCompleted) return;

            if (!selectedPiece) {
                selectedPiece = piece;
                piece.classList.add("selected-piece");
            } else if (selectedPiece === piece) {
                piece.classList.remove("selected-piece");
                selectedPiece = null;
            } else {
                swapPieces(selectedPiece, piece);
                selectedPiece.classList.remove("selected-piece");
                selectedPiece = null;

                if (checkWin()) {
                    handleWin();
                }
            }
        });

        // 2. دعم السحب والإفلات للماوس (Desktop Drag & Drop)
        piece.addEventListener(
        "dragstart",
        ()=>{
            if(puzzleCompleted)
                return;
            if (selectedPiece) {
                selectedPiece.classList.remove("selected-piece");
                selectedPiece = null;
            }
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

            swapPieces(dragged, piece);
            dragged = null;

            if(checkWin()){
                handleWin();
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

    const continueBtn = document.getElementById("continue-btn");
    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            stopAllAudio();
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