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
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors';
import handleApiErrors from '@/utils';

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
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setIsLoadingLogOut } = useGlobalContext();
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
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
      }
    };
    fetchUserData();
    setNome(nomeStorage || '');
  }, []);

  function logOut() {
    setIsLoadingLogOut(false);
    router.replace('/login');
    setTimeout(() => {
      localStorage.clear();
      Cookies.remove('auth_token');
    }, 1600);
  }

  const renderIcon = (IconComponent: React.ElementType) => (
    <IconComponent size="2em" style={{ cursor: 'pointer' }} />
  );

  return (
    <>
      <div className={styles.topNavBar}>
        <a className={styles.toogleTopNav} onClick={props.toggleSideNavBar}>
          {props.hidden ? (
            <GoSidebarCollapse size="1.5em" />
          ) : (
            <GoSidebarExpand size="1.5em" />
          )}
        </a>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/BE_logo_horizontal_bco_2.png"
            alt="Logo be Branco"
            priority={true}
            aspect-ratio={1}
            width={80}
            height={43}
            margin-bottom={5}
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
              title={
                <Image
                  className={styles.logo}
                  src="/BE_logo_horizontal_cor_1.png"
                  alt="Logo Be cor"
                  priority={true}
                  aspect-ratio={1}
                  width={113}
                  height={60}
                />
              }
              text={'Logout'}
              icon={reactIcon(CgLogOut)}
            />
          )}
        </div>
      </div>
      {loaded ? <PageLoader /> : ''}
      {error && <ErrorComponent message={msgError} />}
    </>
  );
}
