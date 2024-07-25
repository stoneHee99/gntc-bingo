import React, { useState } from 'react';
import Modal from 'react-modal';
import './QuizModal.css';

const QuizModal = ({ quiz, onSubmit, onRequestClose }) => {
  const [answer, setAnswer] = useState('');
  const [isIncorrect, setIsIncorrect] = useState(false);

  const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();

  const handleSubmit = () => {
    if (normalize(answer) === normalize(quiz.answer)) {
      onSubmit(true);
    } else {
      setIsIncorrect(true);
    }
  };

  return (
      <Modal isOpen={true} onRequestClose={onRequestClose} className="Modal" overlayClassName="Overlay" closeTimeoutMS={300} contentLabel="Quiz Modal">
        <button className="close-button" onClick={onRequestClose}>X</button>
        {quiz.image && <img src={quiz.image} alt="quiz" className="quiz-image" />}
        <h2>{quiz.question}</h2>
        <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        {isIncorrect && <p className="error">올바른 답이 아닙니다! 다시 시도하세요!</p>}
      </Modal>
  );
};

export default QuizModal;