import React from "react";
import "./styles.css";

export const Checkbox = ({selectedCheckbox, setSelectedCheckbox, children}) => {
    const handleCheckboxChange = () => {
        if (selectedCheckbox === children){
            setSelectedCheckbox(null);
        }
        else setSelectedCheckbox(children);
    };
    return (
        <label className="checkbox-wrapper">
            <input type="checkbox"
            checked={selectedCheckbox === children}
            onChange={handleCheckboxChange}
            className="checkbox-element"/>
            <span>{children}</span>
        </label>
    );
}