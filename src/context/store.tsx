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
  showModalDelete: string;
  setShowModalDelete: Dispatch<SetStateAction<string>>;
  showModalAddEditSchool: string;
  setShowModalAddEditSchool: Dispatch<SetStateAction<string>>;
  lesson: string;
  setLesson: Dispatch<SetStateAction<string>>;
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
  showModalDelete: '',
  setShowModalDelete: () => {},
  showModalAddEditSchool: '',
  setShowModalAddEditSchool: () => {},
  lesson: '',
  setLesson: () => {},
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
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const [lesson, setLesson] = useState('');
  const [showQuillEdit, setShowQuillEdit] = useState(false);
  const [showBtnReturn, setShowBtnReturn] = useState(false);
  const [resourceView, setResourceView] = useState(false);
  const [titleQuill, setTitleQuill] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        showModalDelete,
        setShowModalDelete,
        showModalAddEditSchool,
        setShowModalAddEditSchool,
        lesson,
        setLesson,
        showQuillEdit,
        setShowQuillEdit,
        showBtnReturn,
        setShowBtnReturn,
        resourceView,
        setResourceView,
        titleQuill,
        setTitleQuill,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
