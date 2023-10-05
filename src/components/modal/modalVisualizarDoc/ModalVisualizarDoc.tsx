import React from 'react';
import styles from '@/styles/ModalOpenDoc.module.css';

interface ModalValidationProps {
  url_doc: string;
  onCancel: () => void;
}

const ModalVisualizarDoc: React.FC<ModalValidationProps> = ({
  url_doc,
  onCancel,
}) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.boxBtns}>
          <button className={styles.btnClose} onClick={onCancel}>
            X
          </button>
        </div>
        <iframe src={url_doc} width="100%" height="93%" />
      </div>
    </div>
  );
};

export default ModalVisualizarDoc;
