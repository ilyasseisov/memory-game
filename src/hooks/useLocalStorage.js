import { useState, useEffect } from 'react';

// read value from localStorage
export default function useLocalStorage() {
  //
  const [wins, setWins] = useState(0); // total wins
  const [bestTime, setBestTime] = useState('-');

  // read value from localStorage
  useEffect(() => {
    const totalWins = localStorage.getItem('totalWins');
    totalWins && setWins(parseInt(totalWins));
    //
    const bestTimeFromStorage = localStorage.getItem('bestTimeFromStorage');
    bestTimeFromStorage
      ? setBestTime(parseInt(bestTimeFromStorage))
      : setBestTime('-');
  }, [wins]);
  //
  return { wins, setWins, bestTime, setBestTime };
}
