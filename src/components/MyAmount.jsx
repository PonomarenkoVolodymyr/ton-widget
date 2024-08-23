import styles from './MyAmount.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCoinsValue } from '../redux/pricesSlice';
import { useEffect } from 'react';

const MyAmount = () => {
  const dispatch = useDispatch();
  const { coinsValue } = useSelector((state) => state.prices);

  useEffect(() => {
    const cachedValue = localStorage.getItem('coinsValue');
    if (cachedValue) {
      dispatch(setCoinsValue(parseFloat(cachedValue)));
    }
  }, [dispatch]);

  const recordCoinsValue = (e) => {
    const { value } = e.target;
    const filteredValue = parseFloat(value.replace(/[^0-9.]/g, ''));

    dispatch(setCoinsValue(filteredValue));

    localStorage.setItem('coinsValue', filteredValue || '');
  };

  return (
    <div>
      <input
        className={styles.myAmount}
        type="text"
        placeholder="Type your NOTcoin amount"
        value={coinsValue ? coinsValue : ''}
        onChange={recordCoinsValue}
      ></input>
    </div>
  );
};

export default MyAmount;
