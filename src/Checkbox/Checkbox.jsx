import "./styles.css";

export const Checkbox = ({
    setSelectedCheckbox, 
    children, 
    isCheckedAnswer, 
    isCorrectAnswer, 
    answer, 
    correctAnswer,
    selected,
    removedAnswer}) => {

    const handleCheckboxChange = () => {
        if (selected){
            setSelectedCheckbox(null);
        }
        else setSelectedCheckbox(children);
    };

    let backgroundColor = "";
    if (isCheckedAnswer) {
        if (selected) {
            backgroundColor = isCorrectAnswer ? "green" : "red";
        } else if (answer === correctAnswer) {
            backgroundColor = "green";
        }
    }
    if (removedAnswer !== null && removedAnswer === children){
        backgroundColor = "red";
    }

    

    return (
        <label className="checkbox-wrapper">
            <input type="checkbox"
            checked={selected}
            onChange={handleCheckboxChange}
            disabled={isCheckedAnswer || (removedAnswer !== null && removedAnswer === children)}
            className="checkbox-element"
            style={{backgroundColor}}/>
            <span>{children}</span>
        </label>
    );
}