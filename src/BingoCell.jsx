// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const BingoCell = ({ index, onClick, isCorrect, backgroundImage }) => {
  return (
      <div
          className={`bingo-cell ${isCorrect ? 'correct' : ''}`}
          onClick={() => onClick(index)}
          style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="cell-content">
          {index + 1}
        </div>
        {isCorrect && <div className="cell-overlay">✔️</div>}
      </div>
  );
};

export default BingoCell;