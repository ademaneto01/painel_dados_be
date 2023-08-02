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
  lesson: string;
  setLesson: Dispatch<SetStateAction<string>>;
  isAdmin: string;
  setIsAdmin: Dispatch<SetStateAction<string>>;
  usersUpdated: boolean;
  setUsersUpdated: Dispatch<SetStateAction<boolean>>;
  showQuillEdit: boolean;
  setShowQuillEdit: Dispatch<SetStateAction<boolean>>;
  showBtnReturn: boolean;
  setShowBtnReturn: Dispatch<SetStateAction<boolean>>;
  resourceView: boolean;
  setResourceView: Dispatch<SetStateAction<boolean>>;
  titleQuill: string;
  setTitleQuill: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<ContextProps>({
  lesson: '',
  setLesson: () => {},
  isAdmin: '',
  setIsAdmin: () => {},
  usersUpdated: false,
  setUsersUpdated: () => {},
  showQuillEdit: false,
  setShowQuillEdit: () => {},
  showBtnReturn: false,
  setShowBtnReturn: () => {},
  resourceView: false,
  setResourceView: () => {},
  titleQuill: '',
  setTitleQuill: () => {},
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usersUpdated, setUsersUpdated] = useState(false);
  const [lesson, setLesson] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [showQuillEdit, setShowQuillEdit] = useState(false);
  const [showBtnReturn, setShowBtnReturn] = useState(false);
  const [resourceView, setResourceView] = useState(false);
  const [titleQuill, setTitleQuill] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        lesson,
        setLesson,
        isAdmin,
        setIsAdmin,
        showQuillEdit,
        setShowQuillEdit,
        showBtnReturn,
        setShowBtnReturn,
        resourceView,
        setResourceView,
        titleQuill,
        setTitleQuill,
        usersUpdated,
        setUsersUpdated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
