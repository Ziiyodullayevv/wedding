import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundMusic from './components/BackgroundMusic';

function Image({
  id,
  title,
  subtitle,
  subtitle2,
}: {
  id: number;
  title: string;
  subtitle: string;
  subtitle2: string;
}) {
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
          <img src={`public/${id}.jpg`} onLoad={() => setIsLoaded(true)} />
          <div className='overlay'></div>
          <div className='text'>
            <div className='flex flex-col items-center'>
              <h2 className='ar-gold text-[50px]'>{title}</h2>
              <h2 className='text-[45px] ar-gold -mt-6'>{subtitle}</h2>
              <hr />
              <p className='text-base text-ar-gold mt-10'>{subtitle2}</p>
            </div>

            <div className='flex flex-col items-center'>
              <h5 className='flex items-center gap-2 text-sm font-poppins mt-32 uppercase text-gray-200'>
                <span className='w-[30px] h-[.5px] inline-block bg-gray-200'></span>
                <span>wedding of the</span>
                <span className='w-[30px] h-[.5px] inline-block bg-gray-200'></span>
              </h5>
              <h3 className='ar-gold text-[40px] mt-2 bg-red-500'>
                Ibrohim vs E'zoza
              </h3>
              <h4 className='text-sm font-poppins mt-20 text-yellow-200'>
                15 Oktober 2024, 18:00 PM
              </h4>
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
      <Image
        id={1}
        title='Bizning baxtli'
        subtitle='kunimizga xush kelibsiz!'
        subtitle2=" Biz uchun eng muhim va esda qolarli kun — to'yimiz! Sizni ushbu xursandchilik onlarini biz bilan birgalikda nishonlashga chorlaymiz."
      />
    </>
  );
}
