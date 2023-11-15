import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/TopNavBar.module.css';

import { AiFillCloseCircle } from 'react-icons/ai';
import { IoPowerOutline } from 'react-icons/io5';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { BackendApiGet } from '@/backendApi';

import { ModalTopNavBaR } from '../modal';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { PageLoader } from '../shared';
import { CgLogOut } from 'react-icons/cg';
import { IconType } from 'react-icons';

interface TopNavBarProps {
  toggleSideNavBar: () => void;
  hidden: boolean;
}

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: '1.15em' } });
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
            <GoSidebarCollapse size="2em" />
          ) : (
            <GoSidebarExpand size="2em" />
          )}
        </a>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/logo_be_branco-H.png"
            alt="Beyond by Be"
            priority={true}
            aspect-ratio={1}
            width={120}
            height={50}
          />
        </div>

        <div className={styles.spacer} />

        <a className={styles.user}>{`${nome} - ${escola}`}</a>

        <div className={styles.container}>
          <a className={styles.toogleTopNav} onClick={handleOpen}>
            {modalTopNavBaR
              ? renderIcon(AiFillCloseCircle)
              : renderIcon(IoPowerOutline)}
          </a>
          {modalTopNavBaR && (
            <ModalTopNavBaR
              onCancel={() => {
                setModalTopNavBaR(false);
              }}
              button1={logOut}
              title={'Menu'}
              text={'Logout'}
              icon={reactIcon(CgLogOut)}
            />
          )}
        </div>
      </div>
      {loaded ? <PageLoader /> : ''}
    </>
  );
}
