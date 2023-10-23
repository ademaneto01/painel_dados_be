import Image from 'next/image';
import React from 'react';
import styles from '@/styles/TopNavBar.module.css';
import { TfiMenu } from 'react-icons/tfi';
import { useState, useEffect } from 'react';
import BackendApiMock from '@/backendApi';
import { ModalTopNavBaR } from '../modal';

interface TopNavBarProps {
  toggleSideNavBar: VoidFunction;
}

export default function TopNavBar(props: TopNavBarProps) {
  const [nome, setNome] = useState('');
  const [escola, setEscola] = useState('');
  const [modalTopNavBaR, setModalTopNavBaR] = useState(false);

  const handleOpen = () => {
    setModalTopNavBaR(true)
    console.log('ok')
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

      <button onClick={handleOpen}>
        modalteste
      </button>
      {modalTopNavBaR && <ModalTopNavBaR/>}
    </div>
  );
}
