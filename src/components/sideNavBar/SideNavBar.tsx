import { PageEnum, pageEnumAcompanhamentoPDG } from '@/enums';
import React from 'react';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { RiComputerFill, RiComputerLine } from 'react-icons/ri';
import SideNavBarButton from './SideNavBarButton';
import { BackendApiGet } from '@/backendApi';
import {
  PiUsers,
  PiUserSquare,
  PiUserSquareFill,
  PiUsersFill,
} from 'react-icons/pi';
import {
  IoDocumentsOutline,
  IoDocuments,
  IoSchool,
  IoSchoolOutline,
} from 'react-icons/io5';

function reactIcon(icon: IconType, color?: string): JSX.Element {
  return icon({ style: { fontSize: '1.3em', color: color } });
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
          text={'Usuários'}
          onClick={() => {
            props.setPage(PageEnum.users);
          }}
          icon={
            isActive(PageEnum.users)
              ? reactIcon(PiUserSquareFill)
              : reactIcon(PiUserSquare)
          }
          active={isActive(PageEnum.users)}
          hidden={perfil === 'Administrador' ? true : false}
        />
        <SideNavBarButton
          text={'Agentes Externos'}
          onClick={() => {
            props.setPage(PageEnum.agentesExterno);
          }}
          icon={
            isActive(PageEnum.agentesExterno)
              ? reactIcon(PiUsersFill)
              : reactIcon(PiUsers)
          }
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
          icon={
            isActive(PageEnum.contratos)
              ? reactIcon(IoDocuments)
              : reactIcon(IoDocumentsOutline)
          }
          active={isActive(PageEnum.contratos)}
          hidden={perfil === 'Administrador' ? true : false}
        />
        <SideNavBarButton
          text="Escolas"
          onClick={() => {
            props.setPage(PageEnum.escolasPDG);
          }}
          icon={
            isActive(PageEnum.escolasPDG)
              ? reactIcon(IoSchool)
              : reactIcon(IoSchoolOutline)
          }
          active={isActive(PageEnum.escolasPDG)}
          hidden={perfil === 'Pedagógico' ? true : false}
        />
        <SideNavBarButton
          text="Acompanhamento"
          onClick={() => {
            props.setPage(PageEnum.acompanhamentoPDG);
          }}
          icon={
            isActive(PageEnum.escolasPDG)
              ? reactIcon(IoSchool)
              : reactIcon(IoSchoolOutline)
          }
          active={isActive(PageEnum.escolasPDG)}
          hidden={perfil === 'Administrador' ? true : false}
        />
        <SideNavBarButton
          text="Recursos Digitais"
          onClick={() => {
            props.setPage(PageEnum.digitalResources);
          }}
          icon={
            isActive(PageEnum.digitalResources)
              ? reactIcon(RiComputerFill)
              : reactIcon(RiComputerLine)
          }
          active={isActive(PageEnum.digitalResources)}
          hidden={perfil === 'Escola' ? true : false}
        />
      </div>
    </div>
  );
}
