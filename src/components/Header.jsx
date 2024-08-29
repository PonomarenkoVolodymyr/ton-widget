import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>TON BLOCKCHAIN WIDGET</h1>
      <h3 className={styles.h4}>live coins rate</h3>
    </header>
  );
};
export default Header;
