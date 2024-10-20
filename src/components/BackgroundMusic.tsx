import { useState, useRef } from 'react';
import { Dialog, DialogTitle } from '@headlessui/react';

export default function BackgroundMusic() {
  const [isOpen, setIsOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Audio elementga TypeScript tipi berildi

  // "Ha" bosilganda musiqa ijro etiladi
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Musiqa boshlanadi
    }
    setIsOpen(false); // Modal yopiladi
  };

  // "Yo'q" bosilganda modalni yopamiz
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Musiqa ijro qilish uchun audio element */}
      <audio ref={audioRef} src='music.mp3' preload='auto'></audio>

      {/* Headless UI dialog componenti orqali modal */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className='fixed inset-0 z-50 flex items-center justify-center'
      >
        <div className='fixed inset-0 bg-black/20 backdrop-blur-md'></div>{' '}
        {/* Background qismi */}
        <div className='relative bg-white/10 backdrop-blur-xl rounded-lg p-10 shadow-lg max-w-sm w-full z-50'>
          <DialogTitle className='text-xl font-montserrat text-yellow-200 font-semibold'>
            Tinglashga tayyormisiz?
          </DialogTitle>
          <p className='mt-2 font-montserrat text-yellow-100'>
            Baxtli kunimizga musiqaning latofati bilan hamroh bo'ling. Bu sehrli
            kunga musiqa bilan kirib keling!
          </p>

          <div className='mt-4 flex justify-end space-x-3'>
            <button
              className='w-full font-montserrat bg-white/10 text-green-500 py-2 rounded-md'
              onClick={playMusic}
            >
              Ha
            </button>
            <button
              className='w-full font-montserrat bg-white/10 text-red-500 py-2 rounded-md'
              onClick={closeModal}
            >
              Yo'q
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
