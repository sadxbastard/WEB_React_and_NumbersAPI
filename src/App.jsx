import "./App.css";
import "./components.css";
import { useState } from 'react';

function App() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonId) => {
    if (activeButton === buttonId){
      setActiveButton(null);
    }
    else setActiveButton(buttonId);
  };

  const handleStartClick = () => {
    if (activeButton === null) {
      const spanElement = document.getElementById('Choose');
      spanElement.classList.add('shake');

      setTimeout(() => {
        spanElement.classList.remove('shake');
      }, 1000);
    }
  };

  return (
    <>
      <link rel="icon" href="data:;base64,="></link>
      <div className="grid-container">
        <div className="column column1">
          <div className="row1">
            <div className="container-row1">
              <span id="Choose" className="text">Choose</span>
              <button className={`btn-quiz ${activeButton === 'btn-quiz1' ? 'clicked' : 'unclicked'}`}
                      onClick={() => handleClick('btn-quiz1')}>
                Trivia
              </button>
              <button className={`btn-quiz ${activeButton === 'btn-quiz2' ? 'clicked' : 'unclicked'}`}
                      onClick={() => handleClick('btn-quiz2')}>
                Math
              </button>
              <button className={`btn-quiz ${activeButton === 'btn-quiz3' ? 'clicked' : 'unclicked'}`}
                      onClick={() => handleClick('btn-quiz3')}>
                Date
              </button>
              <button className={`btn-start ${activeButton === null ? '' : 'clicked'}`}
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
          <div className="content">
            <img src="/svg_quiz.svg" alt='QUIZ'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
