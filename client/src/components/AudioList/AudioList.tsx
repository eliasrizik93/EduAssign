import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Card {
  _id: string;
  text: string;
}

const AudioList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  useEffect(() => {
    fetchCards();
    setIndex(0);
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get<Card[]>('http://localhost:3002/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const playAudio = async (id: string) => {
    try {
      const audio = new Audio(`http://localhost:3002/cards/${id}/audio`);
      audio.play();
      setPlayingId(id);
      audio.onended = () => setPlayingId(null);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  const handleNext = () => {
    setIndex(index + 1);
    setShowAnswer(false);
  };
  return (
    <div>
      <h1>Audio List</h1>
      <div>
        {cards.map((card, idx) =>
          card._id === cards[index]._id ? (
            <div key={card._id}>
              <div className='question'>
                <button
                  onClick={() => playAudio(card._id)}
                  disabled={playingId === card._id}
                >
                  {playingId === card._id ? 'Playing...' : 'Play Audio'}
                </button>
              </div>
              {!showAnswer && (
                <button onClick={() => setShowAnswer(true)}>Show Answer</button>
              )}
              {showAnswer && (
                <>
                  <div className='answers'>{card.text}</div>
                  <div className='buttons'>
                    <button
                      onClick={() => setIndex(index - 1)}
                      disabled={index === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={index === cards.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default AudioList;
