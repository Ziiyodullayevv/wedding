import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';

function ImageSection1() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <section className='h-screen mx-auto max-w-[440px]'>
      <motion.div
        className='h-full px-4'
        initial={{ opacity: 0 }}
        animate={isLoaded && isInView ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        onViewportEnter={() => setIsInView(true)}
        onLoad={() => setIsLoaded(true)}
      >
        <div className='h-full flex justify-center flex-col border-l border-r border-solid border-gold items-center bg-white'>
          <h4 className='font-mono uppercase'>The wedding of</h4>
          <h1 className='text-gold text-center text-2xl'>Ibrohim and Ezoza</h1>

          <div className='bg-[url("../../public/wed.jpg")] mt-8 bg-p w-[230px] ar-offset ar-shadow h-[350px] rounded-full'></div>

          <div className='flex justify-center items-center gap-2 mt-8'>
            <span className='w-[30px] h-[.5px] bg-gold inline-block'></span>
            <h3 className='text-gold text-xl'>07.02. 2024</h3>
            <span className='w-[30px] h-[.5px] bg-gold inline-block'></span>
          </div>
          <p className='uppercase font-mono text-center mt-4 text-sm max-w-72'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>

          <h6 className='text-gold mt-4'>akobirjs@gmail.com</h6>
        </div>
      </motion.div>
    </section>
  );
}

function ImageSection2() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <section className='h-screen'>
      <motion.div
        className='h-full'
        initial={{ opacity: 0 }}
        animate={isLoaded && isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        onViewportEnter={() => setIsInView(true)}
        onLoad={() => setIsLoaded(true)}
      >
        <div className='h-full flex justify-center items-center bg-red-500'>
          <div className='w-[280px] h-[400px] border border-solid border-black'></div>
        </div>
      </motion.div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ImageSection1 />
      <ImageSection2 />
    </>
  );
}
