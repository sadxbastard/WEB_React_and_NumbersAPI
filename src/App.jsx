import "./App.css";
import "./components.css";
import { useState, useEffect, useRef } from 'react';
import { Checkbox } from "./Checkbox/Checkbox";
import { getQuestion } from "./Servises.jsx";

function App() {
  const [activeQUIZButton, setActiveQUIZButton] = useState(null);
  const [isVisibleImg, setIsVisibleImg] = useState(true);
  const [isActtiveStart, setIsActiveStart] = useState(false);
  const contentImgRef = useRef(null);
  const questionContentRef = useRef(null);

  const [checked, setChecked] = useState(false);
  const [question, setQuestion] = useState("Question");

  const handleQUIZClick = (buttonId) => {
    if (activeQUIZButton === buttonId){
      setActiveQUIZButton(null);
      setIsVisibleImg(true);
    }
    else if (activeQUIZButton !== buttonId && !isActtiveStart){
      setActiveQUIZButton(buttonId);
    }
    // else if (activeQUIZButton !== buttonId && isActtiveStart){
    //   setActiveQUIZButton(buttonId);
    //   setIsVisibleImg(true);
    // }
    else{
      setActiveQUIZButton(buttonId);
      setIsVisibleImg(true);
    }
  };

  const handleStartClick = async () => {
    if (activeQUIZButton === null) {
      const spanElement = document.getElementById('Choose');
      spanElement.classList.add('shake');

      setTimeout(() => {
        spanElement.classList.remove('shake');
      }, 1000);
    }
    else{
      try {
        const questionData = await getQuestion(activeQUIZButton);
        const modifiedText = questionData.text.replace(activeQUIZButton === "date" ? questionData.year : questionData.number, '...');
        setQuestion(modifiedText);
        setIsVisibleImg(false);
        setIsActiveStart(true);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    }
  };

  useEffect(() => {
    if (contentImgRef.current && questionContentRef.current) {
      contentImgRef.current.style.display = isVisibleImg ? 'flex' : 'none';
      questionContentRef.current.style.display = isVisibleImg ? 'none' : 'block'; 
    }
  }, [isVisibleImg]);

  return (
    <>
      <link rel="icon" href="data:;base64,="></link>
      <div className="grid-container">
        <div className="column column1">
          <div className="row1">
            <div className="container-row1">
              <span id="Choose" className="text">Choose</span>
              <button className={`btn-quiz ${activeQUIZButton === 'trivia' ? 'clicked' : 'unclicked'}`}
                      onClick={() => handleQUIZClick('trivia')}>
                Trivia
              </button>
              <button className={`btn-quiz ${activeQUIZButton === 'math' ? 'clicked' : 'unclicked'}`}
                      onClick={() => handleQUIZClick('math')}>
                Math
              </button>
              <button className={`btn-quiz ${activeQUIZButton === 'date' ? 'clicked' : 'unclicked'}`}
                      onClick={() => handleQUIZClick('date')}>
                Date
              </button>
              <button className={`btn-start ${activeQUIZButton === null ? '' : 'clicked'}`}
                      onClick={handleStartClick}>
                Start
              </button>
            </div>
          </div>
          <div className="row2">
            <div className="container-row2">
              <span className="text">Your stats</span>
              <div className="container-stats">
                <span className="text-stats">Correct: 0</span>
                <span className="text-stats">Incorrect: 0</span>
                <span className="text-stats">Hints used: 0</span>
                <span className="text-stats">AVG: 0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="column column2">
          <div className="content-img" ref={contentImgRef}> 
            <img id="img_quiz" src="/svg_quiz.svg" alt='QUIZ'/>
          </div>
          <form className="content-question" ref={questionContentRef}>
            <div className="content-question-paragraph">
              <span className="text">Select an answer</span>
            </div>
            <div className="content-question-text">
              <span>{question}</span>
            </div>
            <div className="content-question-answers">
              <Checkbox checked={checked} onChange={setChecked}>number</Checkbox>
              <Checkbox checked={checked} onChange={setChecked}>number</Checkbox>
              <Checkbox checked={checked} onChange={setChecked}>number</Checkbox>
              <Checkbox checked={checked} onChange={setChecked}>number</Checkbox>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
