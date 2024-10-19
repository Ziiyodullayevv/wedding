import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        type='submit'
        onClick={open}
        className='w-full bg-white/10 py-2 rounded-md'
      >
        Yuborish
      </Button>

      <Dialog
        open={isOpen}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={close}
      >
        <div className='fixed inset-0 z-10 w-screen bg-black/5 backdrop-blur-xl overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-white/10 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-poppins font-medium text-white/80'
              >
                Xabaringiz yuborildi!
              </DialogTitle>
              <p className='mt-2 font-poppins text-sm/6 text-white/50'>
                Ezgu tilaklaringiz uchun tashakkur! Sizni baxtli kunimizda kutib
                qolamiz!
              </p>
              <div className='mt-4'>
                <Button
                  className='w-full font-poppins bg-white/10 py-2 rounded-md'
                  onClick={close}
                >
                  Yopish
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
