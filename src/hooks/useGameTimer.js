import { useState, useEffect } from 'react';

// timer logic
export default function useGameTimer() {
  //
  const [timerIsRunning, setTimerIsRunning] = useState(false); // timer
  const [gameDuration, setGameDuration] = useState(0); // duration of the current game

  //
  useEffect(() => {
    //
    let interval;
    //
    if (timerIsRunning) {
      interval = setInterval(() => {
        setGameDuration((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!timerIsRunning) {
      clearInterval(interval);
    }
    //
    // cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [timerIsRunning]);
  //
  return { timerIsRunning, setTimerIsRunning, gameDuration, setGameDuration };
}
