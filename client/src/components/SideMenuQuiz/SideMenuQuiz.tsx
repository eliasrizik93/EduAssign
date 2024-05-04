import React, { useState } from 'react';
import './SideMenuQuiz.scss';

const SideMenuQuiz = ({
  numOfQuiz,
  quiz,
}: {
  numOfQuiz: number;
  quiz: number;
}) => {
  return (
    <div className='list-container'>
      {Array(numOfQuiz)
        .fill('')
        .map((_, index) => (
          <div className={`quiz ${numOfQuiz - index === quiz ? 'active' : ''}`}>
            Quiz {numOfQuiz - index}
          </div>
        ))}
    </div>
  );
};

export default SideMenuQuiz;
