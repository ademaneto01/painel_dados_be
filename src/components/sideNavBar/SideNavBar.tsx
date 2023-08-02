import { PageEnum } from '@/enums';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { IconType } from 'react-icons';
import { ImUser, ImDisplay, ImLock } from 'react-icons/im';
import SideNavBarButton from './SideNavBarButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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

  const perfil = localStorage.getItem('perfil');
  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.hidden}` : '');
  }

  function isActive(page: PageEnum): boolean {
    return page === props.activePage;
  }
  function logOut() {
    localStorage.removeItem('perfil');
    localStorage.removeItem('userId');
    localStorage.removeItem('auth_token');
    Cookies.remove('auth_token');
    router.push('/login');
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
