// eslint-disable-next-line no-unused-vars
import React from 'react';
import BingoCell from './BingoCell.jsx';

const BingoBoard = ({ onCellClick, correctAnswers }) => {
  const cells = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
      <div className="bingo-board">
        {cells.map((cell, index) => (
            <BingoCell
                key={index}
                index={index}
                onClick={onCellClick}
                isCorrect={correctAnswers.includes(index)}
            />
        ))}
      </div>
  );
};

export default BingoBoard;