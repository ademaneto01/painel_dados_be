'use client';
import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { PageEnum } from '@/enums';
import { useState } from 'react';
import SideNavBar from '@/components/sideNavBar';
import TopNavBar from '@/components/topNavBaR';
import * as pages from '@/components/pages';
import { BackendApiGet } from '@/backendApi';
import { useRouter } from 'next/navigation';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [sideNavBarHidden, setSideNavBarHidden] = useState(false);
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

          if (user[0].perfil === 'Administrador') {
            setPage(PageEnum.users);
          } else if (user[0].perfil === 'Pedagógico') {
            setPage(PageEnum.escolasPDG);
          } else if (user[0].perfil === 'Escola') {
            setPage(PageEnum.digitalResources);
          } else {
            setPage(PageEnum.digitalResources);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [page, setPage] = useState(PageEnum.digitalResources);

  function toggleSideNavBar(): void {
    setSideNavBarHidden(!sideNavBarHidden);
  }

  function Page(): JSX.Element {
    switch (page) {
      case PageEnum.users:
        return <pages.Users />;
      case PageEnum.digitalResources:
        return <pages.DigitalResources />;
      case PageEnum.contratos:
        return <pages.Contratos />;
      case PageEnum.escolasPDG:
        return <pages.EscolasPDG />;
      case PageEnum.agentesExterno:
        return <pages.AgentesExterno />;
      case PageEnum.acompanhamentoPDG:
        return <pages.pagesAcompanhamento />;
      default:
        return <></>;
    }
  }

  function expandable(style: string): string {
    return style + (sideNavBarHidden ? ` ${styles.expanded}` : '');
  }

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
      <div className={expandable(styles.pageContainer)}>
        <Page />
      </div>
    </main>
  );
}
