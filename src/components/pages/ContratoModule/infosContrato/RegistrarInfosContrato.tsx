import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/NovoContrato.module.css';
import InputMask from 'react-input-mask';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import { BackendApiPost } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

interface FormData {
  ano_assinatura: string | null;
  ano_operacao: string | null;
  ano_termino: string | null;
  ativo: boolean | null;
  resp_frete: string;
  pedido_min: number | null;
  reajuste_igpm_ipca: string | null;
  exclusividade: string | null;
  tipoexclusividade: string | null;
  incentivos: string[] | null;
  qtdbolsas: string | null;
  repasse: string | null;
  comentario: string | null;
}

const MultilineInputSSR = dynamic(
  () => import('../../quill/multilineInput/MultilineInput'),
  {
    ssr: false,
  },
);

export default function RegistrarInfosContrato(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    ano_assinatura: null,
    ano_operacao: null,
    ano_termino: null,
    ativo: true,
    resp_frete: '',
    pedido_min: null,
    reajuste_igpm_ipca: null,
    exclusividade: null,
    tipoexclusividade: null,
    incentivos: null,
    qtdbolsas: null,
    repasse: null,
    comentario: null,
  });

  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPage, idContrato } = useGlobalContext();

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    const backendApi = new BackendApiPost(`${token}`);
    try {
      const requestBody = {
        ...formData,
        uuid_ec: idContrato,
      };
      await backendApi.registrarInfosContrato(requestBody);
      setPage(PageEnumContratos.infosContrato);
    } catch (error) {
      handleApiErrors(error);
    }
    setPage(PageEnumContratos.infosContrato);
  };
  const handleSelectChange = (selectedOptions: any) => {
    const values = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prev) => ({ ...prev, incentivos: values }));
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | any,
  ) => {
    const { name, value } = e.target;

    let updatedValue: any;

    if (['pedido_min'].includes(name)) {
      updatedValue = value !== '' ? parseInt(value, 10) : null;
    } else if (['ativo'].includes(name) || ['exclusividade'].includes(name)) {
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
          options={options}
          handleSelectChange={handleSelectChange}
          handleQuillChange={handleQuillChange}
          isBolsasSelected={isBolsasSelected}
        />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Informações do Contrato</h4>;

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
  options,
  handleSelectChange,
  handleQuillChange,
  isBolsasSelected,
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
          value={formData.ano_assinatura}
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
          value={formData.ano_operacao}
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
          value={formData.ano_termino}
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
          value={formData.resp_frete}
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
          value={formData.pedido_min}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Reajuste
        <select
          value={formData.reajuste_igpm_ipca}
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
          value={formData.tipoexclusividade}
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
            value={formData.qtdbolsas}
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
          value={formData.repasse}
          onChange={handleInputChange}
          className={styles.inputStandard}
        />
      </label>
      <label className={styles.labelStandard}>
        Status*
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
          onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
