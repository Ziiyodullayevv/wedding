import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { fadeIn } from '../App';

const TelegramBot: React.FC = () => {
  const [message, setMessage] = useState<string>(''); // Matnni saqlash uchun state

  // Formni yuborish funksiyasi
  const sendMessageToTelegram = async (e: React.FormEvent) => {
    e.preventDefault();

    const botToken = '7827172863:AAElUMyjAxO_DCMjWOwSbQBAVGo9LWTYofw'; // Telegram bot tokeningiz
    const chatId = '961047307'; // O'zingizning chat ID'ingizni kiriting
    const sendPhotoUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    // Rasm URL'si
    const imageUrl = `https://ibrohimezozawedding.netlify.app/2.jpg`; // URL

    // Telegramga matn va rasmni yuborish
    try {
      // Rasm va matnni birga yuborish
      const response = await fetch(sendPhotoUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // To'g'ri format
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: imageUrl, // Rasm URL'ini `photo` sifatida yuboramiz
          caption: message, // Matnni `caption` sifatida yuboramiz
        }),
      });

      if (response.ok) {
        console.log('Rasm va xabar muvaffaqiyatli yuborildi!');
      } else {
        const data = await response.json(); // Xato haqida ma'lumot olish
        console.log('Xatolik yuz berdi:', data.description);
      }
    } catch (error) {
      console.error('Xato:', error);
    }

    setMessage(''); // Matnni tozalash
  };

  return (
    <motion.form
      className='w-full'
      variants={fadeIn('up', 0.5)}
      initial='hidden'
      whileInView='show'
      onSubmit={sendMessageToTelegram}
    >
      <textarea
        className='bg-white/10 -mt-14 min-h-[180px] h-[180px] text-yellow-100 focus:outline-solid focus:outline focus:outline-yellow-100 w-[100%] backdrop-blur-sm rounded-lg p-4'
        placeholder='Tilaklaringiz...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit'>Yuborish</button>
    </motion.form>
  );
};

export default TelegramBot;
