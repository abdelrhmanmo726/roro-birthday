import "../styles/realPuzzle.css";
import graduationImage from "../assets/images/graduation.jpg";
import confetti from "canvas-confetti";
import { RealPuzzle } from "../components/RealPuzzleBoard";
import { initRealPuzzle } from "../core/RealPuzzleManager";
import { navigate } from "../core/Router.js";
import { Puzzle3 } from "../pages/Puzzle3.js";
import { stopAllAudio } from "../core/AudioManager.js";

export function Puzzle2() {
  setTimeout(() => {
    initRealPuzzle(graduationImage, () => {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    });

    const nextBtn = document.querySelector(".next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        stopAllAudio();
        navigate(Puzzle3);
      });
    }
  }, 50);

  return `
    <section class="real-puzzle-screen">
      <h1>🧩 One More Memory</h1>
      <p>Put the pieces together ❤️</p>

      <div class="real-puzzle-layout">
        ${RealPuzzle()}

        <div class="real-card-success">
          <div class="card-cover">
            <span class="cover-heart">💖</span>
            <span class="cover-text">Open Me ✨</span>
          </div>

          <div class="card-content">
            <div class="animated-cake">🎂</div>
            <h2>Happy Birthday! ✨</h2>
            <p>I hope our final university year is filled with happiness, success, unforgettable memories, and so many moments worth celebrating.

And most importantly...
I hope we'll stand together on graduation day. 🎓✨</p>

            <button class="next-btn" type="button">Continue</button>
          </div>
        </div>
      </div>
    </section>
  `;
}