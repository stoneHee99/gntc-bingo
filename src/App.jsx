import {useEffect, useState} from 'react'
import BingoBoard from './BingoBoard.jsx';
import QuizModal from './QuizModal.jsx';
import './App.css'
import bingoTitle from './assets/bingo-title.png';
import Modal from "react-modal";

function App() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [bingoCount, setBingoCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const quizs = [
    { question: '1+1?', answer: '2'},
    { question: '2+2?', answer: '4'},
    { question: '3+3?', answer: '6'},
    { question: '4+4?', answer: '8'},
    { question: '5+5?', answer: '10'},
    { question: '6+6?', answer: '12'},
    { question: '7+7?', answer: '14'},
    { question: '8+8?', answer: '16'},
    { question: '9+9?', answer: '18'},
    { question: '10+10?', answer: '20'},
    { question: '11+11?', answer: '22'},
    { question: '12+12?', answer: '24'},
    { question: '13+13?', answer: '26'},
    { question: '14+14?', answer: '28'},
    { question: '15+15?', answer: '30'},
    { question: '16+16?', answer: '32'},
  ];

  const handleCellClick = (index) => {
    setSelectedCell(index);
  };

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) setCorrectAnswers([...correctAnswers, selectedCell]);
    setSelectedCell(null);
  };

  useEffect(() => {
    const checkBingo = () => {
      const bingoLines = [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11],
          [12, 13, 14, 15],

          [0, 4, 8, 12],
          [1, 5, 9, 13],
          [2, 6, 10, 14],
          [3, 7, 11, 15],

          [0, 5, 10, 15],
          [3, 6, 9, 12]
      ];

      let count = 0;

      for (let line of bingoLines) {
        if (line.every(index => correctAnswers.includes(index))) {
          count++;
        }
      }
      setBingoCount(count);
      if (
          count >= 3) {
        setShowFinalModal(true);
      }
    };

    checkBingo();
  }, [correctAnswers]);

  const closeModal = () => {
    setShowFinalModal(false);
  };

  return (
      <div className="App">
        <div className="title">
          <img src={bingoTitle} />
        </div>
        <div>
        <BingoBoard onCellClick={handleCellClick} correctAnswers={correctAnswers} />
        {selectedCell !== null && (
            <QuizModal
                quiz={quizs[selectedCell]}
                onSubmit={handleAnswerSubmit}
                onRequestClose={() => setSelectedCell(null)}
            />
        )}
        </div>
        <Modal
            isOpen={showFinalModal}
            onRequestClose={closeModal}
            className="final-modal"
            overlayClassName="final-overlay"
        >
          <h2>축하합니다! 3빙고를 달성했습니다!</h2>
          <p>성경 말씀: 내가 너희에게 새 계명을 주노니 서로 사랑하라 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라 (요한복음 13:34)</p>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </div>
  );
}

export default App;
