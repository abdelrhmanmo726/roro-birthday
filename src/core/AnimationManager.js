import { gsap } from "gsap";
import confetti from "canvas-confetti";

/* ============================
   Login Animation
============================ */

export function animateLogin() {
    const card = document.querySelector(".login-card");
    const boxes = document.querySelectorAll(".code-box");
    const buttons = document.querySelectorAll(".number-pad button");

    if (!card) return;

    const tl = gsap.timeline();

    tl.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
    })
    .from(boxes, {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.35,
        ease: "back.out(1.7)"
    }, "-=0.3")
    .from(buttons, {
        y: 20,
        scale: 0.6,
        opacity: 0,
        stagger: 0.03,
        duration: 0.25,
        ease: "back.out(1.4)",
        clearProps: "all"
    }, "-=0.2");
}



/* ============================
   Button Click Animation
============================ */

export function animateButtonPress(button) {

    gsap.fromTo(

        button,

        {
            scale: 1
        },

        {
            scale: 0.88,
            duration: 0.08,
            repeat: 1,
            yoyo: true,
            ease: "power1.out"
        }

    );

}



/* ============================
   Wrong Password Animation
============================ */

export function playWrongAnimation(card, boxes) {

    const tl = gsap.timeline();

    tl.to(card, {

        x: -10,

        duration: 0.05,

        repeat: 5,

        yoyo: true,

        ease: "power1.inOut"

    })

    .to(boxes, {

        backgroundColor: "#ffd7de",

        borderColor: "#ff4d6d",

        duration: 0.15,

        stagger: 0.03

    }, 0)

    .to(boxes, {

        backgroundColor: "rgba(255,255,255,.12)",

        borderColor: "rgba(255,255,255,.2)",

        duration: 0.2,

        stagger: 0.03

    });

}



/* ============================
   Success Animation
============================ */

export function playSuccessAnimation(card, boxes) {

    const tl = gsap.timeline();

    tl.to(boxes, {

        scale: 1.15,

        duration: 0.2,

        stagger: 0.05,

        ease: "back.out(1.7)"

    })

    .to(boxes, {

        scale: 1,

        duration: 0.2,

        stagger: 0.05

    })

    .to(card, {

        scale: 1.03,

        duration: 0.25

    })

    .add(() => {

        confetti({

            particleCount: 180,

            spread: 90,

            origin: {
                y: 0.6
            }

        });

    })

    .to(card, {

        opacity: 0,

        y: -40,

        duration: 0.5,

        ease: "power2.inOut"

    });

}