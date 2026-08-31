export function Heart(className = "") {
    return `
        <svg
            class="floating-icon heart ${className}"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12 21s-7-4.6-9.5-9C.7 8.6 2.5 5 6 5c2.1 0 3.4 1.3 4 2.4C10.6 6.3 11.9 5 14 5c3.5 0 5.3 3.6 3.5 7-2.5 4.4-9.5 9-9.5 9z"
                fill="currentColor"
            />
        </svg>
    `;
}