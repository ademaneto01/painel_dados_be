'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import { PageEnum } from '@/enums';
import SideNavBar from '@/components/sideNavBar';
import TopNavBar from '@/components/topNavBaR';
import dynamic from 'next/dynamic';
import { BackendApiGet } from '@/backendApi';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/shared';

const Users = dynamic(() => import('@/components/pages/Users'));
const DigitalResources = dynamic(
  () => import('@/components/pages/DigitalResources'),
);
const Contratos = dynamic(
  () => import('@/components/pages/ContratoModule/SwitchCaseContratos'),
);
const EscolasPDG = dynamic(
  () => import('@/components/pages/escolasPDGModule/SwitchCaseEscolasPDG'),
);
const AgentesExterno = dynamic(
  () =>
    import('@/components/pages/agentesExternoModule/SwitchCaseAgentesExterno'),
);
const AcompanhamentoPDG = dynamic(
  () => import('@/components/pages/acompanhamentoPDG/SwitchCaseAcompanhamento'),
);

export default function Home(): JSX.Element {
  const router = useRouter();
  const [sideNavBarHidden, setSideNavBarHidden] = useState(false);
  const [page, setPage] = useState(PageEnum.loaderPage);
  const [perfil, setPerfil] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('userId');

    const backendApi = new BackendApiGet(`${token}`);
    const fetchUserData = async () => {
      try {
        const user = await backendApi.localizarUsuario(userId);

        if (user && user.length > 0) {
          setPerfil(user[0].perfil || '');

          switch (user[0].perfil) {
            case 'Administrador':
              setPage(PageEnum.users);
              break;
            case 'Pedagógico':
              setPage(PageEnum.escolasPDG);
              break;
            case 'Escola':
              setPage(PageEnum.digitalResources);
              break;
            default:
              setPage(PageEnum.loaderPage);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/');
      }
    };

    fetchUserData();
  }, []);

  function toggleSideNavBar(): void {
    setSideNavBarHidden(!sideNavBarHidden);
  }

  function renderPage(): JSX.Element {
    switch (page) {
      case PageEnum.users:
        return <Users />;
      case PageEnum.digitalResources:
        return <DigitalResources />;
      case PageEnum.contratos:
        return <Contratos />;
      case PageEnum.escolasPDG:
        return <EscolasPDG />;
      case PageEnum.agentesExterno:
        return <AgentesExterno />;
      case PageEnum.acompanhamentoPDG:
        return <AcompanhamentoPDG />;
      default:
        return <></>;
    }
  }

  function expandable(style: string): string {
    return `${style}${sideNavBarHidden ? ` ${styles.expanded}` : ''}`;
  }

  if (page === PageEnum.loaderPage) {
    return (
      <div className={styles.containerFundo}>
        <div className={styles.boxLoaderLogin}>
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <main className={styles.main}>
        <TopNavBar
          toggleSideNavBar={toggleSideNavBar}
          hidden={sideNavBarHidden}
        />
        <SideNavBar
          hidden={sideNavBarHidden}
          activePage={page}
          setPage={setPage}
        />
        <div className={expandable(styles.pageContainer)}>{renderPage()}</div>
      </main>
    );
  }
}
