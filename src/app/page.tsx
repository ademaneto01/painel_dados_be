'use client';
import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { PageEnum } from '@/enums';
import { useState } from 'react';
import SideNavBar from '@/components/sideNavBar';
import TopNavBar from '@/components/topNavBaR';
import * as pages from '@/components/pages';
import BackendApiMock from '@/backendApi';

export default function Home(): JSX.Element {
  const [sideNavBarHidden, setSideNavBarHidden] = useState(false);
  const [perfil, setPerfil] = useState('');

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

  const [page, setPage] = useState(
    perfil === 'Administrador' ? PageEnum.digitalResources : PageEnum.users,
  );

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
        return <pages.EscolasPDG setPage={setPage} />;
      default:
        return <></>;
    }
  }

  function expandable(style: string): string {
    return style + (sideNavBarHidden ? ` ${styles.expanded}` : '');
  }

  return (
    <main>
      <TopNavBar toggleSideNavBar={toggleSideNavBar} />
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
