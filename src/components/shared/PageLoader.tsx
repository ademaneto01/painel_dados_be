import styles from '@/styles/PageLoader.module.css';
import Loader from './Loader';
export default function PageLoader(): JSX.Element {
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
}
