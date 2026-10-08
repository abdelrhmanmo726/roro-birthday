import { updateStoryProgress } from "../components/StoryProgressTracker.js";

const STEP_MAP = {
    Login: 0,
    Puzzle1: 1,
    Puzzle2: 2,
    Puzzle3: 3,
    Ending: 4
};

let registeredPages = [];

export function registerPages(pages) {
    if (Array.isArray(pages)) {
        registeredPages = pages;
    }
}

export function getStepForPage(page) {
    if (!page) return null;

    // 1. Explicit step on function object (immune to bundler/minifier renaming)
    if (typeof page.step === "number") {
        return page.step;
    }

    // 2. Direct reference in registered pages array
    if (registeredPages.length > 0) {
        const idx = registeredPages.indexOf(page);
        if (idx !== -1) return idx;
    }

    // 3. Custom pageId property
    if (page.pageId && typeof STEP_MAP[page.pageId] === "number") {
        return STEP_MAP[page.pageId];
    }

    // 4. Function name fallback (dev mode)
    if (page.name && typeof STEP_MAP[page.name] === "number") {
        return STEP_MAP[page.name];
    }

    return null;
}

export function navigate(page, explicitStep) {
    const app = document.querySelector("#app");
    if (app && typeof page === "function") {
        app.innerHTML = page();
    }

    const step = typeof explicitStep === "number" ? explicitStep : getStepForPage(page);

    if (typeof step === "number") {
        updateStoryProgress(step);
    }
}