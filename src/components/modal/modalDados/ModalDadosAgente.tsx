import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';

interface FormData {
  nome: string;
  cargo: string;
  email_primario: string;
  email_secundario: string;
  telefone: string;
  data_nascimento: string
  ativo: boolean;
}
interface ModalProps {
  onCancel: () => void;
  uuid_agente: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}
const ModalDadosAgente: React.FC<ModalProps> = ({ onCancel, uuid_agente }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cargo: '',
    email_primario: '',
    email_secundario: '',
    telefone: '',
    data_nascimento: '',
    ativo: true,
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [loaded]);

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      const response = await backendApi.localizarAgenteId({
        id: uuid_agente,
      });
      setFormData({
        nome: response[0].nome,
        cargo: response[0].cargo,
        email_primario: response[0].no_email_primario,
        email_secundario: response[0].no_email_secundario,
        telefone: response[0].nu_telefone,
        data_nascimento: response[0].data_nascimento,
        ativo: response[0].bo_ativo,
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
                <span className={styles.label}>Nome:</span> {formData.nome}
              </p>
              <p>
                <span className={styles.label}>E-mail Primário:</span>{' '}
                {formData.email_primario}
              </p>

              <p>
                <span className={styles.label}>E-mail Secundário:</span>{' '}
                {formData.email_secundario}
              </p>
            </div>
            <div className={styles.dados}>
            <p>
                <span className={styles.label}>Data de Nascimento:</span>{' '}
                {formData.data_nascimento}
              </p>
              <p>
                <span className={styles.label}>Telefone:</span>{' '}
                {formData.telefone}
              </p>
              <p>
                <span className={styles.label}>Cargo:</span> {formData.cargo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDadosAgente;
