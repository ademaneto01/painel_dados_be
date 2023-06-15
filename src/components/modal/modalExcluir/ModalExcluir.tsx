import React from "react";
import styles from "./ModalValidation.module.css";

interface ModalValidationProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModaExcluir: React.FC<ModalValidationProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
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

export default ModaExcluir;