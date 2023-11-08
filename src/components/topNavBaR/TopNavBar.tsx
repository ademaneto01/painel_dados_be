import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/TopNavBar.module.css';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { TbAtom2Filled } from 'react-icons/tb';
import { GiPowerButton } from 'react-icons/gi';
import { PiPowerFill } from 'react-icons/pi';
import { BackendApiGet } from '@/backendApi';
import { ModalTopNavBaR } from '../modal';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { PageLoader } from '../shared';

interface TopNavBarProps {
  toggleSideNavBar: () => void;
  hidden: boolean;
}

export default function TopNavBar(props: TopNavBarProps) {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [escola, setEscola] = useState('');
  const [modalTopNavBaR, setModalTopNavBaR] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleOpen = () => {
    setModalTopNavBaR(true);
  };

  useEffect(() => {
    const nomeStorage = localStorage.getItem('userNome');
    const id = localStorage.getItem('escola');
    const token = localStorage.getItem('auth_token');

    const backendApi = new BackendApiGet(`${token}`);
    const fetchUserData = async () => {
      try {
        const user = await backendApi.localizarEntidadeEscolar(id);

        setEscola(user[0].nome_operacional || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    setNome(nomeStorage || '');
  }, []);

  function logOut() {
    setLoaded(true);
    localStorage.clear();
    Cookies.remove('auth_token');
    router.replace('/login');
  }

  const renderIcon = (IconComponent: React.ElementType) => (
    <IconComponent size="2em" style={{ cursor: 'pointer' }} />
  );

  return (
    <>
      <div className={styles.topNavBar}>
        <a className={styles.toogleTopNav} onClick={props.toggleSideNavBar}>
          {props.hidden ? (
            <HiOutlineDotsCircleHorizontal size="2em" />
          ) : (
            <TbAtom2Filled size="2em" />
          )}
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
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--azul-tech)',
            }}
          >
            {modalTopNavBaR
              ? renderIcon(PiPowerFill)
              : renderIcon(GiPowerButton)}
          </button>
          {modalTopNavBaR && (
            <ModalTopNavBaR
              onCancel={() => {
                setModalTopNavBaR(false);
              }}
              button1={logOut}
            />
          )}
        </div>
      </div>
      {loaded ? <PageLoader /> : ''}
    </>
  );
}
