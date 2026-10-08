import { updateStoryProgress } from "../components/StoryProgressTracker.js";

export function navigate(page) {
    const app = document.querySelector("#app");
    if (app) {
        app.innerHTML = page();
    }

    if (page && page.name) {
        const stepMap = {
            Login: 0,
            Puzzle1: 1,
            Puzzle2: 2,
            Puzzle3: 3,
            Ending: 4
        };
        const step = stepMap[page.name];
        if (typeof step === "number") {
            updateStoryProgress(step);
        }
    }
}