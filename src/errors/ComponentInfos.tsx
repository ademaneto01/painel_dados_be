import styles from '@/styles/Error.module.css';
interface ModalValidationProps {
  message: string;
}
export default function ComponentInfos({
  message,
}: ModalValidationProps): JSX.Element {
  return (
    <div className={styles.infosComponent}>
      <span>
        <strong>{message}</strong>
        <span className={styles.loadingDots}>
          <strong className={styles.loadingDot}>.</strong>
          <strong className={styles.loadingDot}>.</strong>
          <strong className={styles.loadingDot}>.</strong>
        </span>
      </span>
    </div>
  );
}
