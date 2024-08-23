import { useEffect, React, useState } from 'react';
import styles from './Table.module.css';
import BinanceLogo from '../logos/binanceLogo.png';
import ByBitLogo from '../logos/ByBitLogo.png';
import OKXLogo from '../logos/OKXLogo.png';
import { useSelector } from 'react-redux';

import useBinanceWebSocket from '../utils/websocketBinance';
import useByBitWebSocket from '../utils/websocketByBit';
import useOKXWebSocket from '../utils/websocketOKX';

import { BsArrowDownRightSquareFill } from 'react-icons/bs';
import { BsArrowUpRightSquareFill } from 'react-icons/bs';

const Table = () => {
  useBinanceWebSocket();
  useByBitWebSocket();
  useOKXWebSocket();

  const {
    binanceLastPrice,
    binanceChange24h,
    bybitLastPrice,
    bybitChange24h,
    okxLastPrice,
    okxOpen24h,
    coinsValue,
  } = useSelector((state) => state.prices);

  const okxChange24h =
    okxLastPrice && okxOpen24h
      ? (((okxLastPrice - okxOpen24h) / okxOpen24h) * 100).toFixed(3)
      : '';

  // Change color 24h column:
  const binance24hchanger =
    binanceChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  const bybit24hchanger =
    bybitChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  const okx24hchanger =
    okxChange24h > 0 ? styles.gridItemGreen : styles.gridItemRed;
  // Change color 24h column end.
  // Calculating earn:
  const bnanceEarn =
    coinsValue && bybitLastPrice
      ? (coinsValue * bybitLastPrice).toFixed(2)
      : 'Nothing';
  const bybitEarn =
    coinsValue && bybitLastPrice
      ? (coinsValue * bybitLastPrice).toFixed(2)
      : 'Nothing';

  const okxEarn =
    coinsValue && okxLastPrice
      ? (coinsValue * okxLastPrice).toFixed(2)
      : 'Nothing';

  // Calculating earn end
  // Choosing of growing  indication:
  //for Binance
  const [prevRateBinance, setPrevRateBinance] = useState('');
  const [priceDirectionBinance, setPriceDirectionBinance] = useState(null);
  useEffect(() => {
    if (prevRateBinance !== null) {
      if (binanceLastPrice > prevRateBinance) {
        setPriceDirectionBinance('up');
      } else if (binanceLastPrice < prevRateBinance) {
        setPriceDirectionBinance('down');
      }
    }
    setPrevRateBinance(binanceLastPrice);
  }, [binanceLastPrice]);

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
      if (bybitLastPrice > prevRateByBit) {
        setPriceDirectionByBit('up');
      } else if (bybitLastPrice < prevRateByBit) {
        setPriceDirectionByBit('down');
      }
    }
    setPrevRateByBit(bybitLastPrice);
  }, [bybitLastPrice]);

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
      if (okxLastPrice > prevRateOKX) {
        setPriceDirectionOKX('up');
      } else if (okxLastPrice < prevRateOKX) {
        setPriceDirectionOKX('down');
      }
    }
    setPrevRateOKX(okxLastPrice);
  }, [okxLastPrice]);

  const arrowOKX =
    priceDirectionOKX === 'up' ? (
      <BsArrowUpRightSquareFill className={styles.greenArrow} />
    ) : priceDirectionOKX === 'down' ? (
      <BsArrowDownRightSquareFill className={styles.redArrow} />
    ) : null;

  // Choosing of growing  indication end.

  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridItem}>Exchange</div>
      <div className={styles.gridItem}>Price (USD)</div>
      <div className={styles.gridItem}>24h </div>
      <div className={styles.gridItem}>If sell now (USD)</div>
      <div className={styles.gridItemExch}>
        <div className={styles.imageBox}>
          <img className={styles.logos} src={BinanceLogo} alt="Binance Logo" />
        </div>
        <div className={styles.nameExch}>Binance</div>
      </div>
      <div className={styles.gridItem}>
        {binanceLastPrice}&nbsp;&nbsp;{arrowBinance}
      </div>
      <div className={binance24hchanger}>{binanceChange24h}&nbsp;%</div>
      <div className={styles.gridItem}>{bnanceEarn}</div>
      <div className={styles.gridItemExch}>
        <div className={styles.imageBox}>
          <img className={styles.logos} src={ByBitLogo} alt="ByBit Logo" />
        </div>
        <div className={styles.nameExch}>ByBit</div>
      </div>
      <div className={styles.gridItem}>
        {bybitLastPrice}&nbsp;&nbsp;{arrowByBit}
      </div>
      <div className={bybit24hchanger}>{bybitChange24h}&nbsp;%</div>
      <div className={styles.gridItem}>{bybitEarn}</div>
      <div className={styles.gridItemExch}>
        <div className={styles.imageBox}>
          <img className={styles.logos} src={OKXLogo} alt="OKX Logo" />
        </div>
        <div className={styles.nameExch}>OKX</div>
      </div>
      <div className={styles.gridItem}>
        {okxLastPrice}&nbsp;&nbsp;{arrowOKX}
      </div>
      <div className={okx24hchanger}>{okxChange24h}&nbsp;%</div>
      <div className={styles.gridItem}>{okxEarn}</div>
    </div>
  );
};

export default Table;
