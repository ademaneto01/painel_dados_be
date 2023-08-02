import styles from '@/styles/Error.module.css';

export default function ErrorComponent(): JSX.Element {
  return (
    <div className={styles.errorComponent}>
      <strong>Algo deu errado...</strong>
    </div>
  );
}
