import {
    playClick,
    playDelete,
    playSuccess,
    playError,
    startBackgroundMusic
} from "./AudioManager";

import { navigate } from "./Router";

import {
    animateButtonPress,
    playWrongAnimation,
    playSuccessAnimation
} from "./AnimationManager";

import { Puzzle1 } from "../pages/Puzzle1";

const SECRET_CODE = "10112005";

let currentCode = [];

export function initLogin() {
    const boxes = document.querySelectorAll(".code-box");
    const numberButtons = document.querySelectorAll("[data-value]");
    const deleteBtn = document.getElementById("delete-btn");
    const enterBtn = document.getElementById("enter-btn");
    const card = document.querySelector(".login-card");

    if (!boxes.length || !enterBtn) return;

    // تنظيف أي تكرار قديم للأزرار لمنع تداخل الأحداث
    numberButtons.forEach(button => {
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);
    });

    const freshNumberButtons = document.querySelectorAll("[data-value]");
    const freshDeleteBtn = document.getElementById("delete-btn");
    const freshEnterBtn = document.getElementById("enter-btn");

    function render() {
        boxes.forEach((box, index) => {
            box.textContent = currentCode[index] || "";
            box.style.color = "#ffffff"; // تثبيت لون النص إجبارياً
        });
    }

    freshNumberButtons.forEach(button => {
        button.addEventListener("click", () => {
            startBackgroundMusic();
            playClick();
            animateButtonPress(button);

            if (currentCode.length >= SECRET_CODE.length) return;

            currentCode.push(button.dataset.value);
            render();
        });
    });

    freshDeleteBtn.addEventListener("click", () => {
        startBackgroundMusic();
        playDelete();
        animateButtonPress(freshDeleteBtn);

        currentCode.pop();
        render();
    });

    freshEnterBtn.addEventListener("click", () => {
        startBackgroundMusic();
        animateButtonPress(freshEnterBtn);

        if (currentCode.length < SECRET_CODE.length) return;

        if (currentCode.join("") === SECRET_CODE) {
            playSuccess();
            playSuccessAnimation(card, boxes);

            setTimeout(() => {
                navigate(Puzzle1);
            }, 900);

        } else {
            playError();
            playWrongAnimation(card, boxes);
            currentCode = [];

            setTimeout(() => {
                render();
            }, 450);
        }
    });

    render();
}