import { useState } from 'react';
// import { VscArrowRight } from 'react-icons/vsc';
// import { VscArrowLeft } from 'react-icons/vsc';
// import { HiOutlineArrowLongRight } from 'react-icons/hi2';
// import { HiOutlineArrowLongLeft } from 'react-icons/hi2';
import { MoveRight } from 'lucide-react';
import { MoveLeft } from 'lucide-react';

import NotSlide from './Slides/NotSlide';
import TonSlide from './Slides/TonSlide';
import DogsSlide from './Slides/DogsSlide';

import styles from './Slider.module.css';

import notLogo from '../logos/coinsLogo/not.webp';
import tonLogo from '../logos/coinsLogo/ton.webp';
import dogsLogo from '../logos/coinsLogo/dogs.webp';

const pages = [
  {
    id: 0,
    name: 'NOT',
    coinLogo: <img src={notLogo} alt="Not Logo" />,
    component: <NotSlide />,
  },
  {
    id: 1,
    name: 'TON',
    coinLogo: <img src={tonLogo} alt="TON Logo" />,
    component: <TonSlide />,
  },
  {
    id: 2,
    name: 'DOGS',
    coinLogo: <img src={dogsLogo} alt="DOGS Logo" />,
    // component: 'Coming soon...',
    component: <DogsSlide />,
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  const swichStyle =
    pages[currentSlide].component === 'Coming soon...'
      ? 'comingSoon'
      : 'sliderContent';

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderSelector}>
        <button onClick={handlePrev} className={styles.arrowButton}>
          <MoveLeft color="#0f0463" size={45} strokeWidth={0.6} />
        </button>
        <div className={styles.center}>
          <div className={styles.coinsLogo}>{pages[currentSlide].coinLogo}</div>
          <div className={styles.pageName}>
            <h3 className={styles.text}>{pages[currentSlide].name}</h3>
          </div>
        </div>
        <button onClick={handleNext} className={styles.arrowButton}>
          <MoveRight color="#0f0463" size={45} strokeWidth={0.6} />
        </button>
      </div>
      <div className={styles[swichStyle]}>{pages[currentSlide].component}</div>
    </div>
  );
};

export default Slider;
