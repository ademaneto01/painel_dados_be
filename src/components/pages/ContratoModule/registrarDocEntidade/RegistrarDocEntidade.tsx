import React, { useState } from 'react';
import styles from '@/styles/ModalAddDoc.module.css';
import { BackendApiPost } from '@/backendApi';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors/index';
import handleApiErrors from '@/utils';

export default function RegistrarDocEntidade(): JSX.Element {
  const [nomeDocInputs, setNomeDocInputs] = useState<string[]>(['']);
  const [urlDocInputs, setUrlDocInputs] = useState<string[]>(['']);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { idEntidadeEscolar, setPage } = useGlobalContext();
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

      if (!nome_doc || !url_doc) {
        setError(true);
        setMsgError('Informe os campos obrigatórios.');
        setTimeout(() => setError(false), 6000);
        return;
      } else {
        await fetchDocData(nome_doc, url_doc);
      }
    }

    setPage(PageEnumContratos.docsEntidade);
  };

  const fetchDocData = async (nome_doc: string, url_doc: string) => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiPost(`${token}`);
    const bodyReq = {
      uuid_ee: idEntidadeEscolar,
      nome_doc,
      url_doc,
    };

    try {
      return await backendApi.registrarDocEntidade(bodyReq);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
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

const HeaderComponent: React.FC = () => <h4>Cadastrar Documento Entidade</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <BackButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
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
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => setPage(PageEnumContratos.docsEntidade)}
        >
          Cancelar
        </button>
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
      </div>
    </form>
  );
};
