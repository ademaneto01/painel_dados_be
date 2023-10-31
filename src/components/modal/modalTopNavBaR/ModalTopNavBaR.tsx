import React from 'react';
import styles from '@/styles/ModalTopNavBaR.module.css';
import { ImLock } from 'react-icons/im';

interface ModalValidationProps {
  button1: () => void;
  onCancel: () => void;
}

const ModalTopNavBaR: React.FC<ModalValidationProps> = ({
  button1,
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
        <div className={styles.buttonContainer}>
          <button onClick={button1} className={styles.btn}>
            {' '}
            <ImLock /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTopNavBaR;
