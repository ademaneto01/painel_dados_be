import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import InputMask from 'react-input-mask';
import styles from '@/styles/NovoContrato.module.css';
import { BackendApiGet, BackendApiPut } from '@/backendApi';
import { ComponentInfos, ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

interface FormData {
  nome_simplificado: string | null;
  razao_social: string | null;
  cnpj_cont: string | null;
  cep: string | null;
  endereco: string | null;
  cidade: string | null;
  uf: string;
  bairro: string | null;
  complemento: string | null;
  bo_rede: boolean | null;
}

export default function SobreescreverContrato(): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    nome_simplificado: '',
    razao_social: '',
    cnpj_cont: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    complemento: '',
    bo_rede: null,
  });
  const {
    idContrato,
    setPage,
    setModalSucessoSubsContrato,
    setSaveInfosContratoOld,
    modalSucessoSubsContrato,
  } = useGlobalContext();

  useEffect(() => {
    fetchDataInitial();
  }, []);

  const fetchDataInitial = async () => {
    const response = await fetchContractData(idContrato);
    if (response) {
      setFormData({
        nome_simplificado: response[0]?.nome_simplificado || '',
        razao_social: response[0]?.razao_social || '',
        cnpj_cont: response[0]?.cnpj_cont || '',
        cep: response[0]?.cep || '',
        endereco: response[0]?.endereco || '',
        cidade: response[0]?.cidade || '',
        uf: response[0]?.uf || '',
        bairro: response[0]?.bairro || '',
        complemento: response[0]?.complemento || '',
        bo_rede: response[0].bo_rede,
      });
    }
  };

  const fetchContractData = async (id: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      return await backendApi.localizarContrato(id);
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  };

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  const handleModal = () => {
    setModalSucessoSubsContrato(true);
    setTimeout(() => {
      setModalSucessoSubsContrato(false);
      setPage(PageEnumContratos.editarInfosContrato);
    }, 3000);
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPut(`${token}`);
      await backendApi.sobrescreverContrato({
        uuid_ec: idContrato,
      });
      setSaveInfosContratoOld(true);
    } catch (error) {
      handleApiErrors(error);
    } finally {
      handleModal();
      setLoaded(true);
    }
  };

  const findOldInfosToValidate = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const oldInfos = await backendApi.listarInfosContrato(idContrato);
      return oldInfos;
    } catch (error) {
      handleApiErrors(error);
    } finally {
      setLoaded(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const oldInfosToValidate = await findOldInfosToValidate();
    if (
      oldInfosToValidate &&
      oldInfosToValidate.length > 0 &&
      oldInfosToValidate.some(
        (info) =>
          info.ano_assinatura != null &&
          info.resp_frete != null &&
          info.ano_operacao != null &&
          info.ano_termino != null &&
          info.tipocontrato != null &&
          info.valorcontrato != null,
      )
    ) {
      fetchData();
    } else {
      setError(true);
      setMsgError(
        'Não existem informações a serem substituídas para o contrato selecionado..',
      );
      setTimeout(() => {
        setError(false);
      }, 3500);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons setPage={setPage} />
        <FormComponent
          formData={formData}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
        {error && <ErrorComponent message={msgError} />}
        {modalSucessoSubsContrato && (
          <ComponentInfos
            message={
              'O contrato foi substituído com êxito. Por Favor, forneça as novas informações'
            }
          />
        )}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Sobrescrever Contrato</h4>;

const NavigationButtons: React.FC<any> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <BackButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
    />
  </div>
);

const FormComponent: React.FC<any> = ({ formData, handleSubmit, setPage }) => {
  return (
    <form className={styles.boxForm} onSubmit={handleSubmit}>
      <label className={styles.labelStandard}>
        Nome Simplificado*
        <input
          type="text"
          placeholder="Nome Simplificado"
          name="nome_simplificado"
          value={formData.nome_simplificado ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        Razão Social*
        <input
          type="text"
          placeholder="Razão Social"
          name="razao_social"
          value={formData.razao_social ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        CNPJ*
        <InputMask
          type="text"
          mask="99.999.999/9999-99"
          placeholder="CNPJ"
          name="cnpj_cont"
          value={formData.cnpj_cont ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        CEP*
        <InputMask
          type="text"
          placeholder="CEP"
          mask="99999-999"
          name="cep"
          value={formData.cep ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        Rua*
        <input
          type="text"
          placeholder="Rua"
          name="endereco"
          value={formData.endereco ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        Cidade*
        <input
          type="text"
          placeholder="Cidade"
          name="cidade"
          value={formData.cidade ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        UF*
        <input
          type="text"
          placeholder="UF"
          name="uf"
          value={formData.uf ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        Bairro*
        <input
          type="text"
          placeholder="Bairro"
          name="bairro"
          value={formData.bairro ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        Complemento*
        <input
          type="text"
          placeholder="Complemento"
          name="complemento"
          value={formData.complemento ?? ''}
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <label className={styles.labelStandard}>
        Rede*
        <input
          type="text"
          placeholder="Rede"
          value={
            formData.bo_rede === true
              ? 'Ativa'
              : formData.bo_rede === false
              ? 'Inativa'
              : ''
          }
          name="bo_rede"
          className={styles.inputStandard}
          readOnly
        />
      </label>
      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
        >
          Cancelar
        </button>
        <button
          className={styles.confirmButton}
          type="button"
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};
