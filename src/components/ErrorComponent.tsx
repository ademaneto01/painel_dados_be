import styles from '@/styles/Error.module.css';
interface ModalValidationProps {
  message: string;
}
export default function ErrorComponent({
  message,
}: ModalValidationProps): JSX.Element {
  return (
    <div className={styles.errorComponent}>
      <strong>{message}.</strong>
    </div>
  );
}
