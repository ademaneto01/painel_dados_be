import React from 'react';
import styles from '@/styles/ModalDelete.module.css';

interface ModalValidationProps {
  title: string;
  message: string;
  // onConfirm: () => void;
  onCancel: () => void;
}

const ModalDelete: React.FC<ModalValidationProps> = ({
  title,
  message,
  // onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p id={styles.text}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton}>Sim</button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
