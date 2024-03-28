import { PageEnum, PageEnumAcompanhamentoPDG } from '@/enums';
import React from 'react';
import styles from '@/styles/SideNavBar.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { RiComputerFill, RiComputerLine } from 'react-icons/ri';
import { BsBuildings, BsBuildingsFill } from 'react-icons/bs';
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
import { ErrorComponent } from '@/errors';
import handleApiErrors from '@/utils/HandleApiErrors';

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
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');

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
      } catch (error: any) {
        handleApiErrors(error, setError, setMsgError);
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
          buttonHidden={props.hidden && perfil === 'Administrador'}
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
          buttonHidden={
            props.hidden &&
            (perfil === 'Administrador' || perfil === 'Pedagógico')
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
          buttonHidden={props.hidden && perfil === 'Administrador'}
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
              ? reactIcon(BsBuildingsFill)
              : reactIcon(BsBuildings)
          }
          buttonHidden={props.hidden && perfil === 'Pedagógico'}
          active={isActive(PageEnum.escolasPDG)}
          hidden={perfil === 'Pedagógico' ? true : false}
        />
        <SideNavBarButton
          text="Acompanhamentos"
          onClick={() => {
            props.setPage(PageEnum.acompanhamentoPDG);
          }}
          icon={
            isActive(PageEnum.acompanhamentoPDG)
              ? reactIcon(IoSchool)
              : reactIcon(IoSchoolOutline)
          }
          buttonHidden={props.hidden && perfil === 'Pedagógico'}
          active={isActive(PageEnum.acompanhamentoPDG)}
          hidden={perfil === 'Pedagógico' ? true : false}
        />
        <SideNavBarButton
          text="Painel de Acompanhamento"
          onClick={() => {
            props.setPage(PageEnum.digitalResources);
          }}
          icon={
            isActive(PageEnum.digitalResources)
              ? reactIcon(RiComputerFill)
              : reactIcon(RiComputerLine)
          }
          buttonHidden={props.hidden && perfil === 'Escola'}
          active={isActive(PageEnum.digitalResources)}
          hidden={perfil === 'Escola' ? true : false}
        />
      </div>
      {error && <ErrorComponent message={msgError} />}
    </div>
  );
}
