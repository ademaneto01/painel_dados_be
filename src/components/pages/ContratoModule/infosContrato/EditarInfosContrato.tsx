import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, CreateButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

interface FormData {
  ano_assinatura: number | null;
  ano_operacao: number | null;
  ano_termino: number | null;
  ativo: boolean | null;
  resp_frete: string;
  pedido_min: number | null;
  reajuste_igpm_ipca: boolean | null;
}

export default function EditarInfosContrato(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    ano_assinatura: null,
    ano_operacao: null,
    ano_termino: null,
    ativo: true,
    resp_frete: '',
    pedido_min: null,
    reajuste_igpm_ipca: null,
  });
  const [idInfos, setIdInfos] = useState('');
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPage, idContrato } = useGlobalContext();

  const handleApiErrors = (error: any) => {
    if (error instanceof FailedToFetchError) {
      setError(true);
    } else {
      throw error;
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiMock(`${token}`);

    const requestBody = {
      id: idInfos,
      ...formData,
    };

    try {
      await backendApi.editarInfosContrato(requestBody);
      setPage(PageEnumContratos.infosContrato);
    } catch (error) {
      handleApiErrors(error);
    }
  };

  useEffect(() => {
    fetchDataInitial();
  }, []);

  const fetchDataInitial = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiMock(`${token}`);

    const requestBody = {
      ...formData,
      uuid_ec: idContrato,
    };

    try {
      const infosContratoData = await backendApi.listarInfosContrato(
        requestBody,
      );
      setIdInfos(infosContratoData[0].id);
      setFormData({
        ano_assinatura: infosContratoData[0].ano_assinatura,
        ano_operacao: infosContratoData[0].ano_operacao,
        ano_termino: infosContratoData[0].ano_termino,
        ativo: infosContratoData[0].ativo,
        resp_frete: infosContratoData[0].resp_frete,
        pedido_min: infosContratoData[0].pedido_min,
        reajuste_igpm_ipca: infosContratoData[0].reajuste_igpm_ipca,
      });
    } catch (error) {
      handleApiErrors(error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    let updatedValue: any;
    if (
      ['ano_assinatura', 'ano_operacao', 'ano_termino', 'pedido_min'].includes(
        name,
      )
    ) {
      updatedValue = value ? parseInt(value, 10) : null;
    } else if (
      ['ativo'].includes(name) ||
      ['reajuste_igpm_ipca'].includes(name)
    ) {
      updatedValue = value === 'true' ? true : value === 'false' ? false : null;
    } else {
      updatedValue = value;
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    for (const [key, value] of Object.entries(formData)) {
      if (value === '' || value === null) {
        errors.push('Todos campos são obrigatórios...');
        break;
      }
    }

    if (errors.length) {
      setError(true);
      setMsgError(errors.join(' '));
      setTimeout(() => setError(false), 6000);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      fetchData();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons setPage={setPage} />
        <FormComponent
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setPage={setPage}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Editar Informações do Contrato</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <CreateButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPage(PageEnumContratos.infosContrato)}
    />
  </div>
);

const FormComponent: React.FC<any> = ({
  formData,
  handleInputChange,
  handleSubmit,
  setPage,
}) => {
  return (
    <form className={styles.boxForm} onSubmit={handleSubmit}>
      <label className={styles.labelStandard}>
        Ano de Assinatura
        <input
          type="number"
          placeholder="Ano de Assinatura"
          name="ano_assinatura"
          value={formData.ano_assinatura ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>

      <label className={styles.labelStandard}>
        Ano de Operação
        <input
          type="number"
          placeholder="Ano de Operação"
          name="ano_operacao"
          value={formData.ano_operacao ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Ano de Termino
        <input
          type="number"
          placeholder="Ano de Termino"
          name="ano_termino"
          value={formData.ano_termino ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Responsavel pelo Frete
        <input
          type="text"
          placeholder="Responsavel pelo Frete"
          name="resp_frete"
          value={formData.resp_frete ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Pedido Mínimo
        <input
          type="text"
          placeholder="Pedido Mínimo"
          name="pedido_min"
          value={formData.pedido_min ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>

      <label className={styles.labelStandard}>
        Reajuste IGPM IPCA
        <select
          value={
            formData.reajuste_igpm_ipca === null
              ? ''
              : formData.reajuste_igpm_ipca.toString()
          }
          onChange={handleInputChange}
          name="reajuste_igpm_ipca"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </label>
      <label className={styles.labelStandard}>
        Status
        <select
          value={formData.ativo === null ? '' : formData.ativo.toString()}
          onChange={handleInputChange}
          name="ativo"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </label>

      <div className={styles.buttonContainer}>
        <button
          className={styles.confirmButton}
          type="button"
          onClick={handleSubmit}
        >
          Salvar
        </button>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
