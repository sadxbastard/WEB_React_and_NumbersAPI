import React from "react";
import "./styles.css";

export const Checkbox = ({checked, onChange, children}) => {
    return (
        <label className="checkbox-wrapper">
            <input type="checkbox"
            checked = {checked}
            onChange={() => onChange((prev) => !prev)}
            className="checkbox-element"/>
            <span>{children}</span>
        </label>
    );
}