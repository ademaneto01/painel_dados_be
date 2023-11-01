import React from 'react';
import styles from '@/styles/ModalTopNavBaR.module.css';

interface ModalValidationProps {
  button1: () => void;
  onCancel: () => void;
  title: string;
}

const ModalTopNavBaR: React.FC<ModalValidationProps> = ({
  button1,
  onCancel,
  title,
}) => {
  return (
    <div className={styles.background} onClick={onCancel}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.buttonContainer}>
          <button onClick={button1} className={styles.btn}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTopNavBaR;
