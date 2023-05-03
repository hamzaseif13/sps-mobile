import { useState, useEffect } from 'react';

const useTimer = (milliseconds:number) => {
  const [remainingTime, setRemainingTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    console.log(remainingTime)
    const intervalId = setInterval(() => {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');

      setRemainingTime({ hours, minutes, seconds });

      if (totalSeconds <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [milliseconds]);

  return remainingTime;
};

export default useTimer;
