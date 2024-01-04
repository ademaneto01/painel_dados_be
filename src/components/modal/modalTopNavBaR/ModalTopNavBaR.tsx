import React from 'react';
import styles from '@/styles/ModalTopNavBaR.module.css';

interface ModalValidationProps {
  button1: () => void;
  onCancel: () => void;
  title: React.ReactNode;
  text: string;
  icon: JSX.Element;
}

const ModalTopNavBaR: React.FC<ModalValidationProps> = ({
  button1,
  onCancel,
  title,
  text,
  icon,
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
          <a onClick={button1} className={styles.btn}>
              <span className={styles.icon}>{icon}</span>
              <span className={styles.text}/> {text}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalTopNavBaR;
