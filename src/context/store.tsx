'use client';
import { PageEnumContratos } from '@/enums';
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
  page: string;
  setPage: Dispatch<SetStateAction<PageEnumContratos>>;
  idContrato: string;
  setIdContrato: Dispatch<SetStateAction<string>>;
  idEntidadeEscolar: string;
  setIdEntidadeEscolar: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<ContextProps>({
  usersUpdated: false,
  setUsersUpdated: () => {},
  page: PageEnumContratos.entidadesContratuais,
  setPage: () => {},
  idContrato: '',
  setIdContrato: () => {},
  idEntidadeEscolar: '',
  setIdEntidadeEscolar: () => {},
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usersUpdated, setUsersUpdated] = useState(false);
  const [page, setPage] = useState(PageEnumContratos.entidadesContratuais);
  const [idContrato, setIdContrato] = useState('');
  const [idEntidadeEscolar, setIdEntidadeEscolar] = useState('');
  return (
    <GlobalContext.Provider
      value={{
        usersUpdated,
        setUsersUpdated,
        page,
        setPage,
        idContrato,
        setIdContrato,
        idEntidadeEscolar,
        setIdEntidadeEscolar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
