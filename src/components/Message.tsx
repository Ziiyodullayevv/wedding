import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { fadeIn } from '../App';
import MyModal from './Dialog';

const TelegramBot: React.FC = () => {
  const [message, setMessage] = useState<string>(''); // Matnni saqlash uchun state

  // Formni yuborish funksiyasi
  const sendMessageToTelegram = async (e: React.FormEvent) => {
    e.preventDefault();

    const botToken = '7827172863:AAElUMyjAxO_DCMjWOwSbQBAVGo9LWTYofw'; // Telegram bot tokeningizni kiriting
    const chatId = '961047307'; // O'zingizning chat ID'ingizni kiriting
    const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Telegramga matn yuborish
    try {
      const response = await fetch(sendMessageUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Tilaklarni qabul qiling!\n\n${message}`, // Sarlavhani qo'shish
        }),
      });

      if (response.ok) {
        console.log('Xabar muvaffaqiyatli yuborildi!');
      } else {
        console.log('Xatolik yuz berdi, qayta urinib koring.');
      }
    } catch (error) {
      console.error('Xato:', error);
      console.log('Xatolik yuz berdi.');
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
        className='bg-white/10 font-montserrat placeholder:text-yellow-100  -mt-14 min-h-[200px] h-[200px] text-yellow-100 focus:outline-solid focus:outline focus:outline-yellow-100 w-[100%] backdrop-blur-sm rounded-lg p-4'
        placeholder='Tilaklaringiz...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <MyModal />
    </motion.form>
  );
};

export default TelegramBot;
