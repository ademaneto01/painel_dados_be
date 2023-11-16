import React, { useState } from 'react';
import styles from '@/styles/ModalAddDoc.module.css';
import { BackendApiPost } from '@/backendApi';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors/index';

export default function RegistrarDoc(): JSX.Element {
  const [nomeDocInputs, setNomeDocInputs] = useState<string[]>(['']);
  const [urlDocInputs, setUrlDocInputs] = useState<string[]>(['']);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { idContrato, setPage } = useGlobalContext();
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

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (nomeDocInputs.length === 1 || urlDocInputs.length === 1) {
      errors.push('Todos os campos são obrigatórios...');
    }

    if (errors.length > 0) {
      setError(true);
      setMsgError(errors.join(' '));
      setTimeout(() => setError(false), 6000);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    for (let i = 0; i < nomeDocInputs.length; i++) {
      const nome_doc = nomeDocInputs[i];
      const url_doc = urlDocInputs[i];

      if (!nome_doc || !url_doc) {
        setError(true);
        setMsgError('Informe os campos obrigatórios.');
        setTimeout(() => setError(false), 6000);
        return;
      } else {
        await fetchDocData(nome_doc, url_doc);
      }
    }

    setPage(PageEnumContratos.docsContrato);
  };

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  const fetchDocData = async (nome_doc: string, url_doc: string) => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiPost(`${token}`);
    const bodyReq = {
      uuid_ec: idContrato,
      nome_doc,
      url_doc,
    };

    try {
      return await backendApi.registrarDocContrato(bodyReq);
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons setPage={setPage} />
        <FormComponent
          nomeDocInputs={nomeDocInputs}
          urlDocInputs={urlDocInputs}
          addInput={addInput}
          handleNomeDocInputChange={handleNomeDocInputChange}
          handleUrlDocInputChange={handleUrlDocInputChange}
          removeLastInput={removeLastInput}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Cadastrar Documento</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <BackButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPage(PageEnumContratos.docsContrato)}
    />
  </div>
);

const FormComponent: React.FC<any> = ({
  handleNomeDocInputChange,
  handleUrlDocInputChange,
  nomeDocInputs,
  urlDocInputs,
  addInput,
  removeLastInput,
  handleSubmit,
  setPage,
}) => {
  return (
    <form className={styles.boxForm} onSubmit={handleSubmit}>
      <div className={styles.container}>
        {nomeDocInputs.map((input: any, index: any) => (
          <div key={index} className={styles.borderBoxInputs}>
            <div className={styles.boxStandard}>
              <label className={styles.labelStandard}>
                Nome Documento*
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
                URL Documento*
                <input
                  type="text"
                  placeholder="URL Documento"
                  name="url_doc"
                  value={urlDocInputs[index]}
                  onChange={(e) =>
                    handleUrlDocInputChange(index, e.target.value)
                  }
                  className={styles.inputStandard}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonContainer}>
        {nomeDocInputs.length > 1 && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={removeLastInput}
          >
            Remover Documento
          </button>
        )}
        <button
          type="button"
          className={styles.confirmButton}
          onClick={addInput}
        >
          Adicionar Documento
        </button>
        <button
          type="button"
          className={styles.confirmButton}
          onClick={handleSubmit}
        >
          Salvar
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => setPage(PageEnumContratos.docsContrato)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
