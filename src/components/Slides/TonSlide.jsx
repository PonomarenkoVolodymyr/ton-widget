import { useEffect, React, useState } from 'react';
import styles from './Slides.module.css';
import BinanceLogo from '../../logos/binanceLogo.png';
import ByBitLogo from '../../logos/ByBitLogo.png';
import OKXLogo from '../../logos/OKXLogo.png';
import { useDispatch, useSelector } from 'react-redux';

import { setTonCoinsValue } from '../../redux/tonPricesSlice';

import useTonBinanceWebSocket from '../../utils/tonWebSocket/tonBinanceWS';
import useTonBybitWebSocket from '../../utils/tonWebSocket/tonBybitWS';
import useTonOKXWebSocket from '../../utils/tonWebSocket/tonOkxWS';

import { BsArrowDownRightSquareFill } from 'react-icons/bs';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';

const NotSlide = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedValue = localStorage.getItem('tonCoinsValue');
    if (cachedValue) {
      dispatch(setTonCoinsValue(parseFloat(cachedValue)));
    }
  }, [dispatch]);

  const recordTonCoinsValue = (e) => {
    let { value } = e.target;

    // Заменяем запятую на точку для корректного преобразования
    value = value.replace(',', '.');

    // Оставляем только цифры и одну точку, ограничиваем до двух знаков после точки
    const validValue = value.match(/^\d*\.?\d{0,2}$/)
      ? value
      : value.slice(0, -1);

    dispatch(setTonCoinsValue(validValue));

    // Сохраняем значение в localStorage
    localStorage.setItem('tonCoinsValue', validValue);
  };

  useTonBinanceWebSocket();
  useTonBybitWebSocket();
  useTonOKXWebSocket();

  const {
    tonBinanceLastPrice,
    tonBinanceChange24h,
    tonBybitLastPrice,
    tonBybitChange24h,
    tonOkxLastPrice,
    tonOkxOpen24h,
    tonCoinsValue,
  } = useSelector((state) => state.tonPrices);

  const tonOkxChange24h =
    tonOkxLastPrice && tonOkxOpen24h
      ? (((tonOkxLastPrice - tonOkxOpen24h) / tonOkxOpen24h) * 100).toFixed(3)
      : '';

  // Change color 24h column:
  const binance24hchanger =
    tonBinanceChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  const bybit24hchanger =
    tonBybitChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  const okx24hchanger =
    tonOkxChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  // Change color 24h column end.
  // Calculating earn:
  const bnanceEarn =
    tonCoinsValue && tonBybitLastPrice
      ? (tonCoinsValue * tonBybitLastPrice).toFixed(2)
      : 'Nothing';
  const bybitEarn =
    tonCoinsValue && tonBybitLastPrice
      ? (tonCoinsValue * tonBybitLastPrice).toFixed(2)
      : 'Nothing';

  const okxEarn =
    tonCoinsValue && tonOkxLastPrice
      ? (tonCoinsValue * tonOkxLastPrice).toFixed(2)
      : 'Nothing';

  // Calculating earn end
  // Choosing of growing  indication:
  //for Binance
  const [prevRateBinance, setPrevRateBinance] = useState('');
  const [priceDirectionBinance, setPriceDirectionBinance] = useState(null);
  useEffect(() => {
    if (prevRateBinance !== null) {
      if (tonBinanceLastPrice > prevRateBinance) {
        setPriceDirectionBinance('up');
      } else if (tonBinanceLastPrice < prevRateBinance) {
        setPriceDirectionBinance('down');
      }
    }
    setPrevRateBinance(tonBinanceLastPrice);
  }, [tonBinanceLastPrice]);

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
      if (tonBybitLastPrice > prevRateByBit) {
        setPriceDirectionByBit('up');
      } else if (tonBybitLastPrice < prevRateByBit) {
        setPriceDirectionByBit('down');
      }
    }
    setPrevRateByBit(tonBybitLastPrice);
  }, [tonBybitLastPrice]);

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
      if (tonOkxLastPrice > prevRateOKX) {
        setPriceDirectionOKX('up');
      } else if (tonOkxLastPrice < prevRateOKX) {
        setPriceDirectionOKX('down');
      }
    }
    setPrevRateOKX(tonOkxLastPrice);
  }, [tonOkxLastPrice]);

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
          placeholder="Type your TONcoin amount"
          value={tonCoinsValue ? tonCoinsValue : ''}
          onChange={recordTonCoinsValue}
        ></input>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>Exchange</div>
        <div className={styles.gridItem}>Price (USDT)</div>
        <div className={styles.gridItem}>24h </div>
        <div className={styles.gridItem}>If sell (USDT)</div>
        <div className={styles.gridItemExch}>
          <div className={styles.imageBox}>
            <img
              className={styles.logos}
              src={BinanceLogo}
              alt="Binance Logo"
            />
          </div>
          <div className={styles.nameExch}>Binance</div>
        </div>
        <div className={styles.gridItem}>
          {tonBinanceLastPrice}&nbsp;&nbsp;{arrowBinance}
        </div>
        <div className={binance24hchanger}>{tonBinanceChange24h}&nbsp;%</div>
        <div className={styles.gridItem}>{bnanceEarn}</div>
        <div className={styles.gridItemExch}>
          <div className={styles.imageBox}>
            <img className={styles.logos} src={ByBitLogo} alt="ByBit Logo" />
          </div>
          <div className={styles.nameExch}>ByBit</div>
        </div>
        <div className={styles.gridItem}>
          {tonBybitLastPrice}&nbsp;&nbsp;{arrowByBit}
        </div>
        <div className={bybit24hchanger}>{tonBybitChange24h}&nbsp;%</div>
        <div className={styles.gridItem}>{bybitEarn}</div>
        <div className={styles.gridItemExch}>
          <div className={styles.imageBox}>
            <img className={styles.logos} src={OKXLogo} alt="OKX Logo" />
          </div>
          <div className={styles.nameExch}>OKX</div>
        </div>
        <div className={styles.gridItem}>
          {tonOkxLastPrice}&nbsp;&nbsp;{arrowOKX}
        </div>
        <div className={okx24hchanger}>{tonOkxChange24h}&nbsp;%</div>
        <div className={styles.gridItem}>{okxEarn}</div>
      </div>
    </>
  );
};

export default NotSlide;
