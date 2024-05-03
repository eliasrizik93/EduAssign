import React, { useEffect, useState } from 'react';
import './WhoGoingToBeMillionaire.scss';
import { Button } from 'react-bootstrap';

interface Option {
  id: number;
  answer: string;
  classes: string;
}

interface QuizItem {
  id: number;
  word: string;
  options: Option[];
  correctAnswer: string;
}

const initialItems: QuizItem[] = [
  {
    id: 1,
    word: 'apple',
    options: [
      { id: 1, answer: 'Pera', classes: '' },
      { id: 2, answer: 'Manzana', classes: '' },
      { id: 3, answer: 'Fruta', classes: '' },
      { id: 4, answer: 'Ciruela', classes: '' },
    ],
    correctAnswer: 'Manzana',
  },
  {
    id: 2,
    word: 'book',
    options: [
      { id: 1, answer: 'Revista', classes: '' },
      { id: 2, answer: 'Periódico', classes: '' },
      { id: 3, answer: 'Libro', classes: '' },
      { id: 4, answer: 'Cuaderno', classes: '' },
    ],
    correctAnswer: 'Libro',
  },
  {
    id: 3,
    word: 'car',
    options: [
      { id: 1, answer: 'Camión', classes: '' },
      { id: 2, answer: 'Bicicleta', classes: '' },
      { id: 3, answer: 'Motocicleta', classes: '' },
      { id: 4, answer: 'Coche', classes: '' },
    ],
    correctAnswer: 'Coche',
  },
  {
    id: 4,
    word: 'moon',
    options: [
      { id: 1, answer: 'Luna', classes: '' },
      { id: 2, answer: 'Sol', classes: '' },
      { id: 3, answer: 'Estrella', classes: '' },
      { id: 4, answer: 'Planeta', classes: '' },
    ],
    correctAnswer: 'Luna',
  },
  {
    id: 5,
    word: 'water',
    options: [
      { id: 1, answer: 'Jugo', classes: '' },
      { id: 2, answer: 'Agua', classes: '' },
      { id: 3, answer: 'Leche', classes: '' },
      { id: 4, answer: 'Refresco', classes: '' },
    ],
    correctAnswer: 'Agua',
  },
];

function WhoGoingToBeMillionaire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<QuizItem[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizState, setQuizState] = useState<'active' | 'won' | 'lost'>(
    'active'
  );
  useEffect(() => {
    setItems(resetQuizData());
  }, []);
  const checkAnswer = (selectedOption: Option) => {
    if (isAnswered) return;
    const updatedOptions = items[currentIndex].options.map((option) => ({
      ...option,
      classes:
        option.answer === items[currentIndex].correctAnswer
          ? 'correct'
          : option.id === selectedOption.id
          ? 'false'
          : '',
    }));
    const isCorrect =
      selectedOption.answer === items[currentIndex].correctAnswer;
    setQuizState(
      isCorrect
        ? currentIndex === items.length - 1
          ? 'won'
          : 'active'
        : 'lost'
    );
    setIsAnswered(true);
    setItems(
      items.map((item, index) =>
        index === currentIndex ? { ...item, options: updatedOptions } : item
      )
    );
  };
  const goToNextQuestion = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswered(false);
    }
  };
  const resetQuizData = (quizItems: QuizItem[] = initialItems) =>
    quizItems.map((item) => ({
      ...item,
      options: item.options.map((option) => ({ ...option, classes: '' })),
    }));
  const restartQuiz = () => {
    setItems(resetQuizData());
    setCurrentIndex(0);
    setQuizState('active');
    setIsAnswered(false);
  };

  return (
    <div className='container d-flex flex-column align-items-center mt-10'>
      {quizState === 'lost' && (
        <div className='game-over'>THE GAME ENDED. YOU LOST</div>
      )}
      {quizState === 'won' && <div className='winner'>YOU WON!!!</div>}

      <div>What Does This Word Mean: {items[currentIndex]?.word}?</div>
      <div className='grid-container'>
        <div className='answers-container'>
          {items[currentIndex]?.options.map((option) => (
            <div
              className={`elements ${option.classes}`}
              key={option.id}
              onClick={() => checkAnswer(option)}
            >
              {option.answer}
            </div>
          ))}
        </div>
        <div className='footer'>
          <Button
            disabled={quizState !== 'active' || !isAnswered}
            variant='primary'
            onClick={goToNextQuestion}
          >
            Next
          </Button>
          {(quizState === 'lost' || quizState === 'won') && (
            <Button variant='danger' onClick={restartQuiz}>
              Restart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WhoGoingToBeMillionaire;
