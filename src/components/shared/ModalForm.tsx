import styles from '@/styles/ModalForm.module.css';
import { FormEvent } from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: (e: FormEvent) => void;
}

function ModalForm(props: ModalProps) {
  return (
    <div className={styles.background} onClick={props.onCancel}>
      <form
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
        onSubmit={props.onSubmit}
      >
        {props.title && <h1>{props.title}</h1>}
        {props.children}
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={props.onCancel}
          >
            Cancelar
          </button>
          <button className={styles.confirmButton} type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
