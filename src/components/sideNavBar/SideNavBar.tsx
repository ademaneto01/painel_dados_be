import { PageEnum } from '@/enums';
import React from 'react';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { ImUser, ImDisplay, ImLock, ImList2 } from 'react-icons/im';
import SideNavBarButton from './SideNavBarButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import BackendApiMock from '@/backendApi';
import { PageLoader } from '../shared';

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: '1.15em' } });
}

interface SideNavBarProps {
  hidden: boolean;
  setPage: Dispatch<SetStateAction<PageEnum>>;
  activePage: PageEnum;
}

export default function SideNavBar(props: SideNavBarProps) {
  const router = useRouter();
  const [perfil, setPerfil] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('userId');
    const backendApi = new BackendApiMock(`${token}`);
    const fetchUserData = async () => {
      try {
        const user = await backendApi.localizarUsuario({
          userId,
        });

        if (user && user.length > 0) {
          setPerfil(user[0].perfil || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.hidden}` : '');
  }

  function isActive(page: PageEnum): boolean {
    return page === props.activePage;
  }

  function logOut() {
    setLoaded(true);
    localStorage.clear();
    Cookies.remove('auth_token');
    router.replace('/login');
  }

  return (
    <>
      <div className={hidable(styles.navBar)}>
        <div className={styles.buttonsContainer}>
          <SideNavBarButton
            text="Usuários"
            onClick={() => {
              props.setPage(PageEnum.users);
            }}
            icon={reactIcon(ImUser)}
            active={isActive(PageEnum.users)}
            hidden={perfil === 'Administrador' ? true : false}
          />
          <SideNavBarButton
            text="Contratos"
            onClick={() => {
              props.setPage(PageEnum.contratos);
            }}
            icon={reactIcon(ImList2)}
            active={isActive(PageEnum.contratos)}
            hidden={perfil === 'Administrador' ? true : false}
          />
          <SideNavBarButton
            text="Escolas"
            onClick={() => {
              props.setPage(PageEnum.escolasPDG);
            }}
            icon={reactIcon(ImList2)}
            active={isActive(PageEnum.escolasPDG)}
            hidden={perfil === 'Pedagógico' ? true : false}
          />
          <SideNavBarButton
            text="Recursos Digitais"
            onClick={() => {
              props.setPage(PageEnum.digitalResources);
            }}
            icon={reactIcon(ImDisplay)}
            active={isActive(PageEnum.digitalResources)}
            hidden={perfil === 'Escola' ? true : false}
          />

          <SideNavBarButton
            text="Logout"
            onClick={() => logOut()}
            icon={reactIcon(ImLock)}
            active={false}
            hidden={true}
          />
        </div>
      </div>
      {loaded ? <PageLoader /> : ''}
    </>
  );
}
