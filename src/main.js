import "./style.css";
import { Login } from "./pages/Login.js";
import { navigate } from "./core/Router.js";
import { initStoryProgressTracker } from "./components/StoryProgressTracker.js";
import { initMagicSparkleTrail } from "./components/MagicSparkleTrail.js";
import { initAmbientVinylPlayer } from "./components/AmbientVinylPlayer.js";
import { initFallingRosePetals } from "./components/FallingRosePetals.js";
import { initParallaxGyroscope } from "./components/ParallaxGyroscope.js";
import { initInteractiveConstellation } from "./components/InteractiveConstellation.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (!app) return;

    // Initialize Global Romantic & Interactive Systems
    initStoryProgressTracker();
    initMagicSparkleTrail();
    initAmbientVinylPlayer();
    initFallingRosePetals();
    initParallaxGyroscope();
    initInteractiveConstellation();

    navigate(Login);
});