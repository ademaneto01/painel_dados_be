import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';

interface FormData {
  nome_simplificado: string;
  razao_social: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  situacao: string;
  complemento: string;
  qtdescolas: string;
}
interface ModalProps {
  onCancel: () => void;
  idContrato: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}
const ModalDadosContrato: React.FC<ModalProps> = ({ onCancel, idContrato }) => {
  const [formData, setFormData] = useState<FormData>({
    nome_simplificado: '',
    razao_social: '',
    cnpj: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    situacao: '',
    complemento: '',
    qtdescolas: '',
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [loaded]);

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      const response = await backendApi.findOneContract({ id: idContrato });
      setFormData({
        nome_simplificado: response[0].nome_simplificado,
        razao_social: response[0].razao_social,
        cnpj: response[0].cnpj,
        cep: response[0].cep,
        endereco: response[0].endereco,
        cidade: response[0].cidade,
        uf: response[0].uf,
        bairro: response[0].bairro,
        situacao: response[0].situacao,
        complemento: response[0].complemento,
        qtdescolas: response[0].qtdescolas,
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
                <span className={styles.label}>Nome Simplificado:</span>{' '}
                {formData.nome_simplificado}
              </p>
              <p>
                <span className={styles.label}>Razao Social:</span>{' '}
                {formData.razao_social}
              </p>
              <p>
                <span className={styles.label}>CNPJ:</span> {formData.cnpj}
              </p>
              <p>
                <span className={styles.label}>QTD. Escolas:</span>{' '}
                {formData.qtdescolas}
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

export default ModalDadosContrato;
