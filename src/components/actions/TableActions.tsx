// 'use client'

// import styles from "@/styles/Action.module.css";
// import Action from "./Action";
// import { FiEdit } from "react-icons/fi";
// import { FaTrashAlt } from "react-icons/fa";
// import { IconBaseProps, IconType } from "react-icons";
// import { useGlobalContext } from "@/context/store";
// import { ModaExcluir, ModalAddEditSchool } from "../modal";

// interface PropsForFxclusion {
//   id: string;
//   nameSchool: string;
//   modalKey:string;
//   lessonKey?: string;
// }
// function reactIcon(icon: IconType, color?: string): JSX.Element {
//   const options: IconBaseProps = {};

//   options.fontSize = "1.3em";
//   options.color = color;

//   return icon(options);
// }

// export default function TableActions(props: PropsForFxclusion): JSX.Element {
//   const { showModalExclusion, setShowModalExclusion } = useGlobalContext()
//   const { showModalAddEditSchool, setShowModalAddEditSchool } = useGlobalContext()

//   function handleClickOpenModalExcluir(id:string  ):void {
//     setShowModalExclusion(id)
//   }
//   function handleClickOpenModalEdit(id:string ):void {
//     setShowModalAddEditSchool(id)
//   }
  
//   return (
//     <div className={styles.container}>
//       <Action icon={reactIcon(FiEdit)} onClick={() => handleClickOpenModalEdit(props.id)} />
//       <Action icon={reactIcon(FaTrashAlt, "#f1646c")}  onClick={() => handleClickOpenModalExcluir(props.id)} />
//       {showModalAddEditSchool === props.id && <ModalAddEditSchool onCancel={() => setShowModalAddEditSchool('')} modalKey={props.id}/>}
//       {showModalExclusion === props.id && <ModaExcluir title={'Excluir'} message={`Realmente deseja excluir escola ${props.nameSchool} ?`} onCancel={() => setShowModalExclusion('')}/>}
//     </div>
//   );
// }
'use client'

import styles from "@/styles/Action.module.css";
import Action from "./Action";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { IconBaseProps, IconType } from "react-icons";
import { useGlobalContext } from "@/context/store";
import { ModaExcluir, ModalAddEditSchool } from "../modal";


interface PropsForFxclusion {
  id: string;
  nome?:string;
  nameSchool?: string;
  modalKey?: string;
  lessonKey?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = "1.3em";
  options.color = color;

  return icon(options);
}

export default function TableActions(props: PropsForFxclusion): JSX.Element {
  const { showModalExclusion, setShowModalExclusion } = useGlobalContext();
  const { showModalAddEditSchool, setShowModalAddEditSchool } = useGlobalContext();
  

  function handleClickOpenModalExcluir(id:string): void {
    setShowModalExclusion(props.id);
  }

  function handleClickOpenModalEdit(id:string): void {
    setShowModalAddEditSchool(props.id);
  }

  function handleClickOpenLesson(): void {
    if (props.lessonKey) {
      // router.push(`/resources/view/${props.lessonKey}`);
    }
  }

  return (
    <div className={styles.container}>
      {props.modalKey && <Action icon={reactIcon(FiEdit)} onClick={() => handleClickOpenModalEdit(props.id)} />}
      <Action icon={reactIcon(FaTrashAlt, "#f1646c")} onClick={() => handleClickOpenModalExcluir(props.id)} />
      {props.lessonKey && (
        <Action icon={reactIcon(FiEdit)} onClick={handleClickOpenLesson} />
      )}
      {showModalAddEditSchool === props.id && (
        <ModalAddEditSchool onCancel={() => setShowModalAddEditSchool("")} modalKey={props.id} />
      )}
      {showModalExclusion === props.id && (
        <ModaExcluir
          title={"Excluir"}
          message={`Realmente deseja excluir escola ${props.nameSchool} ?`}
          onCancel={() => setShowModalExclusion("")}
        />
      )}
    </div>
  );
}