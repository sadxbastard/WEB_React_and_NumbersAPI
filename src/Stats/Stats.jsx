import "../App.css";
import { useState } from 'react';

export const Stats = ({
    statsCorrect,
    statsIncorrect,
    statsHints,
    statsAVG
}) => {
    return (
        <>
        <span className="text">Your stats</span>
        <div className="container-stats">
            <span className="text-stats">Correct: {statsCorrect}</span>
            <span className="text-stats">Incorrect: {statsIncorrect}</span>
            <span className="text-stats">Hints used: {statsHints}</span>
            <span className="text-stats">AVG: {statsAVG}%</span>
        </div>
        </>
    );
}

