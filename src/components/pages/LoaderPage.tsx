import styles from '@/styles/Login.module.css';
import { Loader } from '@/components/shared';

export default function LoaderPage() {
  return (
    <>
      <div className={styles.containerFundo}>
        <div className={styles.boxLoaderLogin}>{<Loader />}</div>;
      </div>
    </>
  );
}
