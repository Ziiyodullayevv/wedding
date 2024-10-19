import React from 'react';

const TelegramChatIdFetcher: React.FC = () => {
  const botToken = '7827172863:AAElUMyjAxO_DCMjWOwSbQBAVGo9LWTYofw'; // Telegram bot tokeningizni kiriting

  const getChatId = async () => {
    const url = `https://api.telegram.org/bot${botToken}/getUpdates`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.result.length > 0) {
        const latestMessage = data.result[data.result.length - 1]; // So'nggi xabarni olamiz
        const chatId = latestMessage.message.chat.id; // chat_id ni topamiz
        console.log('Chat ID:', chatId); // chat_id ni consolda chiqaramiz
      } else {
        console.log('Xabarlar topilmadi yoki xatolik yuz berdi.');
      }
    } catch (err) {
      console.error('API chaqiruvda xatolik yuz berdi:', err);
    }
  };

  return (
    <div>
      <h2>Telegram Chat ID Olish</h2>
      <button onClick={getChatId}>Chat ID ni olish</button>
    </div>
  );
};

export default TelegramChatIdFetcher;
