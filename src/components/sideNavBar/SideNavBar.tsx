import { PageEnum } from '@/enums';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { ImUser, ImDisplay, ImLock } from 'react-icons/im';
import SideNavBarButton from './SideNavBarButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/store';
import BackendApiMock from '@/backendApi';
import router from 'next/router';

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

  // useEffect(() => {
  //   const perfilValue = localStorage.getItem('perfil');
  //   setPerfil(perfilValue || '');
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('userId');
    const backendApi = new BackendApiMock(`${token}`);
    const fetchUserData = async () => {
      try {
        const user = await backendApi.findOneUser({
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
    localStorage.clear();
    Cookies.remove('auth_token');
    router.replace('/login');
  }

  return (
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
          text="Recursos Digitais"
          onClick={() => {
            props.setPage(PageEnum.digitalResources);
          }}
          icon={reactIcon(ImDisplay)}
          active={isActive(PageEnum.digitalResources)}
          hidden={true}
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
  );
}
