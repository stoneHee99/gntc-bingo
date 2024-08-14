import {useEffect, useState} from 'react'
import {
  BrowserRouter as Router, Link, Navigate,
  Route,
  Routes,
  useParams
} from "react-router-dom";
import BingoBoard from './BingoBoard.jsx';
import QuizModal from './QuizModal.jsx';
import './App.css'
import bingoTitle from './assets/bingo-title.png';
import Modal from "react-modal";

import question1 from './assets/question1.png';
import question2 from './assets/question2.jpg';
import question6 from './assets/question6.jpg';
import question7 from './assets/question7.png';
import question8 from './assets/question8.jpg';
import question11 from './assets/question11.jpg';
import question12 from './assets/question12.jpg';
import question13 from './assets/question13.png';
import question14 from './assets/question14.jpg';
import question15 from './assets/question15.jpg';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/:id" element={<BingoGame/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
  );
};

const BingoGame = () => {
  const { id } = useParams();
  const validIds = ['antioch', 'jerusalem', 'bethlehem'];

  if (!validIds.includes(id)) {
    return <Navigate to="/error" />;
  }

  const [selectedCell, setSelectedCell] = useState(null);
  const [bingoCount, setBingoCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const quizs = [
    { question: '사진을 참고하세요', answer: '사도 바울', image: question1},
    { question: '사진을 참고하세요', answer: '경주성전', image: question2},
    { question: '수양관 옆 테이블 지도', answer: '에벤에셀'},
    { question: '경기도 화성시 봉담읍 세곡리 산34-1', answer: 'Grace and Truth Church'},
    { question: 'ㅈㄱㅈ', answer: '마라나타'},
    { question: '사진을 참고하세요', answer: '말라기', image: question6},
    { question: '사진을 참고하세요', answer: '주 안에서 자랑하라', image: question7},
    { question: '사진을 참고하세요', answer: '오 이 기쁨', image: question8},
    { question: '선교관 지도', answer: '여호와 삼마'},
    { question: '나는 너희에게 물로 세례를 주었거니와 그는 성령으로 너희에게 세례를 주시리라 (막1:8)', answer: '엘리야'},
    { question: '사진을 참고하세요', answer: '오르난', image: question11},
    { question: '사진을 참고하세요', answer: '은혜 충만, 진리 충만', image: question12},
    { question: '사진을 참고하세요', answer: '경서하', image: question13},
    { question: '사진을 참고하세요', answer: '요엘', image: question14},
    { question: '사진을 참고하세요', answer: '만세반석', image: question15},
    { question: '수양관 만나실 뒤편 지도', answer: '빛의 사자들이여'},
  ];

  const finalMessages = {
    antioch: "너희로 지극히 선한 것을 분별하며 또 진실하여 허물 없이 그리스도의 날까지 이르고 예수 그리스도로 말미암아 의의 열매가 가득하여 하나님의 영광과 찬송이 되게 하시기를 구하노라 (빌1:10-11, 개역한글)",
    jerusalem: "네가 진리의 말씀을 옳게 분변하며 부끄러울 것이 없는 일군으로 인정된 자로 자신을 하나님 앞에 드리기를 힘쓰라 (딤후2:15, 개역한글)",
    bethlehem: "근신하라 깨어라 너희 대적 마귀가 우는 사자 같이 두루 다니며 삼킬 자를 찾나니 너희는 믿음을 굳게 하여 저를 대적하라 이는 세상에 있는 너희 형제들도 동일한 고난을 당하는 줄을 앎이니라 (벧전5:8-9, 개역한글)",
  };

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
          count >= 2) {
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
          <img src={bingoTitle} style={{width: '300px'}}/>
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
          <p>{finalMessages[id]}</p>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </div>
  );
};

const ErrorPage = () => (
    <div className="App">
      <h2>Error 404</h2>
      <p>Page not found</p>
      <Link to="/">Go back to home</Link>
    </div>
);

export default App;
