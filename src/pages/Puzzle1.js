import { PuzzleBoard, initPuzzle } from "../components/PuzzleBoard";
import { HeartBackground } from "../components/HeartBackground";
import birthdayImage from "../assets/images/birthday.jpg";

export function Puzzle1(){
    setTimeout(()=>{
        initPuzzle();
    },0);

    return `
<section class="puzzle-screen">
    ${HeartBackground()}

    <h1>
        My Sweet Cake ❤️
    </h1>

    <p>
        Arrange the puzzle pieces to bring My Sweet Cake to life
        <br><small style="opacity: 0.8; font-size: 14px;">(Drag or tap two pieces to swap)</small>
    </p>

    <div class="puzzle-layout">
        <div class="puzzle-container">
            ${PuzzleBoard(birthdayImage)}
        </div>
    </div>
</section>
    `;
}