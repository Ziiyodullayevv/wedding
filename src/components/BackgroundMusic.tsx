import { useEffect, useRef, useState } from 'react';

const MusicOnScroll: React.FC = () => {
  // Musiqa ijrosi holatini boshqarish uchun state
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio elementini boshqarish uchun ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Foydalanuvchi scroll qilganini aniqlaydigan hook
  useEffect(() => {
    const handleScroll = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true); // Musiqa ijro etilganini belgilash
          })
          .catch((error) => {
            console.error('Audio ijrosida xatolik:', error);
          });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Component unmounted bo'lganda event listenerni tozalash
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPlaying]);

  return (
    <div>
      {/* Audio elementi */}
      <audio ref={audioRef} src='../../public/Eminem - Lose Yourself.mp3' />
      <h1>Scroll qiling va musiqa boshlanadi!</h1>
    </div>
  );
};

export default MusicOnScroll;
