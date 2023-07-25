import { PageEnum } from '@/enums';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';
import {
  ImOffice,
  ImBook,
  ImFolderOpen,
  ImUser,
  ImDisplay,
  ImBooks,
  ImLock,
} from 'react-icons/im';
import SideNavBarButton from './SideNavBarButton';

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: '1.15em' } });
}

interface SideNavBarProps {
  hidden: boolean;
  setPage: Dispatch<SetStateAction<PageEnum>>;
  activePage: PageEnum;
}

export default function SideNavBar(props: SideNavBarProps) {
  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.hidden}` : '');
  }

  function isActive(page: PageEnum): boolean {
    return page === props.activePage;
  }

  return (
    <div className={hidable(styles.navBar)}>
      <div className={styles.buttonsContainer}>
        <SideNavBarButton
          text="Escolas"
          onClick={() => props.setPage(PageEnum.schools)}
          icon={reactIcon(ImOffice)}
          active={isActive(PageEnum.schools)}
          hidden={true}
        />
        <SideNavBarButton
          text="Lessons Plans"
          onClick={() => {
            props.setPage(PageEnum.lessonsPlans);
          }}
          icon={reactIcon(ImBook)}
          active={isActive(PageEnum.lessonsPlans)}
          hidden={true}
        />
        <SideNavBarButton
          text="Documentação"
          onClick={() => {
            props.setPage(PageEnum.documentation);
          }}
          icon={reactIcon(ImFolderOpen)}
          active={isActive(PageEnum.documentation)}
          hidden={true}
        />
        <SideNavBarButton
          text="Usuários"
          onClick={() => {
            props.setPage(PageEnum.users);
          }}
          icon={reactIcon(ImUser)}
          active={isActive(PageEnum.users)}
          hidden={true}
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
          text="Materials"
          onClick={() => {
            props.setPage(PageEnum.materials);
          }}
          icon={reactIcon(ImBooks)}
          active={isActive(PageEnum.materials)}
          hidden={true}
        />
        {/* <SideNavBarButton
          text="Tools"
          onClick={() => {
            props.setPage(PageEnum.tools);
          }}
          icon={reactIcon(ImWrench)}
          active={isActive(PageEnum.tools)}
          hidden={true}
        /> */}
        <SideNavBarButton
          text="Logout"
          onClick={() => {}}
          icon={reactIcon(ImLock)}
          active={false}
          hidden={true}
        />
      </div>
    </div>
  );
}
