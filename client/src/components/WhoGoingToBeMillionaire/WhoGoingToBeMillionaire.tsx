import React, { useEffect, useState } from 'react';
import './WhoGoingToBeMillionaire.scss';
type QuizItem = {
  word: string;
  options: string[];
  correctWord: string;
};

const wordQuiz: QuizItem[] = [
  {
    word: 'apple',
    options: ['Pera', 'Manzana', 'Fruta', 'Ciruela'], // Related options: Pear, Fruit, Plum
    correctWord: 'Manzana', // Correct translation: Apple
  },
  {
    word: 'book',
    options: ['Revista', 'Periódico', 'Libro', 'Cuaderno'], // Related options: Magazine, Newspaper, Notebook
    correctWord: 'Libro', // Correct translation: Book
  },
  {
    word: 'car',
    options: ['Camión', 'Bicicleta', 'Motocicleta', 'Coche'], // Related options: Truck, Bicycle, Motorcycle
    correctWord: 'Coche', // Correct translation: Car
  },
  {
    word: 'moon',
    options: ['Luna', 'Sol', 'Estrella', 'Planeta'], // Related options: Sun, Star, Planet
    correctWord: 'Luna', // Correct translation: Moon
  },
  {
    word: 'water',
    options: ['Jugo', 'Agua', 'Leche', 'Refresco'], // Related options: Juice, Milk, Soda
    correctWord: 'Agua', // Correct translation: Water
  },
];

function WhoGoingToBeMillionaire() {
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkAnswer = (answer: string) => {
    if (answer === wordQuiz[index]?.correctWord) {
      wordQuiz.length !== index + 1
        ? setIndex((prevIndex) => prevIndex + 1)
        : setIndex(0);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div>What Does This Word Mean {wordQuiz[index].word}?</div>
      <div className='grid-container'>
        {wordQuiz[index]?.options?.map((word, i) => {
          return (
            <div className='elements' key={i} onClick={() => checkAnswer(word)}>
              {word}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WhoGoingToBeMillionaire;
