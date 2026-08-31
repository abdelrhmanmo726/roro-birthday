export function ProposalBox(image) {
    return `
        <div class="hud-box vital-hud">
            <div class="hud-header">
                <span class="hud-dot"></span> VITAL MONITOR
            </div>
            <div class="bpm-display">
                <span id="bpm-value">72</span> <small>BPM</small>
            </div>
            <div class="ecg-graph">
                <div class="ecg-line" id="ecg-line"></div>
            </div>
        </div>

        <div class="hud-box stats-hud">
            <div class="hud-header">
                <span class="hud-dot"></span> TARGET REFLEX
            </div>
            <div class="stat-item">
                <span>REACTION TIME</span>
                <strong id="stat-reaction">0.00s</strong>
            </div>
            <div class="stat-item">
                <span>ESCAPE SPEED</span>
                <strong id="stat-speed">Mach 0.0</strong>
            </div>
            <div class="stat-item">
                <span>FAILED ATTEMPTS</span>
                <strong id="stat-attempts">0</strong>
            </div>
        </div>

        <div class="proposal-container">
            <img
                src="${image}"
                class="proposal-image"
                alt="Spider Kid"
            />

            <div class="target-name">Roro </div>

            <h1 id="proposal-title" class="proposal-title"></h1>

            <p
                id="proposal-message"
                class="proposal-message"
            ></p>

            <div class="proposal-buttons">
                <button
                    id="yes-btn"
                    class="yes-btn"
                >
                    YES ❤️
                </button>

                <button
                    id="no-btn"
                    class="no-btn"
                >
                    NO 
                </button>
            </div>
        </div>
    `;
}