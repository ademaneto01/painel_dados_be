import styles from '@/styles/Error.module.css';

export default function ErrorComponent(): JSX.Element {
  return (
    <div className={styles.errorComponent}>
      <strong>Algo deu errado...</strong>
      <span className={styles.errorMessage}>Tente novamente mais tarde.</span>
    </div>
  );
}
