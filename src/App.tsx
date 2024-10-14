import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundMusic from './components/BackgroundMusic';

function Image({ id }: { id: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded && isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          onViewportEnter={() => setIsInView(true)}
        >
          <img src={`/${id}.jpg`} alt='' onLoad={() => setIsLoaded(true)} />
          <div className='overlay'></div>
          <div className='text'>
            <div>
              <h1>Bizning baxtli kunimizga xush kelibsiz!</h1>
            </div>
            <BackgroundMusic />
            <div className='date'>
              <h3>Ibrohim vs Nigina</h3>
              <h4>15 Oktober 2024, 18:00 PM</h4>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image id={image} key={image} />
      ))}
    </>
  );
}
