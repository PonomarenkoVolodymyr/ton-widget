import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.loading}>
          <div className={styles.loadingtext}>
            <span className={styles.loadTxt}>L</span>
            <span className={styles.loadTxt}>O</span>
            <span className={styles.loadTxt}>A</span>
            <span className={styles.loadTxt}>D</span>
            <span className={styles.loadTxt}>I</span>
            <span className={styles.loadTxt}>N</span>
            <span className={styles.loadTxt}>G</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
