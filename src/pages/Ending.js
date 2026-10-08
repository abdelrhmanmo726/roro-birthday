import { CakeEndingBox } from "../components/CakeEndingBox.js";
import { initCakeEndingManager } from "../core/CakeEndingManager.js";
import "../styles/cakeEnding.css";

import roroPhoto from "../assets/images/roro.jpg";

export function Ending() {
    setTimeout(() => {
        initCakeEndingManager();
    }, 100);

    return CakeEndingBox(roroPhoto);
}