import React, { useState } from 'react';
import styles from '@/styles/ModalTopNavBaR.module.css';

interface ModalValidationProps {
    title: string;
    button1: () => void;
    button2: () => void;
    button3: () => void;
    button4: () => void;
    onCancel: () => void;
  }
  
  const ModalTopNavBaR: React.FC<ModalValidationProps> = ({
    title,
    button1,
    button2,
    button3,
    button4,
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
        <div className={styles.buttonContainer}>
          <button onClick={button1} className={styles.btn}>Button 1</button>
          <button onClick={button2} className={styles.btn}>Button 2</button>
          <button onClick={button3} className={styles.btn}>Button 3</button>
          <button onClick={button4} className={styles.btn}>Button 4</button>
        </div>
      </div>
    </div>
  );
};

export default ModalTopNavBaR;
// function logOut() {
//     setLoaded(true);
//     localStorage.clear();
//     Cookies.remove('auth_token');
//     router.replace('/login');
//   }
/* <SideNavBarButton
            text="Logout"
            onClick={() => logOut()}
            icon={reactIcon(ImLock)}
            active={false}
            hidden={true}
          /> */