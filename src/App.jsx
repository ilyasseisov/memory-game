import { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card/Card';
import Confetti from 'react-confetti';
import Popup from './components/Popup/Popup';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Burger from './components/Burger/Burger';
import Bubble from './components/Bubble/Bubble';
//
import useGameTimer from './hooks/useGameTimer';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  //
  const { timerIsRunning, setTimerIsRunning, gameDuration, setGameDuration } =
    useGameTimer();
  const { wins, setWins, bestTime, setBestTime } = useLocalStorage();

  //
  const [cards, setCards] = useState(shuffle); // populating array from function
  const [firstSelection, setFirstSelection] = useState(null); // first selection
  const [secondSelection, setSecondSelection] = useState(null); // second selection
  const [disabled, setDisabled] = useState(false); // delay handler
  const [allMatch, setAllMatch] = useState(false); // all cards are matched
  const [sidebarStatus, setSidebarStatus] = useState(false); // sidebar
  const [isNewBestTime, setIsNewBestTime] = useState(false);

  //
  // handle card selection
  function handleClick(card) {
    if (!disabled) {
      firstSelection ? setSecondSelection(card) : setFirstSelection(card);
    }
  }

  function startNewGame() {
    handleTurn();
    setCards(shuffle);
    setGameDuration(0);
    setIsNewBestTime(false);
  }

  function toggleSidebar() {
    setSidebarStatus((prev) => !prev);
  }

  function handleTurn() {
    setFirstSelection(null);
    setSecondSelection(null);
    setDisabled(false);
    setAllMatch(false);
  }

  function resetProgress() {
    localStorage.setItem('totalWins', 0);
    setWins(0);
    //
    localStorage.setItem('bestTimeFromStorage', '');
    setBestTime('-');
    //
    setIsNewBestTime(false);
  }

  function startTimer() {
    setTimerIsRunning(true);
  }

  //
  // if player has found all matches, handle accordingly
  useEffect(() => {
    // check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // all matches made, handle win/badge counters
    if (cards.length && checkWin.length === 0) {
      console.log('You win!');
      setWins((prev) => prev + 1);
      setAllMatch(true);
      localStorage.setItem('totalWins', wins + 1);
      setTimerIsRunning(false);
      //
      const bestTimeFromStorage = localStorage.getItem('bestTimeFromStorage');

      if (!bestTimeFromStorage) {
        localStorage.setItem('bestTimeFromStorage', gameDuration);
        setBestTime(gameDuration);
        setIsNewBestTime(true);
        return;
      }

      if (gameDuration < parseInt(bestTimeFromStorage)) {
        console.log('new best time');
        localStorage.setItem('bestTimeFromStorage', gameDuration);
        setBestTime(gameDuration);
        setIsNewBestTime(true);
      }
    }
  }, [cards]);
  //
  // match cards
  useEffect(() => {
    let pickTimer;

    // two cards have been clicked
    if (firstSelection && secondSelection) {
      // check if the cards the same
      if (firstSelection.image === secondSelection.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === firstSelection.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // no match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // prevent new selections until after delay
        setDisabled(true);

        // add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 720);
      }
    }
    // cleanup
    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, firstSelection, secondSelection]);
  //
  //
  //
  return (
    <>
      {allMatch && (
        <Confetti
          colors={['#f1c40f', '#e67e22', '#f39c12', '#3498db', '#2980b9']}
        />
      )}
      {allMatch && (
        <Popup onClick={startNewGame} gameDuration={gameDuration}>
          {isNewBestTime && <h4 className='new-record'>new record</h4>}
        </Popup>
      )}
      <Burger isActive={sidebarStatus} onClick={toggleSidebar} />
      <Sidebar isActive={sidebarStatus}>
        <h2>Total wins: {wins}</h2>
        <h2>
          Best time:
          <span>
            {isNaN(bestTime)
              ? ' -'
              : `0${Math.floor((bestTime / 60000) % 60)}`.slice(-2)}
            :
          </span>
          <span>
            {isNaN(bestTime)
              ? '-'
              : `0${Math.floor((bestTime / 1000) % 60)}`.slice(-2)}
          </span>
        </h2>
        <Bubble clearLocalStorage={resetProgress} />
      </Sidebar>
      <Header gameDuration={gameDuration} />

      <div className='grid' onClick={startTimer}>
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              image={card.image}
              selected={
                card === firstSelection ||
                card === secondSelection ||
                card.matched
              }
              onClick={() => {
                handleClick(card);
              }}
            />
          );
        })}
      </div>
    </>
  );
}
