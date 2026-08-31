import { Heart } from "./icons/Heart";
import { Sparkle } from "./icons/Sparkle";

export function FloatingBackground() {

    const items = [];

    for (let i = 0; i < 30; i++){

        const type = Math.random() > 0.5
            ? Heart()
            : Sparkle();

        const left = Math.random() * 100;

        const delay = Math.random() * 12;

        const duration = 18 + Math.random() * 12;
        const size = 12 + Math.random() * 30;
        items.push(`

            <div
                class="floating-item"
                style="
                    left:${left}%;
                    animation-delay:${delay}s;
                    animation-duration:${duration}s;
                    width:${size}px;
                    height:${size}px;
                "
            >

                ${type}

            </div>

        `);

    }

    return `

        <div class="floating-background">

            ${items.join("")}

        </div>

    `;

}