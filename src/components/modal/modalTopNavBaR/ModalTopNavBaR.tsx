import React from 'react';
import styles from '@/styles/ModalTopNavBaR.module.css';

interface ModalValidationProps {
  button1: () => void;
  onCancel: () => void;
<<<<<<< HEAD
  title: string;
  text: string;
  icon: JSX.Element;
=======
>>>>>>> ademarNew
}

const ModalTopNavBaR: React.FC<ModalValidationProps> = ({
  button1,
  onCancel,
<<<<<<< HEAD
  title,
  text,
  icon,
=======
>>>>>>> ademarNew
}) => {
  return (
    <div className={styles.background} onClick={onCancel}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
<<<<<<< HEAD
        <div className={styles.title}>{title}</div>
        <div className={styles.buttonContainer}>
          <a onClick={button1} className={styles.btn}>
              <span className={styles.icon}>{icon}</span>
              <span className={styles.text}/> {text}
          </a>
=======
        <div className={styles.buttonContainer}>
          <button onClick={button1} className={styles.btn}>
            {' '}
            <ImLock /> Logout
          </button>
>>>>>>> ademarNew
        </div>
      </div>
    </div>
  );
};

export default ModalTopNavBaR;
