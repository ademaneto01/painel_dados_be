import styles from '@/styles/Loader.module.css';

export default function Loader(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}
