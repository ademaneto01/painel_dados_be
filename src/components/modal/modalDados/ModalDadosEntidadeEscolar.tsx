import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';
import EntitiesUsersPDG from '@/entities/EntitiesUsuariosPDG';

interface FormData {
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  url_dados: string;
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
    nome_operacional: '',
    cnpj_escola: '',
    cep: '',
    url_dados: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    complemento: '',
  });
  const [usuarioPDG, setUsuarioPDG] = useState<EntitiesUsersPDG[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [loaded]);

  async function fetchData() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiMock(`${token}`);

      const response = await backendApi.localizarEntitadeEscolar({
        id: idEntidade,
      });
      setFormData({
        nome_operacional: response[0].nome_operacional,
        cnpj_escola: response[0].cnpj_escola,
        url_dados: response[0].url_dados,
        cep: response[0].cep,
        endereco: response[0].endereco,
        cidade: response[0].cidade,
        uf: response[0].uf,
        bairro: response[0].bairro,
        complemento: response[0].complemento,
      });

      const usuariosPDG = await backendApi.localizarUsuariosPDG();
      const usuarioEncontrado = usuariosPDG.find((user) => {
        return user.id === response[0].id_usuario_pdg;
      });
      setUsuarioPDG(usuarioEncontrado ? [usuarioEncontrado] : []);
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
        <div className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}>
          <div className={styles.boxBtnClose} onClick={onCancel}>
            {reactIcon(ImCross)}
          </div>
          <div className={styles.boxTitle}>
            <h1>Dados Gerais</h1>
          </div>
          <div className={styles.boxDados}>
            <div className={styles.dados}>
              <p>
                <span className={styles.label}>Nome Operacional:</span>{' '}
                {formData.nome_operacional}
              </p>
              <p>
                <span className={styles.label}>CNPJ Escola:</span>{' '}
                {formData.cnpj_escola}
              </p>
              <p>
                <span className={styles.label}>RESP. Pedagógico:</span>{' '}
                {usuarioPDG.length > 0 ? usuarioPDG[0].nome : 'N/A'}
              </p>
              <div className={styles.conteinerUrlDados}>
                <span className={styles.label}>URL Dados:</span>{' '}
                <div className={styles.boxUrl}>{formData.url_dados}</div>
              </div>
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
