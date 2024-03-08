import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { BackendApiGet } from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';
import { ErrorComponent } from '@/errors/index';
import handleApiErrors from '@/utils';

interface FormData {
  nome: string;
  cargo: string;
  email_primario: string;
  email_secundario: string;
  telefone: string;
  data_nascimento: string;
  instagram: string;
  linkedin: string;
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
    instagram: '',
    linkedin: '',
    interlocutor: false,
    ativo: true,
  });
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
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
        instagram: response[0].instagram,
        linkedin: response[0].linkedin,
        interlocutor: response[0].interlocutor,
        ativo: response[0].bo_ativo,
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
                  <span className={styles.label}>Nome:</span>{' '}
                  <div className={styles.boxUrl}>{formData.nome ?? 'N/A'}</div>
                </div>
              </div>
              <div>
                <span className={styles.label}>E-mail Primário:</span>{' '}
                {formData.email_primario ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>E-mail Secundário:</span>{' '}
                {formData.email_secundario ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>Linkedin:</span>{' '}
                {formData.linkedin ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>Instagram:</span>{' '}
                {formData.instagram ?? 'N/A'}
              </div>
            </div>
            <div className={styles.dadosColumn}>
              <div>
                <span className={styles.label}>Data de Nascimento:</span>{' '}
                {formData.data_nascimento ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>Interlocutor:</span>{' '}
                {formData.interlocutor === true ? 'Sim' : 'Não'}
              </div>
              <div>
                <span className={styles.label}>Telefone:</span>{' '}
                {formData.telefone ?? 'N/A'}
              </div>
              <div>
                <span className={styles.label}>Cargo:</span>{' '}
                {formData.cargo ?? 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
};

export default ModalDadosAgente;
