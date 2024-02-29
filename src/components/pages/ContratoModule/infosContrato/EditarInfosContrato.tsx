import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { BackendApiGet, BackendApiPut } from '@/backendApi';
import InputMask from 'react-input-mask';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import { ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

interface FormData {
  ano_assinatura: string | null;
  ano_operacao: string | null;
  ano_termino: string | null;
  resp_frete: string;
  pedido_min: number | null;
  reajuste_igpm_ipca: string | null;
  exclusividade: boolean | null;
  tipoexclusividade: string | null;
  incentivos: string[] | null;
  qtdbolsas: string | null;
  tipocontrato: string | null;
  valorcontrato: string | null;
  repasse: string | null;
  comentario: string | null;
}

const MultilineInputSSR = dynamic(
  () => import('../../quill/multilineInput/MultilineInput'),
  {
    ssr: false,
  },
);

export default function EditarInfosContrato(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    ano_assinatura: null,
    ano_operacao: null,
    ano_termino: null,
    resp_frete: '',
    pedido_min: null,
    reajuste_igpm_ipca: null,
    exclusividade: true,
    tipoexclusividade: null,
    incentivos: null,
    qtdbolsas: null,
    tipocontrato: null,
    valorcontrato: null,
    repasse: null,
    comentario: null,
  });
  const [idInfos, setIdInfos] = useState('');
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPage, idContrato, saveInfosContrato } = useGlobalContext();

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  const limparValorContrato = (valor: string) => {
    if (typeof valor === 'string') {
      return valor.replace(/\D/g, '');
    } else {
      return String(valor).replace(/\D/g, '');
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiPut(`${token}`);

    const valorContratoLimpo = limparValorContrato(
      formData.valorcontrato ?? '',
    );

    const requestBody = {
      id: idInfos,
      ...formData,
      qtdbolsas: isBolsasSelected() ? formData.qtdbolsas : 0,
      valorcontrato: valorContratoLimpo,
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

  useEffect(() => {
    if (saveInfosContrato && saveInfosContrato.length > 0) {
      setFormData({
        ano_assinatura: saveInfosContrato[0].ano_assinatura,
        ano_operacao: saveInfosContrato[0].ano_operacao,
        ano_termino: saveInfosContrato[0].ano_termino,
        resp_frete: saveInfosContrato[0].resp_frete,
        pedido_min: saveInfosContrato[0].pedido_min,
        reajuste_igpm_ipca: saveInfosContrato[0].reajuste_igpm_ipca,
        exclusividade: saveInfosContrato[0].exclusividade,
        tipoexclusividade: saveInfosContrato[0].tipoexclusividade,
        incentivos: saveInfosContrato[0].incentivos,
        qtdbolsas: saveInfosContrato[0].qtdbolsas,
        tipocontrato: saveInfosContrato[0].tipocontrato,
        valorcontrato: saveInfosContrato[0].valorcontrato,
        repasse: saveInfosContrato[0].repasse,
        comentario: saveInfosContrato[0].comentario,
      });
      //CASO O FLUXO CHEGUE POR SUBSTITUIÇÃO DE CONTRATO, EU AGUARDO O TIMEOUT DE SUBSTITUIR INFOS CONTRATO DO COMPONENTE SOBRESCREVERCONTRATO, PARA ENTÃO EU CONSEGUIR PEGAR O NOVO ID CRIADO PARA A NOVA INFO, POIS QUANDO O FLUXO CHEGA AQUI A FUNÇÃO DE SUBSTIUIR CONTRATO AINDA NAO FOI CHAMADA NO COMPONENTE SOBREESCREVER CONTRATO ENTÃO O ID DA INFO AINDA É O ANTIGO.
      setTimeout(() => {
        fetchDataFindNewIdsubstituted();
      }, 2700);
    }
  }, [saveInfosContrato]);

  const fetchDataFindNewIdsubstituted = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiGet(`${token}`);
    try {
      const infosContratoData = await backendApi.listarInfosContrato(
        idContrato,
      );

      setIdInfos(infosContratoData[0].id);
    } catch (error) {
      handleApiErrors(error);
    }
  };

  const fetchDataInitial = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiGet(`${token}`);

    try {
      const infosContratoData = await backendApi.listarInfosContrato(
        idContrato,
      );

      setIdInfos(infosContratoData[0].id);
      setFormData({
        ano_assinatura: infosContratoData[0].ano_assinatura,
        ano_operacao: infosContratoData[0].ano_operacao,
        ano_termino: infosContratoData[0].ano_termino,
        resp_frete: infosContratoData[0].resp_frete,
        pedido_min: infosContratoData[0].pedido_min,
        reajuste_igpm_ipca: infosContratoData[0].reajuste_igpm_ipca,
        exclusividade: infosContratoData[0].exclusividade,
        tipoexclusividade: infosContratoData[0].tipoexclusividade,
        incentivos: infosContratoData[0].incentivos,
        qtdbolsas: infosContratoData[0].qtdbolsas,
        tipocontrato: infosContratoData[0].tipocontrato,
        valorcontrato: infosContratoData[0].valorcontrato,
        repasse: infosContratoData[0].repasse,
        comentario: infosContratoData[0].comentario,
      });
    } catch (error) {
      if (!saveInfosContrato) {
        handleApiErrors(error);
      }
    }
  };

  const handleSelectChange = (selectedOptions: any) => {
    const values = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prev) => ({ ...prev, incentivos: values }));
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    let updatedValue: any;
    if (['exclusividade'].includes(name)) {
      updatedValue = value === 'true' ? true : value === 'false' ? false : null;
    } else {
      updatedValue = value;
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };
  const handleQuillChange = (content: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      comentario: content,
    }));
  };
  const validateForm = (): boolean => {
    const errors: string[] = [];

    for (const [key, value] of Object.entries(formData)) {
      if (
        (value === '' || value === null) &&
        key === 'qtdbolsas' &&
        isBolsasSelected()
      ) {
        errors.push('Campo quantidade de bolsas é obrigatório.');
        break;
      }
      if (
        (value === '' || value === null) &&
        key !== 'pedido_min' &&
        key !== 'qtdbolsas' &&
        key !== 'reajuste_igpm_ipca' &&
        key !== 'exclusividade' &&
        key !== 'tipoexclusividade' &&
        key !== 'incentivos' &&
        key !== 'repasse' &&
        key !== 'comentario'
      ) {
        errors.push('Informe os campos obrigatórios.');
        break;
      }

      if (key === 'pedido_min' && isNaN(value as number)) {
        errors.push('Pedido Mínimo deve ser um número válido.');
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

  const isBolsasSelected = () => {
    return formData.incentivos && formData.incentivos.includes('Bolsas');
  };

  const options = [
    { value: 'Bolsas', label: 'Bolsas' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'BETT', label: 'BETT' },
    { value: 'BETT LONDRES', label: 'BETT LONDRES' },
    { value: 'MULTA', label: 'MULTA' },
  ];

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
          handleSelectChange={handleSelectChange}
          isBolsasSelected={isBolsasSelected}
          options={options}
          handleQuillChange={handleQuillChange}
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
    <BackButton
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
  handleSelectChange,
  isBolsasSelected,
  options,
  handleQuillChange,
}) => {
  return (
    <form className={styles.boxForm} onSubmit={handleSubmit}>
      <label className={styles.labelStandard}>
        Data de Assinatura*
        <InputMask
          type="text"
          mask="99/99/9999"
          placeholder="Data de Assinatura"
          name="ano_assinatura"
          value={formData.ano_assinatura ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>

      <label className={styles.labelStandard}>
        Data de Operação*
        <InputMask
          type="text"
          mask="99/99/9999"
          placeholder="Data de Operação"
          name="ano_operacao"
          value={formData.ano_operacao ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Data de Termino*
        <InputMask
          type="text"
          mask="99/99/9999"
          placeholder="Data de Termino"
          name="ano_termino"
          value={formData.ano_termino ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Responsavel pelo Frete*
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
        Reajuste
        <select
          value={formData.reajuste_igpm_ipca ?? ''}
          onChange={handleInputChange}
          name="reajuste_igpm_ipca"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="escola">Escola</option>
          <option value="IGP-M">IGP-M</option>
          <option value="IPCA">IPCA</option>
          <option value="verificar-contrato">Verificar contrato</option>
        </select>
      </label>
      <label className={styles.labelStandard}>
        Exclusividade
        <select
          value={
            formData.exclusividade === null
              ? ''
              : formData.exclusividade.toString()
          }
          onChange={handleInputChange}
          name="exclusividade"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </label>
      <label className={styles.labelStandard}>
        Tipo exclusividade
        <select
          value={formData.tipoexclusividade ?? ''}
          onChange={handleInputChange}
          name="tipoexclusividade"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="Raio">Raio</option>
          <option value="Bairro">Bairro</option>
          <option value="Município">Município</option>
          <option value="Concorrentes - Vide Contrato">
            Concorrentes - Vide Contrato
          </option>
        </select>
      </label>
      <label className={styles.labelStandard}>
        Incentivos
        <Select
          isMulti
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow: state.isFocused ? '0 0 5px var(--gray-200);' : '',
              border: 'white',

              height: '2.5rem',
              cursor: 'pointer',
            }),
          }}
          placeholder="Incentivos"
          name="incentivos"
          onChange={handleSelectChange}
          value={
            formData.incentivos
              ? formData.incentivos.map((response: string) => ({
                  value: response,
                  label: response,
                }))
              : ''
          }
          options={options}
          className={styles.inputSelectReact}
        />
      </label>
      {isBolsasSelected() && (
        <label className={styles.labelStandard}>
          QTD. Bolsas*
          <input
            type="text"
            placeholder="QTD. Bolsas"
            name="qtdbolsas"
            value={formData.qtdbolsas ?? ''}
            onChange={handleInputChange}
            className={styles.inputStandard}
          />
        </label>
      )}
      <label className={styles.labelStandard}>
        % de repasse
        <input
          type="text"
          placeholder="% de repasse"
          name="repasse"
          value={formData.repasse ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Valor do contrato*
        <InputMask
          mask={'9999999'}
          type="text"
          placeholder="Valor do contrato"
          name="valorcontrato"
          value={formData.valorcontrato ?? ''}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Tipo*
        <select
          value={formData.tipocontrato ?? ''}
          onChange={handleInputChange}
          name="tipocontrato"
          className={styles.inputSelect}
        >
          <option value="">-</option>
          <option value="B2B">B2B</option>
          <option value="B2C">B2C</option>
        </select>
      </label>

      <label className={styles.labelStandard}>
        Comentário
        <MultilineInputSSR
          label="Comentário"
          onChange={handleQuillChange}
          value={formData.comentario}
        />
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
