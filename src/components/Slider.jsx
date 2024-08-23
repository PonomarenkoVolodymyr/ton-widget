import { useState } from 'react';
import { VscArrowRight } from 'react-icons/vsc';
import { VscArrowLeft } from 'react-icons/vsc';

import NotSlide from './Slides/NotSlide';
import TonSlide from './Slides/TonSlide';

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
    component: 'Coming soon...',
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
          <VscArrowLeft className={styles.arrowColor} />
        </button>
        <div className={styles.pageName}>
          <h3 className={styles.testText}>{pages[currentSlide].name}</h3>
        </div>
        <div className={styles.coinsLogo}>{pages[currentSlide].coinLogo}</div>
        <button onClick={handleNext} className={styles.arrowButton}>
          <VscArrowRight className={styles.arrowColor} />
        </button>
      </div>
      <div className={styles[swichStyle]}>{pages[currentSlide].component}</div>
    </div>
  );
};

export default Slider;
