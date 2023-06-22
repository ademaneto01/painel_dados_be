'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps{
  showModalExclusion: string,
  setShowModalExclusion: Dispatch<SetStateAction<string>>,
  showModalAddEditSchool: string,
  setShowModalAddEditSchool: Dispatch<SetStateAction<string>>,
}

export const GlobalContext = createContext<ContextProps>({
  showModalExclusion: '',
  setShowModalExclusion: () => {},
  showModalAddEditSchool: '',
  setShowModalAddEditSchool: () => {},
})

export const GlobalContextProvider = ({children}) => {
  const [showModalExclusion, setShowModalExclusion] = useState('')
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('')
  return (
    <GlobalContext.Provider value={{showModalExclusion, setShowModalExclusion, showModalAddEditSchool, setShowModalAddEditSchool} }>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
