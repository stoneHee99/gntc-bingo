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
        {index + 1}
      </div>
  );
};

export default BingoCell;