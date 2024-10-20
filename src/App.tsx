import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './components/Timer';
import TelegramBot from './components/Message';
import BackgroundMusic from './components/BackgroundMusic';

export const fadeIn = (direction: string, delay: number) => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    opacity: 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
});

function Image({
  id,
  title,
  subtitle,
  subtitle2,
  names,
  title2,
  time,
  date,
  manzil,
  map,
  message,
}: {
  id: number;
  title: string;
  subtitle: string;
  subtitle2: string;
  names: boolean;
  title2: string;
  time: boolean;
  date: string;
  manzil: string;
  map: boolean;
  message: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <>
      <div className='h-[50px]'></div>
      <section>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded && isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onViewportEnter={() => setIsInView(true)}
        >
          <img
            src={`/${id}.jpg`} // `public` papkasidagi faylga to'g'ri URL
            onLoad={() => setIsLoaded(true)}
            alt={`Image ${id}`}
          />
          <div className='overlay'></div>
          <div className='text'>
            <div className='flex flex-col items-center'>
              <motion.h2
                variants={fadeIn('up', 0.2)}
                initial='hidden'
                whileInView='show'
                className='ar-gold text-[50px]'
                viewport={{ once: false, amount: 0.7 }}
              >
                {title}
              </motion.h2>
              <motion.h2
                variants={fadeIn('up', 0.3)}
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.7 }}
                className='text-[45px] ar-gold -mt-6'
              >
                {subtitle}
              </motion.h2>
              {time && <CountdownTimer />}

              <motion.p
                variants={fadeIn('up', 0.5)}
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.7 }}
                className='text-xl font-montserrat text-yellow-100 mt-10'
              >
                {subtitle2}
              </motion.p>
            </div>

            {map && (
              <motion.a
                variants={fadeIn('up', 0.4)}
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.7 }}
                href='https://maps.app.goo.gl/YypbwNLgT8nkXC9j6'
              >
                <div className='request-loader'>
                  <span></span>
                </div>
              </motion.a>
            )}

            {message && <TelegramBot />}

            <div className='flex flex-col items-center'>
              <motion.h5
                variants={fadeIn('up', 0.6)}
                initial='hidden'
                whileInView='show'
                className='flex items-center gap-2 text-sm font-montserrat uppercase text-yellow-100'
              >
                <span className='w-[30px] h-[.5px] inline-block bg-gray-200'></span>
                <span>{title2}</span>
                <span className='w-[30px] h-[.5px] inline-block bg-gray-200'></span>
              </motion.h5>
              {names && (
                <motion.h3
                  variants={fadeIn('up', 0.7)}
                  initial='hidden'
                  whileInView='show'
                  className='ar-gold text-[40px] mt-2 bg-red-500'
                >
                  Ibrohim vs Ezoza
                </motion.h3>
              )}
              {manzil && (
                <motion.h4
                  variants={fadeIn('up', 0.6)}
                  initial='hidden'
                  whileInView='show'
                  className='text-[20px] mt-10 font-montserrat text-yellow-100'
                >
                  {manzil}
                </motion.h4>
              )}
              {date && (
                <>
                  <span className='h-[0.3px] inline-block w-full bg-yellow-200 mt-6'></span>
                  <motion.h5
                    variants={fadeIn('up', 0.6)}
                    initial='hidden'
                    whileInView='show'
                    className='text-sm font-montserrat uppercase mt-10 text-yellow-100'
                  >
                    {date}
                  </motion.h5>
                </>
              )}
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
      <BackgroundMusic />
      <Image
        id={1}
        title='Bizning baxtli'
        subtitle='kunimizga xush kelibsiz!'
        subtitle2=" Biz uchun eng muhim va esda qolarli kun — to'yimiz! Sizni ushbu xursandchilik onlarini biz bilan birgalikda nishonlashga chorlaymiz."
        names={true}
        title2='Wedding of the'
        time={false}
        date='4 noyabr 2024 16:00'
        manzil=''
        map={false}
        message={false}
      />

      <Image
        id={2}
        title='Baxtli kunimizgacha'
        subtitle=' qolgan lahzalar'
        subtitle2=''
        names={false}
        title2='Manzil'
        time={true}
        date=''
        manzil='Oqdaryo Tumani, "Bahor" toyxonasi'
        map={true}
        message={false}
      />

      <Image
        id={3}
        title='Baxtli kunimiz uchun'
        subtitle='tilaklaringiz!'
        subtitle2=''
        names={false}
        title2='Mezbon'
        time={false}
        date=''
        manzil='Quvondiqovlar va Zokirovlar oilasi'
        map={false}
        message={true}
      />
    </>
  );
}
