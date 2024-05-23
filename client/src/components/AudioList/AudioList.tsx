import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Card {
  _id: string;
  text: string;
}

const AudioList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCards();
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

  return (
    <div>
      <h1>Audio List</h1>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <p>{card.text}</p>
            <button
              onClick={() => playAudio(card._id)}
              disabled={playingId === card._id}
            >
              {playingId === card._id ? 'Playing...' : 'Play Audio'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioList;