'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps{
  showModalExclusion: string,
  setShowModalExclusion: Dispatch<SetStateAction<string>>,
  showModalAddEditSchool: string,
  setShowModalAddEditSchool: Dispatch<SetStateAction<string>>,
  lesson: string,
  setLesson: Dispatch<SetStateAction<string>>,
  showQuillEdit: boolean,
  setShowQuillEdit: Dispatch<SetStateAction<boolean>>,
  showBtnReturn: boolean,
  setShowBtnReturn: Dispatch<SetStateAction<boolean>>,
  resourceView: boolean,
  setResourceView: Dispatch<SetStateAction<boolean>>
  titleQuill:string,
  setTitleQuill: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext<ContextProps>({
  showModalExclusion: '',
  setShowModalExclusion: () => {},
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
  setTitleQuill: () => {}
})

export const GlobalContextProvider = ({children}) => {
  const [showModalExclusion, setShowModalExclusion] = useState('')
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('')
  const [lesson, setLesson] = useState('')
  const [showQuillEdit, setShowQuillEdit] = useState(false)
  const [showBtnReturn, setShowBtnReturn] = useState(false)
  const [resourceView, setResourceView] = useState(false)
  const [titleQuill, setTitleQuill] = useState('')

  return (
    <GlobalContext.Provider value={{
      showModalExclusion,
      setShowModalExclusion,
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
      setTitleQuill
      }}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
