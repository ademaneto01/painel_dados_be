'use client';
import styles from '@/styles/Home.module.css';
import '../styles/global.css';
import { PageEnum } from '@/enums';
import { useState } from 'react';
import SideNavBar from '@/components/sideNavBar';
import TopNavBar from '@/components/topNavBaR';
import pages from '@/components/pages/index';

export default function Home(): JSX.Element {
  const [page, setPage] = useState(PageEnum.digitalResources);
  const [sideNavBarHidden, setSideNavBarHidden] = useState(false);

  function toggleSideNavBar(): void {
    setSideNavBarHidden(!sideNavBarHidden);
  }

  function Page(): JSX.Element {
    switch (page) {
      case PageEnum.schools:
        return <pages.Schools />;
      case PageEnum.lessonsPlans:
        return <pages.LessonsPlans />;
      case PageEnum.documentation:
        return <pages.Documentation />;
      case PageEnum.users:
        return <pages.Users />;
      case PageEnum.digitalResources:
        return <pages.DigitalResources />;
      case PageEnum.materials:
        return <pages.Materials />;
      case PageEnum.tools:
        return <pages.Tools />;
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
