import { useEffect, React, useState } from 'react';
import styles from './Slides.module.css';
import BinanceLogo from '../../logos/2full-binance-logo.png';
import ByBitLogo from '../../logos/2bybit-logo-white.png';
import OKXLogo from '../../logos/2full-okx-log-white.png';
import { useDispatch, useSelector } from 'react-redux';

import { setDogsCoinsValue } from '../../redux/dogsPricesSlice';

import useDogsBinanceWebSocket from '../../utils/dogsWebSoket/dogsBinanceWS';
import useDogsBybitWebSocket from '../../utils/dogsWebSoket/dogsBybitWS';
import useDogsOKXWebSocket from '../../utils/dogsWebSoket/dogsOkxWS';

import { BsArrowDownRightSquareFill } from 'react-icons/bs';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';

const DogsSlide = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedValue = localStorage.getItem('DogsCoinsValue');
    if (cachedValue) {
      dispatch(setDogsCoinsValue(parseFloat(cachedValue)));
    }
  }, [dispatch]);

  const recordDogsCoinsValue = (e) => {
    const { value } = e.target;
    const filteredValue = parseFloat(value.replace(/[^0-9.]/g, ''));

    dispatch(setDogsCoinsValue(filteredValue));

    localStorage.setItem('DogsCoinsValue', filteredValue || '');
  };

  useDogsBinanceWebSocket();
  useDogsBybitWebSocket();
  useDogsOKXWebSocket();

  const {
    dogsBinanceLastPrice,
    dogsBinanceChange24h,
    dogsBybitLastPrice,
    dogsBybitChange24h,
    dogsOkxLastPrice,
    dogsOkxOpen24h,
    dogsCoinsValue,
  } = useSelector((state) => state.dogsPrices);

  const dogsOkxChange24h =
    dogsOkxLastPrice && dogsOkxOpen24h
      ? (((dogsOkxLastPrice - dogsOkxOpen24h) / dogsOkxOpen24h) * 100).toFixed(
          3
        )
      : '';

  // Change color 24h column:
  const binance24hchanger =
    dogsBinanceChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  const bybit24hchanger =
    dogsBybitChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  const okx24hchanger =
    dogsOkxChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  // Change color 24h column end.
  // Calculating earn:
  const bnanceEarn =
    dogsCoinsValue && dogsBybitLastPrice
      ? (dogsCoinsValue * dogsBybitLastPrice).toFixed(2)
      : 'Nothing';
  const bybitEarn =
    dogsCoinsValue && dogsBybitLastPrice
      ? (dogsCoinsValue * dogsBybitLastPrice).toFixed(2)
      : 'Nothing';

  const okxEarn =
    dogsCoinsValue && dogsOkxLastPrice
      ? (dogsCoinsValue * dogsOkxLastPrice).toFixed(2)
      : 'Nothing';

  // Calculating earn end
  // Choosing of growing  indication:
  //for Binance
  const [prevRateBinance, setPrevRateBinance] = useState('');
  const [priceDirectionBinance, setPriceDirectionBinance] = useState(null);
  useEffect(() => {
    if (prevRateBinance !== null) {
      if (dogsBinanceLastPrice > prevRateBinance) {
        setPriceDirectionBinance('up');
      } else if (dogsBinanceLastPrice < prevRateBinance) {
        setPriceDirectionBinance('down');
      }
    }
    setPrevRateBinance(dogsBinanceLastPrice);
  }, [dogsBinanceLastPrice]);

  const arrowBinance =
    priceDirectionBinance === 'up' ? (
      <BsArrowUpRightSquareFill className={styles.greenArrow} />
    ) : priceDirectionBinance === 'down' ? (
      <BsArrowDownRightSquareFill className={styles.redArrow} />
    ) : null;

  //for ByBit
  const [prevRateByBit, setPrevRateByBit] = useState('');
  const [priceDirectionByBit, setPriceDirectionByBit] = useState(null);
  useEffect(() => {
    if (prevRateByBit !== null) {
      if (dogsBybitLastPrice > prevRateByBit) {
        setPriceDirectionByBit('up');
      } else if (dogsBybitLastPrice < prevRateByBit) {
        setPriceDirectionByBit('down');
      }
    }
    setPrevRateByBit(dogsBybitLastPrice);
  }, [dogsBybitLastPrice]);

  const arrowByBit =
    priceDirectionByBit === 'up' ? (
      <BsArrowUpRightSquareFill className={styles.greenArrow} />
    ) : priceDirectionByBit === 'down' ? (
      <BsArrowDownRightSquareFill className={styles.redArrow} />
    ) : null;

  //for OKX

  const [prevRateOKX, setPrevRateOKX] = useState('');
  const [priceDirectionOKX, setPriceDirectionOKX] = useState(null);
  useEffect(() => {
    if (prevRateOKX !== null) {
      if (dogsOkxLastPrice > prevRateOKX) {
        setPriceDirectionOKX('up');
      } else if (dogsOkxLastPrice < prevRateOKX) {
        setPriceDirectionOKX('down');
      }
    }
    setPrevRateOKX(dogsOkxLastPrice);
  }, [dogsOkxLastPrice]);

  const arrowOKX =
    priceDirectionOKX === 'up' ? (
      <BsArrowUpRightSquareFill className={styles.greenArrow} />
    ) : priceDirectionOKX === 'down' ? (
      <BsArrowDownRightSquareFill className={styles.redArrow} />
    ) : null;

  // Choosing of growing  indication end.

  return (
    <>
      {' '}
      <div>
        <input
          className={styles.myAmount}
          type="text"
          placeholder="Type your DOGScoin amount"
          value={dogsCoinsValue ? dogsCoinsValue : ''}
          onChange={recordDogsCoinsValue}
        ></input>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItemTitles}>Exchange</div>
        <div className={styles.gridItemTitles}>Price (USDT)</div>
        <div className={styles.gridItemTitles}>24h </div>
        <div className={styles.gridItemTitles}>If sell (USDT)</div>
        <div className={styles.gridItemExch}>
          <div className={styles.imageBox}>
            <img
              className={styles.logos}
              src={BinanceLogo}
              alt="Binance Logo"
            />
          </div>
        </div>
        <div className={styles.gridItem}>
          {dogsBinanceLastPrice}&nbsp;&nbsp;{arrowBinance}
        </div>
        <div className={binance24hchanger}>{dogsBinanceChange24h}&nbsp;%</div>
        <div className={styles.gridItem}>{bnanceEarn}</div>
        <div className={styles.gridItemExch}>
          <div className={styles.imageBox}>
            <img className={styles.logos2} src={ByBitLogo} alt="ByBit Logo" />
          </div>
        </div>
        <div className={styles.gridItem}>
          {dogsBybitLastPrice}&nbsp;&nbsp;{arrowByBit}
        </div>
        <div className={bybit24hchanger}>{dogsBybitChange24h}&nbsp;%</div>
        <div className={styles.gridItem}>{bybitEarn}</div>
        <div className={styles.gridItemExch}>
          <div className={styles.imageBox}>
            <img className={styles.logos3} src={OKXLogo} alt="OKX Logo" />
          </div>
        </div>
        <div className={styles.gridItem}>
          {dogsOkxLastPrice}&nbsp;&nbsp;{arrowOKX}
        </div>
        <div className={okx24hchanger}>{dogsOkxChange24h}&nbsp;%</div>
        <div className={styles.gridItem}>{okxEarn}</div>
      </div>
    </>
  );
};

export default DogsSlide;
