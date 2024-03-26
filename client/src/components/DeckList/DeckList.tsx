import { Col, Container, Row } from "react-bootstrap";
import "./DeckList.scss";
import { useState } from "react";

type DeckProps = {
  id: number;
  name: string;
  new: number;
  learn: number;
  due: number;
  isOpen: boolean;
  list: DeckProps[];
};
const initialDecks: DeckProps[] = [
  {
    id: 0,
    name: "Hebrew",
    new: 0,
    learn: 0,
    due: 0,
    isOpen: false,
    list: [
      {
        id: 0,
        name: "arabic",
        new: 10,
        learn: 20,
        due: 30,
        list: [
          {
            id: 0,
            name: "Spanish",
            new: 60,
            learn: 50,
            due: 40,
            list: [],
            isOpen: false,
          },
          {
            id: 1,
            name: "Spani4s2h",
            new: 60,
            learn: 50,
            due: 40,
            list: [
              {
                id: 0,
                name: "Spa5nis2h",
                new: 60,
                learn: 50,
                due: 40,
                list: [],
                isOpen: false,
              },
              {
                id: 1,
                name: "Spa6nis2h",
                new: 60,
                learn: 50,
                due: 40,
                list: [],
                isOpen: false,
              },
              {
                id: 2,
                name: "Span7is2h",
                new: 60,
                learn: 50,
                due: 40,
                list: [],
                isOpen: false,
              },
            ],
            isOpen: false,
          },
        ],
        isOpen: false,
      },
      {
        id: 1,
        name: "dutch",
        new: 60,
        learn: 50,
        due: 40,
        list: [],
        isOpen: false,
      },
    ],
  },
  {
    id: 1,
    name: "English",
    new: 10,
    learn: 20,
    due: 30,
    list: [],
    isOpen: false,
  },
  {
    id: 2,
    name: "Spanish",
    new: 60,
    learn: 50,
    due: 40,
    list: [],
    isOpen: false,
  },
];

function DeckList() {
  const [decks, setDecks] = useState<DeckProps[]>(initialDecks);
  const toggleDeckOpen = (path: number[]) => setDecks(toggleDeck(decks, path));

  const toggleDeck = (list: DeckProps[], path: number[]): DeckProps[] => {
    if (path.length === 0) return list;
    const [currentId, ...restPath] = path;

    return list.map((deck) => {
      if (deck.id === currentId) {
        const shouldToggleClose = restPath.length === 0 && deck.isOpen;
        return {
          ...deck,
          isOpen: restPath.length === 0 ? !deck.isOpen : deck.isOpen,
          list: shouldToggleClose
            ? closeNestedLists(deck.list)
            : toggleDeck(deck.list, restPath),
        };
      }
      return deck;
    });
  };

  const closeNestedLists = (list: DeckProps[]): DeckProps[] =>
    list.map((deck) => ({
      ...deck,
      isOpen: false,
      list: closeNestedLists(deck.list),
    }));

  const DeckRow = ({ deck, path }: { deck: DeckProps; path: number[] }) => {
    const deckIndicator =
      deck?.list?.length > 0 ? (deck.isOpen ? "-" : "+") : " ";
    const indentation = (path.length - 1) * 15;
    return (
      <>
        <Row className="interactive-row text-center" key={deck.name}>
          <Col>
            <div
              className="deck-name-container"
              style={{ paddingLeft: `${indentation}px` }}
              onClick={() => toggleDeckOpen(path)}
            >
              <div className="toggle-indicator">{deckIndicator}</div>
              <div className="deck-title">{deck.name}</div>
            </div>
          </Col>
          <Col>{deck.new}</Col>
          <Col>{deck.learn}</Col>
          <Col>{deck.due}</Col>
        </Row>
        {deck.isOpen &&
          deck.list.map((nestedDeck) => (
            <DeckRow
              key={`${nestedDeck.id}`}
              deck={nestedDeck}
              path={[...path, nestedDeck.id]}
            />
          ))}
      </>
    );
  };

  return (
    <Container className="mt-10 deck-container">
      <Row className="bg-light interactive-row text-center">
        <Col>Deck</Col>
        <Col>New</Col>
        <Col>Learn</Col>
        <Col>Due</Col>
      </Row>
      {decks.map((deck) => (
        <DeckRow key={deck.name} deck={deck} path={[deck.id]} />
      ))}
    </Container>
  );
}

export default DeckList;
