import React, { useState, useEffect } from 'react';
import { fadeIn } from '../App';
import { motion } from 'framer-motion';

const CountdownTimer: React.FC = () => {
  // 4-noyabr 2024 yil sanasini o'rnatamiz
  const targetDate = new Date('2024-11-04T00:00:00').getTime();

  // Sanani hisoblash uchun interfeys
  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  const calculateTimeLeft = (): TimeLeft | null => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return null; // Agar maqsadli sana yetgan bo'lsa, `null` qaytaramiz
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    <motion.div
      variants={fadeIn('up', 0.5)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.7 }}
      className='mt-10'
    >
      <div>
        {timeLeft ? (
          <div className='flex gap-2 text-yellow-200 text-[20px]'>
            <p>
              {timeLeft.days > 9
                ? `${timeLeft.days} kun`
                : `0${timeLeft.days} kun`}
            </p>
            <p>
              {timeLeft.hours > 9
                ? `${timeLeft.hours} soat`
                : `0${timeLeft.hours} soat`}
            </p>
            <p>
              {timeLeft.minutes > 9
                ? `${timeLeft.minutes} daqiqa`
                : `0${timeLeft.minutes} daqiqa`}
            </p>
            <p>
              {timeLeft.seconds > 9
                ? `${timeLeft.seconds} soniya`
                : `0${timeLeft.seconds} soniya`}
            </p>
          </div>
        ) : (
          <p>Maqsadli sana yetdi!</p>
        )}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
