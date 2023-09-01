import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';

interface FormData {
  condicao: string;
  codigo_be: string;
  nome_contratual: string;
  tipo_rede: string;
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  complemento: string;
}
interface ModalProps {
  onCancel: () => void;
  idEntidade: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}
const ModalDadosEntidadeEscolar: React.FC<ModalProps> = ({
  onCancel,
  idEntidade,
}) => {
  const [formData, setFormData] = useState<FormData>({
    condicao: '',
    codigo_be: '',
    nome_contratual: '',
    tipo_rede: '',
    nome_operacional: '',
    cnpj_escola: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    complemento: '',
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [loaded]);

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      const response = await backendApi.getEntitadeEscolar({ id: idEntidade });
      setFormData({
        condicao: response[0].condicao,
        codigo_be: response[0].codigo_be,
        nome_contratual: response[0].nome_contratual,
        nome_operacional: response[0].nome_operacional,
        tipo_rede: response[0].tipo_rede,
        cnpj_escola: response[0].cnpj_escola,
        cep: response[0].cep,
        endereco: response[0].endereco,
        cidade: response[0].cidade,
        uf: response[0].uf,
        bairro: response[0].bairro,
        complemento: response[0].complemento,
      });
    } catch (error) {
      if (error instanceof FailedToFetchError) {
        console.log(error);
      } else {
        throw error;
      }
    } finally {
      setLoaded(true);
    }
  }

  return (
    <>
      <div className={styles.background} onClick={onCancel}>
        <div className={styles.container}>
          <div className={styles.boxBtnClose} onClick={onCancel}>
            {reactIcon(ImCross)}
          </div>
          <div className={styles.boxTitle}>
            <h1>Dados Gerais</h1>
          </div>
          <div className={styles.boxDados}>
            <div className={styles.dados}>
              <p>
                <span className={styles.label}>Nome Contratual:</span>{' '}
                {formData.nome_contratual}
              </p>
              <p>
                <span className={styles.label}>Nome Operacional:</span>{' '}
                {formData.nome_operacional}
              </p>
              <p>
                <span className={styles.label}>Condição:</span>{' '}
                {formData.condicao}
              </p>
              <p>
                <span className={styles.label}>Tipo Rede:</span>{' '}
                {formData.tipo_rede}
              </p>
              <p>
                <span className={styles.label}>Código Be:</span>{' '}
                {formData.codigo_be}
              </p>
              <p>
                <span className={styles.label}>CNPJ Escola:</span>{' '}
                {formData.cnpj_escola}
              </p>
            </div>
            <div className={styles.dados}>
              <p>
                <span className={styles.label}>CEP:</span> {formData.cep}
              </p>
              <p>
                <span className={styles.label}>Cidade:</span> {formData.cidade}
              </p>
              <p>
                <span className={styles.label}>UF:</span> {formData.uf}
              </p>
              <p>
                <span className={styles.label}>Bairro:</span> {formData.bairro}
              </p>

              <p>
                <span className={styles.label}>Complemento:</span>{' '}
                {formData.complemento}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDadosEntidadeEscolar;
