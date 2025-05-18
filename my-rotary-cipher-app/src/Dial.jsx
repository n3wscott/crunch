// src/Dial.jsx
import React from 'react';
import './Dial.css'; // We'll create this CSS file next

const Dial = ({label, color, value, onChange}) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const currentIndex = alphabet.indexOf(value);

    const increment = () => {
        const nextIndex = (currentIndex + 1) % 26;
        onChange(alphabet[nextIndex]);
    };

    const decrement = () => {
        const prevIndex = (currentIndex - 1 + 26) % 26;
        onChange(alphabet[prevIndex]);
    };

    // Basic animation state could be added here later
    // For now, we focus on structure and basic style

    return (
        <div className={`dial-container dial-${color}`}>
            <div className="dial-label">{label}</div>
            <div className="dial-control">
                <button
                    onClick={decrement}
                    className="dial-button prev-button"
                    aria-label={`Previous ${label} letter`}
                >
                    ‹
                </button>
                <div className="dial-value-display" aria-live="polite" aria-atomic="true">
                    {/* The letter itself, could be wrapped for animation */}
                    <span className="dial-letter">{value.toUpperCase()}</span>
                </div>
                <button
                    onClick={increment}
                    className="dial-button next-button"
                    aria-label={`Next ${label} letter`}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default Dial;
