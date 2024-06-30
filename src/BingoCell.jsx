import React from 'react';

const BingoCell = ({ index, onClick, isCorrect }) => {
  return (
      <div
          className={`bingo-cell ${isCorrect ? 'correct' : ''}`}
          onClick={() => onClick(index)}
      >
        {index + 1}
      </div>
  );
};

export default BingoCell;