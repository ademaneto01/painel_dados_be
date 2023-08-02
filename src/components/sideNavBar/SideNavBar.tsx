import { PageEnum } from '@/enums';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { ImUser, ImDisplay, ImLock } from 'react-icons/im';
import SideNavBarButton from './SideNavBarButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
// import BackendApiMock from '@/backendApi';
// import { FailedToFetchError } from '@/errors';
import { EntitiesOneUser } from '@/entities';
import { NextResponse } from 'next/server';

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: '1.15em' } });
}

interface SideNavBarProps {
  hidden: boolean;
  setPage: Dispatch<SetStateAction<PageEnum>>;
  activePage: PageEnum;
}

export default function SideNavBar(props: SideNavBarProps) {
  const perfil = Cookies.get('perfil');
  const router = useRouter();
  // const token = Cookies.get('auth_token');
  const [data, setData] = useState([] as EntitiesOneUser[]);
  const [loaded, setLoaded] = useState(false);
  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.hidden}` : '');
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const backendApi = new BackendApiMock(`${token}`);
  //       const user = await backendApi.findOneUser({
  //         userId,
  //       });
  //       setData(user);
  //     } catch (error) {
  //       if (error instanceof FailedToFetchError) {
  //         console.log(error);
  //       } else {
  //         throw error;
  //       }
  //     } finally {
  //       setLoaded(true);
  //     }
  //   }
  //   if (!loaded) {
  //     fetchData();
  //   }
  // }, [loaded]);

  function isActive(page: PageEnum): boolean {
    return page === props.activePage;
  }
  function logOut() {
    Cookies.remove('perfil');
    Cookies.remove('auth_token');
    Cookies.remove('userId');
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
          hidden={perfil === 'admin' ? true : false}
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
