'use client';
import {
  PageEnumContratos,
  PageEnumEscolasPDG,
  PageEnumAgentesExterno,
  PageEnumAcompanhamentoPDG,
} from '@/enums';
import { EntitiesContratos } from '@/entities';
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';

interface ContextProps {
  saveInfosContratoOld: boolean;
  setSaveInfosContratoOld: Dispatch<SetStateAction<boolean>>;
  modalSucessoSubsContrato: boolean;
  setModalSucessoSubsContrato: Dispatch<SetStateAction<boolean>>;
  loadedUser: boolean;
  setLoadedUser: Dispatch<SetStateAction<boolean>>;
  switchContrato: boolean;
  setSwitchContrato: Dispatch<SetStateAction<boolean>>;
  switchEntidadeEscolar: boolean;
  setSwitchEntidadeEscolar: Dispatch<SetStateAction<boolean>>;
  switchUsuarios: boolean;
  setSwitchUsuarios: Dispatch<SetStateAction<boolean>>;
  dataContrato: EntitiesContratos[];
  setDataContrato: Dispatch<SetStateAction<EntitiesContratos[]>>;
  usersUpdated: boolean;
  setUsersUpdated: Dispatch<SetStateAction<boolean>>;
  contractOrEntidadeUpdated: boolean;
  setContractOrEntidadeUpdated: Dispatch<SetStateAction<boolean>>;
  isLoadingLogOut: boolean;
  setIsLoadingLogOut: Dispatch<SetStateAction<boolean>>;
  showPageVisualizeAcompanhamento: string;
  setShowPageVisualizeAcompanhamento: Dispatch<SetStateAction<string>>;
  idAcompanhamento: string;
  setIdAcompanhamento: Dispatch<SetStateAction<string>>;
  page: string;
  setPage: Dispatch<SetStateAction<PageEnumContratos>>;
  pageAgentesExterno: string;
  setPageAgentesExterno: Dispatch<SetStateAction<PageEnumAgentesExterno>>;
  pageEscolasPDG: string;
  setPageEscolasPDG: Dispatch<SetStateAction<PageEnumEscolasPDG>>;
  idContrato: string;
  setIdContrato: Dispatch<SetStateAction<string>>;
  globalAnoRef: string;
  setGlobalAnoRef: Dispatch<SetStateAction<string>>;
  idEntidadeEscolar: string;
  setIdEntidadeEscolar: Dispatch<SetStateAction<string>>;
  idAgente: string;
  setIdAgente: Dispatch<SetStateAction<string>>;
  pageAcompanhamento: string;
  setPageAcompanhamento: Dispatch<SetStateAction<PageEnumAcompanhamentoPDG>>;
}

export const GlobalContext = createContext<ContextProps>({
  modalSucessoSubsContrato: false,
  setModalSucessoSubsContrato: () => {},
  loadedUser: false,
  setLoadedUser: () => {},
  contractOrEntidadeUpdated: false,
  setContractOrEntidadeUpdated: () => {},
  usersUpdated: false,
  setUsersUpdated: () => {},
  switchContrato: false,
  setSwitchContrato: () => {},
  switchEntidadeEscolar: false,
  setSwitchEntidadeEscolar: () => {},
  switchUsuarios: false,
  setSwitchUsuarios: () => {},
  isLoadingLogOut: false,
  setIsLoadingLogOut: () => {},
  showPageVisualizeAcompanhamento: '',
  setShowPageVisualizeAcompanhamento: () => {},
  idAcompanhamento: '',
  setIdAcompanhamento: () => {},
  page: PageEnumContratos.entidadesContratuais,
  setPage: () => {},
  pageAcompanhamento: PageEnumAcompanhamentoPDG.acompanhamentos,
  setPageAcompanhamento: () => {},
  pageEscolasPDG: PageEnumEscolasPDG.escolasPDG,
  idAgente: '',
  setIdAgente: () => {},
  setPageAgentesExterno: () => {},
  pageAgentesExterno: PageEnumAgentesExterno.agentes,
  setPageEscolasPDG: () => {},
  idContrato: '',
  setIdContrato: () => {},
  globalAnoRef: '',
  setGlobalAnoRef: () => {},
  idEntidadeEscolar: '',
  setIdEntidadeEscolar: () => {},
  dataContrato: [],
  setDataContrato: () => {},
  saveInfosContratoOld: false,
  setSaveInfosContratoOld: () => {},
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [saveInfosContratoOld, setSaveInfosContratoOld] = useState(false);
  const [modalSucessoSubsContrato, setModalSucessoSubsContrato] =
    useState(false);
  const [contractOrEntidadeUpdated, setContractOrEntidadeUpdated] =
    useState(false);
  const [loadedUser, setLoadedUser] = useState(false);
  const [switchContrato, setSwitchContrato] = useState(false);
  const [usersUpdated, setUsersUpdated] = useState(false);
  const [switchEntidadeEscolar, setSwitchEntidadeEscolar] = useState(false);
  const [switchUsuarios, setSwitchUsuarios] = useState(false);
  const [isLoadingLogOut, setIsLoadingLogOut] = useState(false);
  const [page, setPage] = useState(PageEnumContratos.entidadesContratuais);
  const [pageAcompanhamento, setPageAcompanhamento] = useState(
    PageEnumAcompanhamentoPDG.acompanhamentos,
  );
  const [pageAgentesExterno, setPageAgentesExterno] = useState(
    PageEnumAgentesExterno.agentes,
  );
  const [pageEscolasPDG, setPageEscolasPDG] = useState(
    PageEnumEscolasPDG.escolasPDG,
  );
  const [idAcompanhamento, setIdAcompanhamento] = useState('');
  const [showPageVisualizeAcompanhamento, setShowPageVisualizeAcompanhamento] =
    useState('');
  const [idContrato, setIdContrato] = useState('');
  const [idAgente, setIdAgente] = useState('');
  const [idEntidadeEscolar, setIdEntidadeEscolar] = useState('');
  const [globalAnoRef, setGlobalAnoRef] = useState('');
  const [dataContrato, setDataContrato] = useState<EntitiesContratos[]>([]);
  return (
    <GlobalContext.Provider
      value={{
        saveInfosContratoOld,
        setSaveInfosContratoOld,
        modalSucessoSubsContrato,
        setModalSucessoSubsContrato,
        loadedUser,
        setLoadedUser,
        contractOrEntidadeUpdated,
        setContractOrEntidadeUpdated,
        showPageVisualizeAcompanhamento,
        setShowPageVisualizeAcompanhamento,
        usersUpdated,
        setUsersUpdated,
        switchContrato,
        setSwitchContrato,
        switchEntidadeEscolar,
        setSwitchEntidadeEscolar,
        switchUsuarios,
        setSwitchUsuarios,
        isLoadingLogOut,
        setIsLoadingLogOut,
        page,
        setPage,
        pageAcompanhamento,
        setPageAcompanhamento,
        idAgente,
        setIdAgente,
        pageAgentesExterno,
        setPageAgentesExterno,
        pageEscolasPDG,
        setPageEscolasPDG,
        idContrato,
        setIdContrato,
        globalAnoRef,
        setGlobalAnoRef,
        idEntidadeEscolar,
        setIdEntidadeEscolar,
        idAcompanhamento,
        setIdAcompanhamento,
        dataContrato,
        setDataContrato,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
