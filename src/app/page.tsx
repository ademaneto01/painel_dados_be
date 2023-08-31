'use client';
import styles from '@/styles/Home.module.css';
import { PageEnum } from '@/enums';
import { useState } from 'react';
import SideNavBar from '@/components/sideNavBar';
import TopNavBar from '@/components/topNavBaR';
import * as pages from '@/components/pages';

export default function Home(): JSX.Element {
  const [page, setPage] = useState(PageEnum.digitalResources);
  const [sideNavBarHidden, setSideNavBarHidden] = useState(false);

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
