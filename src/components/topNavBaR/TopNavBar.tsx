import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/TopNavBar.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsArrowDownCircle } from 'react-icons/bs';
import { TbLayoutSidebarRightExpand } from 'react-icons/tb';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import BackendApiMock from '@/backendApi';
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
            <TbLayoutSidebarRightCollapse size="2em" />
          ) : (
            <TbLayoutSidebarRightExpand size="2em" />
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
          <a className={styles.toogleTopNav}
            onClick={handleOpen}>
            {modalTopNavBaR
              ? renderIcon(AiFillCloseCircle)
              : renderIcon(BsArrowDownCircle)}
          </a>
          {modalTopNavBaR && (
            <ModalTopNavBaR
              onCancel={() => {
                setModalTopNavBaR(false);
              }}
              button1={logOut}
              title={'Menu'}
            />
          )}
        </div>
      </div>
      {loaded ? <PageLoader /> : ''}
    </>
  );
}
