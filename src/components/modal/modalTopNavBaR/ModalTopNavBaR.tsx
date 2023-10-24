import React from 'react';
import styles from '@/styles/ModalTopNavBaR.module.css';

const ModalTopNavBar: React.FC = () => {
    return (
        <div className={styles.test}>
            <h1>Modal Top Nav Bar</h1>
        </div>
    );
};

export default ModalTopNavBar;

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