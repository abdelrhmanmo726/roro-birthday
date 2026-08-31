import { gsap } from "gsap";

import clickSound from "../assets/sounds/click.mp3";
import deleteSound from "../assets/sounds/delete.mp3";
import successSound from "../assets/sounds/success.mp3";
import errorSound from "../assets/sounds/error.mp3";

import backgroundMusic from "../assets/sounds/happy_birthday.mp3";

const sounds = {
    click: new Audio(clickSound),
    delete: new Audio(deleteSound),
    success: new Audio(successSound),
    error: new Audio(errorSound)
};

const bgMusic = new Audio(backgroundMusic);

bgMusic.loop = true;
bgMusic.volume = 0;

sounds.click.volume = 0.4;
sounds.delete.volume = 0.45;
sounds.success.volume = 0.6;
sounds.error.volume = 0.6;

function play(audio) {

    audio.pause();

    audio.currentTime = 0;

    audio.play().catch(error => {

        console.warn(error);

    });

}

export function playClick() {

    play(sounds.click);

}

export function playDelete() {

    play(sounds.delete);

}

export function playSuccess() {

    play(sounds.success);

}

export function playError() {

    play(sounds.error);

}

let musicStarted = false;

export function startBackgroundMusic() {

    if (musicStarted) return;

    musicStarted = true;

    bgMusic.play().catch(() => {});

    gsap.to(bgMusic, {

        volume: 0.12,

        duration: 2,

        ease: "power2.out"

    });

}