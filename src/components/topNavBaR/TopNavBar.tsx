import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/TopNavBar.module.css';
import { TfiMenu } from 'react-icons/tfi';
import { AiOutlineCodepenCircle, AiOutlineCodepen} from 'react-icons/ai';
import { ImUser, ImDisplay, ImLock, ImList2 } from 'react-icons/im';
import BackendApiMock from '@/backendApi';
import { ModalTopNavBaR } from '../modal';
import { useRouter } from 'next/router';

interface TopNavBarProps {
  toggleSideNavBar: () => void;
}

export default function TopNavBar(props: TopNavBarProps) {
  const [nome, setNome] = useState('');
  const [escola, setEscola] = useState('');
  const [modalTopNavBaR, setModalTopNavBaR] = useState(false);

  const handleOpen = () => {
    setModalTopNavBaR(true);
  };


  useEffect(() => {
    const nomeStorage = localStorage.getItem('userNome');
    const escolaStorageId = localStorage.getItem('escola');
    const token = localStorage.getItem('authToken');

    const backendApi = new BackendApiMock(`${token}`);
    const fetchUserData = async () => {
      try {
        const user = await backendApi.localizarEntitadeEscolar({
          id: escolaStorageId,
        });

        setEscola(user[0].nome_operacional || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    setNome(nomeStorage || '');
  }, []);

  const renderIcon = (IconComponent: React.ElementType) => <IconComponent size="2.3em" />;

  return (
    <div className={styles.topNavBar}>
      <a className={styles.toogleTopNav} onClick={props.toggleSideNavBar}>
        <TfiMenu size="1.1em" />
      </a>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/beyond_by_be.png"
          alt="Beyond by Be"
          priority={true}
          width={120}
          height={28}
        />
      </div>

      <div className={styles.spacer} />

      <a className={styles.user}>{`${nome} - ${escola}`}</a>

      <div className={styles.container}>
      <button
        onClick={handleOpen}
        style={{ background: 'none', border: 'none', outline: 'none' }}
      >
        {modalTopNavBaR ? (
          renderIcon(AiOutlineCodepen)
          ) : (
        renderIcon(AiOutlineCodepenCircle)
        )}
      </button>
      {modalTopNavBaR && (
        <ModalTopNavBaR
          title="Your Title"
          onCancel={() => {
            setModalTopNavBaR(false);
          }}
          button1={() => {}}
          button2={() => {}}
          button3={() => {}}
          button4={() => {}}
        />
      )}
      </div>
    </div>
  );
}
