import React, {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import styles from '@/styles/NovoContrato.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import ErrorComponent from '@/components/ErrorComponent';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, CreateButton } from '@/components/shared';
import { BiCloudDownload } from 'react-icons/bi';
import { IconType, IconBaseProps } from 'react-icons';
import { useGlobalContext } from '@/context/store';

interface pageContratosProps {
  setPage: Dispatch<SetStateAction<PageEnumContratos>>;
  setIdContrato: Dispatch<SetStateAction<string>>;
}

interface FormData {
  nome_simplificado: string;
  razao_social: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}
export default function SobreescreverContrato(
  props: pageContratosProps,
): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { idContrato, setPage } = useGlobalContext();
  const [msgError, setMsgError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    nome_simplificado: '',
    razao_social: '',
    cnpj: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    complemento: '',
  });

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      await backendApi.sobrescreverContrato({
        id_contrato: idContrato,
        nome_simplificado: formData.nome_simplificado,
        razao_social: formData.razao_social,
        cnpj: formData.cnpj,
        cep: formData.cep,
        endereco: formData.endereco,
        cidade: formData.cidade,
        uf: formData.uf,
        bairro: formData.bairro,
        complemento: formData.complemento,
      });
    } catch (error) {
      if (error instanceof FailedToFetchError) {
        setError(true);
      } else {
        throw error;
      }
    } finally {
      setLoaded(true);
    }
    props.setPage(PageEnumContratos.entidadesContratuais);
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      formData.nome_simplificado === '' ||
      formData.razao_social == '' ||
      formData.cnpj == '' ||
      formData.cep == '' ||
      formData.endereco == '' ||
      formData.cidade == '' ||
      formData.uf == '' ||
      formData.bairro == '' ||
      formData.complemento == ''
    ) {
      setError(true);
      setMsgError('Todos campos são obrigatórios...');
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    } else {
      fetchData();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h4>Sobrescrever Contrato</h4>

      <PageContentContainer>
        <div className={styles.boxBtns}>
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
          />
        </div>

        <form className={styles.boxForm} onSubmit={handleSubmit}>
          <label className={styles.labelStandard}>
            Nome Simplificado
            <input
              type="text"
              placeholder="Nome Simplificado"
              name="nome_simplificado"
              value={formData.nome_simplificado}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Razão Social
            <input
              type="text"
              placeholder="Razão Sociala"
              name="razao_social"
              value={formData.razao_social}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            CNPJ
            <input
              type="text"
              placeholder="CNPJ"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            CEP
            <input
              type="text"
              placeholder="CEP"
              name="cep"
              value={formData.cep}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Endereço
            <input
              type="text"
              placeholder="Endereço"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Cidade
            <input
              type="text"
              placeholder="Cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            UF
            <input
              type="text"
              placeholder="UF"
              name="uf"
              value={formData.uf}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Bairro
            <input
              type="text"
              placeholder="Bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Complemento
            <input
              type="text"
              placeholder="Complemente"
              name="complemento"
              value={formData.complemento}
              onChange={handleInputChange}
              className={styles.inputStandard}
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
              onClick={() =>
                props.setPage(PageEnumContratos.entidadesContratuais)
              }
            >
              Cancelar
            </button>
          </div>
        </form>
        {error ? <ErrorComponent message={msgError} /> : ''}
      </PageContentContainer>
    </div>
  );
}
