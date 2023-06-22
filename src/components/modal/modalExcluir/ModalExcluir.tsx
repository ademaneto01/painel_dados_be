import React from "react";
import styles from "@/styles/ModalExcluir.module.css";
// import { useGlobalContext } from "@/context/store";

interface ModalValidationProps {
  title: string;
  message: string;
  // onConfirm: () => void;
 onCancel: () => void;
}

const ModaExcluir: React.FC<ModalValidationProps> = ({
  title,
  message,
  // onConfirm,
  onCancel,
}) => {
  // const { showModalExclusion, setShowModalExclusion } = useGlobalContext()

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} >
            Sim
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModaExcluir;