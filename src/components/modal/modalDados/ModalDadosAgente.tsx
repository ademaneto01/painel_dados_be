import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { FailedToFetchError } from '@/errors';
import { BackendApiGet } from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';

interface FormData {
  nome: string;
  cargo: string;
  email_primario: string;
  email_secundario: string;
  telefone: string;
  data_nascimento: string;
  interlocutor: boolean;
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
    interlocutor: false,
    ativo: true,
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [loaded]);

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);

      const response = await backendApi.localizarAgenteId(uuid_agente);
      setFormData({
        nome: response[0].nome,
        cargo: response[0].cargo,
        email_primario: response[0].no_email_primario,
        email_secundario: response[0].no_email_secundario,
        telefone: response[0].nu_telefone,
        data_nascimento: response[0].data_nascimento,
        interlocutor: response[0].interlocutor,
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
              <p>
                <div className={styles.conteinerUrlDados}>
                  <span className={styles.label}>Nome:</span>{' '}
                  <div className={styles.boxUrl}>{formData.nome}</div>
                </div>
              </p>
              <p>
                <span className={styles.label}>E-mail Primário:</span>{' '}
                {formData.email_primario}
              </p>

              <p>
                <span className={styles.label}>E-mail Secundário:</span>{' '}
                {formData.email_secundario}
              </p>
              <p>
                <span className={styles.label}>Interlocutor:</span>{' '}
                {formData.interlocutor === true ? 'Sim' : 'Não'}
              </p>
            </div>
            <div className={styles.dadosColumn}>
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
