import React, { useState } from 'react';
import styles from '@/styles/ModalAddDoc.module.css';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { FailedToFetchError } from '@/errors';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddDoc: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [nomeDocInputs, setNomeDocInputs] = useState<string[]>(['']);
  const [urlDocInputs, setUrlDocInputs] = useState<string[]>(['']);
  const [error, setError] = useState(false);
  const { idContrato } = useGlobalContext();
  const addInput = () => {
    setNomeDocInputs([...nomeDocInputs, '']);
    setUrlDocInputs([...urlDocInputs, '']);
  };

  const handleNomeDocInputChange = (index: number, value: string) => {
    const updatedNomeDocInputs = [...nomeDocInputs];
    updatedNomeDocInputs[index] = value;
    setNomeDocInputs(updatedNomeDocInputs);
  };

  const handleUrlDocInputChange = (index: number, value: string) => {
    const updatedUrlDocInputs = [...urlDocInputs];
    updatedUrlDocInputs[index] = value;
    setUrlDocInputs(updatedUrlDocInputs);
  };

  const removeLastInput = () => {
    if (nomeDocInputs.length > 1 && urlDocInputs.length > 1) {
      const updatedNomeDocInputs = [...nomeDocInputs];
      updatedNomeDocInputs.pop();
      setNomeDocInputs(updatedNomeDocInputs);

      const updatedUrlDocInputs = [...urlDocInputs];
      updatedUrlDocInputs.pop();
      setUrlDocInputs(updatedUrlDocInputs);
    }
  };

  const handleSubmit = async () => {
    for (let i = 0; i < nomeDocInputs.length; i++) {
      const nome_doc = nomeDocInputs[i];
      const url_doc = urlDocInputs[i];
      await fetchDocData(nome_doc, url_doc);
    }

    onClose();
  };

  const handleApiErrors = (error: any) => {
    if (error instanceof FailedToFetchError) {
      setError(true);
    } else {
      throw error;
    }
  };

  const fetchDocData = async (nome_doc: string, url_doc: string) => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiMock(`${token}`);
    const bodyReq = {
      uuid_ec: idContrato,
      nome_doc,
      url_doc,
    };
    console.log(bodyReq);
    try {
      return await backendApi.registrarDocContrato(bodyReq);
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  return isOpen ? (
    <div className={styles.backgroundModal} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {nomeDocInputs.map((input, index) => (
          <div key={index} className={styles.boxStandard}>
            <label className={styles.labelStandard}>
              Nome Documento
              <input
                type="text"
                placeholder="Nome Documento"
                name="nome_doc"
                value={input}
                onChange={(e) =>
                  handleNomeDocInputChange(index, e.target.value)
                }
                className={styles.inputStandard}
              />
            </label>
            <label className={styles.labelStandard}>
              URL Documento
              <input
                type="text"
                placeholder="URL Documento"
                name="url_doc"
                value={urlDocInputs[index]}
                onChange={(e) => handleUrlDocInputChange(index, e.target.value)}
                className={styles.inputStandard}
              />
            </label>
          </div>
        ))}

        <div className={styles.buttonContainer}>
          {nomeDocInputs.length > 1 && (
            <button className={styles.cancelButton} onClick={removeLastInput}>
              Remover Documento
            </button>
          )}
          <button className={styles.confirmButton} onClick={addInput}>
            Adicionar Documento
          </button>
          <button className={styles.confirmButton} onClick={handleSubmit}>
            Salvar
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalAddDoc;
