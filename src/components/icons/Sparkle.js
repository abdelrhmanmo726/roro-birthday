export function Sparkle(className = "") {
    return `
        <svg
            class="floating-icon sparkle ${className}"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2z"
                fill="currentColor"
            />
        </svg>
    `;
}