import { PageEnum } from '@/enums';
import React from 'react';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { ImUser, ImDisplay, ImList2 } from 'react-icons/im';
import SideNavBarButton from './SideNavBarButton';
import { BackendApiGet } from '@/backendApi';

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: '1.15em' } });
}

interface SideNavBarProps {
  hidden: boolean;
  setPage: Dispatch<SetStateAction<PageEnum>>;
  activePage: PageEnum;
}

export default function SideNavBar(props: SideNavBarProps) {
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
          text="Agentes Externo"
          onClick={() => {
            props.setPage(PageEnum.agentesExterno);
          }}
          icon={reactIcon(ImUser)}
          active={isActive(PageEnum.agentesExterno)}
          hidden={
            perfil === 'Administrador' || perfil === 'Pedagógico' ? true : false
          }
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
      </div>
    </div>
  );
}
