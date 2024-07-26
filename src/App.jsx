import "./App.css";
import "./components.css";
import { useState, useEffect, useRef } from 'react';
import { Checkbox } from "./Checkbox/Checkbox";
import { getQuestion } from "./Servises.jsx";
import "./Checkbox/styles.css";

export default function App() {
  const [activeQUIZButton, setActiveQUIZButton] = useState(null);
  const [isVisibleImg, setIsVisibleImg] = useState(true);
  const [isActtiveStart, setIsActiveStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState(0);

  const [question, setQuestion] = useState("Question");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isCheckedAnswer, setisCheckedAnswer] = useState(false);
  const [resultText, setResultText] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

    const handleQUIZClick = (buttonId) => {
      setIsLoading(false);
      if (activeQUIZButton === buttonId){
        setActiveQUIZButton(null);
        setIsVisibleImg(true);
        setIsActiveStart(false);
      }
      else if (activeQUIZButton !== buttonId && !isActtiveStart){
        setActiveQUIZButton(buttonId);
      }
      else{
        setIsActiveStart(false);
        setIsVisibleImg(true);
        setActiveQUIZButton(buttonId);
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
    else if (activeQUIZButton !== null){
      await doInitialStateAndHandleRequest();
    }
  };

  const handleContinueClick = () => {
    doInitialStateAndHandleRequest();
  }

  async function doInitialStateAndHandleRequest() {
    setIsActiveStart(true);
    setIsVisibleImg(false);
    setIsLoading(true);
    
    setisCheckedAnswer(false);
    setSelectedCheckbox(null);
    setQuestion("Question");
    setAnswers([]);
    setCorrectAnswer(null);
    setResultText('');
    try {
      const questionData = await getQuestion(activeQUIZButton);
      const modifiedText = questionData.text.replace(activeQUIZButton === "date" ?
                            questionData.year : questionData.number, '...');
      setQuestion(modifiedText);

      const correctAnswer = activeQUIZButton === "date" ? questionData.year : questionData.number;
      setCorrectAnswer(correctAnswer);

      setAnswers(generateAnswers(correctAnswer));
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  const handleCheckClick = () => {
    if (selectedCheckbox === null) {
      const spanElement = document.getElementById('select');
      spanElement.classList.add('shake');

      setTimeout(() => {
        spanElement.classList.remove('shake');
      }, 1000);
    }
    else{
      setisCheckedAnswer(true);
      if(correctAnswer === selectedCheckbox){
        setIsCorrectAnswer(true);
        setResultText('Your answer is correct.');
      }
      else {
        setIsCorrectAnswer(false);
        setResultText("Your answer is incorrect.");
      }
    }
  };

  const generateAnswers = (correctAnswer) => {
    const incorrectAnswers = new Set(); // created set, so that there are no duplicate values
    while (incorrectAnswers.size < 3) {
      const randomOffset = Math.floor(Math.random() * 10) + 1; // generate from 1 to 10
      const incorrectAnswer = Math.random() > 0.5 // randomly determine the wrong answers
        ? correctAnswer + randomOffset
        : correctAnswer - randomOffset;
      incorrectAnswers.add(incorrectAnswer);
    }
    const answersArray = [...incorrectAnswers]; // converting a set into an array
    const randomIndex = Math.floor(Math.random() * 4); // define a random position for the correct answer
    answersArray.splice(randomIndex, 0, correctAnswer); // insert the correct answer into the array at the specified position
    return answersArray;
  };

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots(prev => (prev + 1) % 4);
      }, 200);
    } else {
      setLoadingDots(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
              <button className={`btn-start ${activeQUIZButton === null ? '' : 'ready'}`}
                      onClick={handleStartClick}
                      disabled={isActtiveStart}>
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
          <div className="content-preloader" style={{display: isLoading ? 'flex' : 'none'}}>
            <span className="preloader">Loading{".".repeat(loadingDots)}</span>
          </div>
          <div className="content-img" style={{ display: isVisibleImg ? 'flex' : 'none' }}> 
            <img id="img_quiz" src="/svg_quiz.svg" alt='QUIZ'/>
          </div>
          <div className="content-question" style={{display: isVisibleImg || isLoading ? 'none' : 'block'}}>
            <div className="content-question-paragraph">
              <span className="text" id="select">Select an answer</span>
            </div>
            <div className="content-question-text">
              <span>{question}</span>
            </div>
            <div className="content-question-answers">
              {answers.map((answer, index) => (
                  <Checkbox key={index}
                  setSelectedCheckbox={setSelectedCheckbox}
                  isCheckedAnswer={isCheckedAnswer}
                  isCorrectAnswer={isCorrectAnswer}
                  answer={answer}
                  correctAnswer={correctAnswer}
                  selected={selectedCheckbox === answer}>{answer}</Checkbox>
                ))}
            </div>
            {!isCheckedAnswer && <div className="content-buttons">
              <button className={`check-btn ${selectedCheckbox === null ? '' : 'ready'}`}
                      onClick={handleCheckClick}
                      id="check">
                Check
              </button>
              <button className="remove-answer-btn"
                      id="remove">Remove one</button>
            </div>}
            {isCheckedAnswer && 
            <div className="content-result">
              <span className="result-text">{resultText}</span>
              <button className="btn-continue"
                      onClick={handleContinueClick}>Continue</button>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}
