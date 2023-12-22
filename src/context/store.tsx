'use client';
import {
  PageEnumContratos,
  PageEnumEscolasPDG,
  PageEnumAgentesExterno,
  PageEnumAcompanhamentoPDG,
} from '@/enums';

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';

interface ContextProps {
  usersUpdated: boolean;
  setUsersUpdated: Dispatch<SetStateAction<boolean>>;
  showPageVisualizeAcompanhamento: string;
  setShowPageVisualizeAcompanhamento: Dispatch<SetStateAction<string>>;
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
  usersUpdated: false,
  setUsersUpdated: () => {},
  showPageVisualizeAcompanhamento: '',
  setShowPageVisualizeAcompanhamento: () => {},
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
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usersUpdated, setUsersUpdated] = useState(false);
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
  const [showPageVisualizeAcompanhamento, setShowPageVisualizeAcompanhamento] =
    useState('');
  const [idContrato, setIdContrato] = useState('');
  const [idAgente, setIdAgente] = useState('');
  const [idEntidadeEscolar, setIdEntidadeEscolar] = useState('');
  const [globalAnoRef, setGlobalAnoRef] = useState('');
  return (
    <GlobalContext.Provider
      value={{
        showPageVisualizeAcompanhamento,
        setShowPageVisualizeAcompanhamento,
        usersUpdated,
        setUsersUpdated,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
