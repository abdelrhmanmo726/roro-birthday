import "./style.css";
import { Login } from "./pages/Login.js";
import { Puzzle1 } from "./pages/Puzzle1.js";
import { Puzzle2 } from "./pages/Puzzle2.js";
import { Puzzle3 } from "./pages/Puzzle3.js";
import { Ending } from "./pages/Ending.js";
import { navigate, registerPages } from "./core/Router.js";
import { initStoryProgressTracker } from "./components/StoryProgressTracker.js";
import { initMagicSparkleTrail } from "./components/MagicSparkleTrail.js";
import { initAmbientVinylPlayer } from "./components/AmbientVinylPlayer.js";
import { initFallingRosePetals } from "./components/FallingRosePetals.js";
import { initParallaxGyroscope } from "./components/ParallaxGyroscope.js";
import { initInteractiveConstellation } from "./components/InteractiveConstellation.js";

const ALL_PAGES = [Login, Puzzle1, Puzzle2, Puzzle3, Ending];

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (!app) return;

    // Register pages for rock-solid step mapping in router
    registerPages(ALL_PAGES);

    // Initialize Global Romantic & Interactive Systems
    initStoryProgressTracker();
    initMagicSparkleTrail();
    initAmbientVinylPlayer();
    initFallingRosePetals();
    initParallaxGyroscope();
    initInteractiveConstellation();

    navigate(Login);
});