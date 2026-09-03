import gsap from "gsap";
import eyesImage from "../assets/images/eyes.jpg";

export function createCinematicTransition(onComplete) {
    const overlay = document.createElement("div");
    overlay.className = "cinematic-eyes-overlay";

    overlay.innerHTML = `
        <div class="cinematic-backdrop"></div>

        <div class="cinematic-image-container">
            <img
                src="${eyesImage}"
                alt="Eyes"
                class="cinematic-eyes-img"
            />

            <div class="light-sweep-effect"></div>
        </div>

        <div class="cinematic-vignette"></div>

        <div class="cinematic-grain"></div>

        <div class="cinematic-text-stage">
            <h2 class="cinematic-text-line"></h2>
        </div>
    `;

    document.body.appendChild(overlay);

    const textEl = overlay.querySelector(".cinematic-text-line");
    const imgEl = overlay.querySelector(".cinematic-eyes-img");
    const lightSweep = overlay.querySelector(".light-sweep-effect");

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(overlay, { opacity: 0 });
    gsap.set(imgEl, { opacity: 0, scale: 0.7, filter: "blur(16px)" });
    gsap.set(textEl, { opacity: 0, y: 18 });
    gsap.set(lightSweep, { x: "-120%", opacity: 0 });

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.55,
                ease: "power2.inOut",
                onComplete: () => {
                    overlay.remove();
                    if (onComplete) onComplete();
                }
            });
        }
    });

    if (prefersReducedMotion) {
        tl.to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" })
          .add(() => {
              textEl.textContent = "I find myself getting lost in your eyes.";
          })
          .to(imgEl, {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out"
          })
          .to(textEl, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
          })
          .to(textEl, {
              opacity: 0,
              duration: 0.5,
              delay: 1.2
          })
          .to(imgEl, {
              opacity: 0,
              duration: 0.7,
              ease: "power2.inOut"
          });

        return;
    }

    tl.to(overlay, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
    })

      .add(() => {
          textEl.textContent = "You know in the end...";
      }, "+=0.25")
      .to(textEl, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out"
      })
      .to(textEl, {
          opacity: 0,
          y: -4,
          duration: 0.45,
          delay: 0.8,
          ease: "power2.in"
      })

      .add(() => {
          textEl.textContent = "There's one little truth I keep with me.";
      }, "+=0.2")
      .to(textEl, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out"
      })
      .to(textEl, {
          opacity: 0,
          y: -4,
          duration: 0.45,
          delay: 0.95,
          ease: "power2.in"
      })

      .add(() => {
          textEl.textContent = "Every time we talk...";
      }, "+=0.2")
      .to(textEl, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out"
      })
      .to(imgEl, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.65,
          ease: "power2.out"
      }, "-=0.45")
      .to(textEl, {
          opacity: 0,
          y: -4,
          duration: 0.45,
          delay: 0.45,
          ease: "power2.in"
      })

      .to(imgEl, {
          scale: 0.85,
          xPercent: -0.2,
          yPercent: 0.1,
          duration: 1.25,
          ease: "power1.inOut"
      })
      .to(imgEl, {
          scale: 0.95,
          xPercent: 0.2,
          yPercent: -0.1,
          duration: 2.25,
          ease: "power1.inOut"
      }, "<")

      .to(lightSweep, {
          x: "180%",
          opacity: 0.48,
          duration: 1.35,
          ease: "power1.inOut"
      }, "-=1.8")
      .to(lightSweep, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in"
      }, "-=0.2")

      .add(() => {
          textEl.textContent = "I find myself getting lost in your eyes.";
      })
      .to(textEl, {
          opacity: 1,
          y: -4,
          duration: 0.75,
          ease: "power2.out"
      })
      .to(textEl, {
          opacity: 0,
          y: -8,
          duration: 0.5,
          delay: 1.15,
          ease: "power2.in"
      })

      .add(() => {
          textEl.textContent = "They just... stay with me, always.";
      })
      .to(textEl, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out"
      })
      .to(textEl, {
          opacity: 0,
          y: -5,
          duration: 0.65,
          delay: 1.25,
          ease: "power2.in"
      })

      .to(imgEl, {
          opacity: 0,
          scale: 0.98,
          duration: 1.05,
          ease: "power2.inOut"
      })
      .to(overlay, {
          backgroundColor: "#000000",
          duration: 0.45,
          ease: "power2.inOut"
      }, "-=0.45");
}