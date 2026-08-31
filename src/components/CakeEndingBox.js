import defaultPhoto from "../assets/images/roro.jpg";
import cardImage from "../assets/images/card.png";

function sanitizeImageUrl(url) {
    if (!url || typeof url !== "string") return defaultPhoto;
    try {
        const parsed = new URL(url, window.location.origin);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return parsed.href;
        }
        return defaultPhoto;
    } catch {
        return defaultPhoto;
    }
}

export function CakeEndingBox(photoSrc) {
    const safePhoto = sanitizeImageUrl(photoSrc);
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const bowRibbonSvg = `
        <svg class="bow-svg" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20C20 10 5 12 10 25C15 35 28 23 30 20Z" fill="#E9C46A"/>
            <path d="M30 20C40 10 55 12 50 25C45 35 32 23 30 20Z" fill="#E9C46A"/>
            <circle cx="30" cy="20" r="5" fill="#D85C8A"/>
        </svg>
    `;

    return `
        <section class="memory-box-stage" data-element="stage-root" aria-label="Dreamy Birthday Memory Box" role="region">
            <canvas data-element="stars-canvas" class="memory-box-stage__canvas" aria-hidden="true"></canvas>
            
            <div class="memory-box-stage__vignette" aria-hidden="true"></div>

            <main class="memory-box-stage__content">
                <!-- 1. HERO GIFT BOX SECTION -->
                <button 
                    data-element="gift-wrapper" 
                    type="button"
                    class="gift-box-container gift-box-container--hidden" 
                    aria-label="Open your birthday gift"
                >
                    <div class="dreamy-gift">
                        <div class="dreamy-gift__glow" aria-hidden="true"></div>
                        <div data-element="gift-lid" class="dreamy-gift__lid">
                            <span class="dreamy-gift__bow">${bowRibbonSvg}</span>
                        </div>
                        <div class="dreamy-gift__body"></div>
                        <div class="dreamy-gift__shadow" aria-hidden="true"></div>
                    </div>
                    <span class="dreamy-gift__title">A Little Surprise For You</span>
                    <span class="dreamy-gift__hint">Click the Gift</span>
                </button>

                <!-- 2. CELEBRATION STAGE -->
                <div data-element="celebration-stage" class="celebration-stage celebration-stage--hidden">
                    <section data-element="cake-section" class="cake-stage cake-stage--hidden" aria-label="Birthday Cake">
                        <div data-element="cake-wrapper" class="dreamy-cake">
                            <div class="candle">
                                <div data-element="candle-flame" class="candle__flame" aria-hidden="true">
                                    <div class="candle__flame-core"></div>
                                </div>
                                <div data-element="candle-glow" class="candle__glow" aria-hidden="true"></div>
                                <div class="candle__wick"></div>
                                <div class="candle__body"></div>
                                <div data-element="candle-smoke" class="candle__smoke" aria-hidden="true"></div>
                            </div>

                            <div class="dreamy-cake__layer dreamy-cake__layer--top">
                                <div class="dreamy-cake__cream"></div>
                            </div>
                            <div class="dreamy-cake__layer dreamy-cake__layer--middle">
                                <div class="dreamy-cake__cream"></div>
                            </div>
                            <div class="dreamy-cake__layer dreamy-cake__layer--bottom">
                                <div class="dreamy-cake__cream"></div>
                            </div>
                            <div class="dreamy-cake__plate"></div>
                        </div>

                        <div class="cake-stage__controls">
                            <p data-element="blow-instruction" class="cake-stage__instruction" aria-live="polite">
                                Make a Wish... Blow the Candle
                            </p>
                            <button 
                                data-element="start-mic-btn" 
                                type="button" 
                                class="romantic-btn mic-hidden" 
                                aria-label="Activate microphone to blow out the candle"
                            >
                                Blow the Candle
                            </button>
                        </div>
                    </section>

                    <article data-element="birthday-card" class="polaroid-card polaroid-card--hidden" aria-label="Roro Polaroid Memory Photo">
                        <div class="polaroid-card__tape" aria-hidden="true"></div>
                        <div class="polaroid-card__frame">
                            <figure class="polaroid-card__photo-container">
                                <img 
                                    src="${safePhoto}" 
                                    class="polaroid-card__photo" 
                                    alt="Roro Photo" 
                                    loading="lazy" 
                                    decoding="async"
                                />
                            </figure>

                            <div class="polaroid-card__caption">
                                <h2 class="polaroid-card__title">Happy Birthday</h2>
                                <h3 class="polaroid-card__subtitle">Roro ❤️</h3>
                                <p class="polaroid-card__text">
                                    Every moment with you feels like magic.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <!-- 3. CINEMATIC ENDING STAGE -->
            <div data-element="cinematic-ending" class="cinematic-ending-stage">
                <article class="cinematic-letter-card">
                    <img src="${cardImage}" class="cinematic-letter-card__paper" alt="Birthday Letter Card" />
                    
                    <div class="cinematic-letter-card__content-overlay">
                        <div class="cinematic-letter-card__header">
                            <time class="cinematic-letter-card__date">${currentDate}</time>
                        </div>
                        
                        <div class="cinematic-letter-card__title-wrapper">
                            <h2 class="cinematic-letter-card__title"></h2>
                        </div>

                        <div class="cinematic-letter-card__body-scroll-container">
                            <div class="cinematic-letter-card__body"></div>
                        </div>

                        <div class="cinematic-letter-card__footer">
                            <div class="cinematic-letter-card__signature">Abdelrhman</div>
                            <button type="button" class="next-memory-btn" data-element="next-memory-btn">
                                ↻ Restart Experience
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <div data-element="gift-flash" class="memory-box-stage__flash memory-box-stage__flash--hidden" aria-hidden="true"></div>
        </section>
    `;
}