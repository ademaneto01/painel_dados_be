'use client';
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
}

export const GlobalContext = createContext<ContextProps>({
  usersUpdated: false,
  setUsersUpdated: () => {},
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usersUpdated, setUsersUpdated] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        usersUpdated,
        setUsersUpdated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
