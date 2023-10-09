import React from 'react';
import styles from '@/styles/ModalDelete.module.css';

interface ModalValidationProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalDelete: React.FC<ModalValidationProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.background} onClick={onCancel}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className={styles.title}>{title}</h2>
        <p id={styles.text}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Sim
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
