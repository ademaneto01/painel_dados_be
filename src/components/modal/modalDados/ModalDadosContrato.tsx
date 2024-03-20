import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { BackendApiGet } from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';
import { ErrorComponent } from '@/errors/index';
import handleApiErrors from '@/utils/HandleApiErrors';

interface FormData {
  nome_simplificado: string;
  razao_social: string;
  cnpj_cont: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
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
    cnpj_cont: '',
    cep: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    complemento: '',
    qtdescolas: '',
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    fetchData();
  }, [loaded]);

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);

      const response = await backendApi.localizarContrato(idContrato);
      setFormData({
        nome_simplificado: response[0].nome_simplificado,
        razao_social: response[0].razao_social,
        cnpj_cont: response[0].cnpj_cont,
        cep: response[0].cep,
        endereco: response[0].endereco,
        cidade: response[0].cidade,
        uf: response[0].uf,
        bairro: response[0].bairro,
        complemento: response[0].complemento,
        qtdescolas: response[0].qtdescolas,
      });
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
    } finally {
      setLoaded(true);
    }
  }

  return (
    <>
      <div className={styles.background} onClick={onCancel}>
        <div
          className={styles.container}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.boxBtnClose} onClick={onCancel}>
            {reactIcon(ImCross)}
          </div>
          <div className={styles.boxTitle}>
            <h1>Dados Gerais</h1>
          </div>
          <div className={styles.boxDados}>
            <div className={styles.dadosColumn}>
              <div>
                <div className={styles.conteinerUrlDados}>
                  <span className={styles.label}>Nome Simplificado:</span>{' '}
                  <div className={styles.boxUrl}>
                    {formData.nome_simplificado ?? 'N/A'}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.conteinerUrlDados}>
                  <span className={styles.label}>Razao Social:</span>{' '}
                  <div className={styles.boxUrl}>
                    {formData.razao_social ?? 'N/A'}
                  </div>
                </div>
              </div>
              <div>
                <span className={styles.label}>CNPJ Contratual:</span>{' '}
                {formData.cnpj_cont ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>QTD. Escolas:</span>{' '}
                {formData.qtdescolas ?? 'N/A'}
              </div>
            </div>
            <div className={styles.dadosColumn}>
              <div>
                <span className={styles.label}>Rua:</span>{' '}
                {formData.endereco ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>CEP:</span>{' '}
                {formData.cep ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>Cidade:</span>{' '}
                {formData.cidade ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>UF:</span> {formData.uf ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>Bairro:</span>{' '}
                {formData.bairro ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>Complemento:</span>{' '}
                {formData.complemento ?? 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
};

export default ModalDadosContrato;
