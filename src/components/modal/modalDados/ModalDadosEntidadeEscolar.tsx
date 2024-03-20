import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { BackendApiGet } from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';
import EntitiesUsersPDG from '@/entities/EntitiesUsuariosPDG';
import { ErrorComponent } from '@/errors/index';
import handleApiErrors from '@/utils/HandleApiErrors';

interface FormData {
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  url_dados: string;
  instagram: string;
  facebook: string;
  linkwhats: string;
  endereco: string;
  cidade: string;
  uf: string;
  bairro: string;
  inep: string;
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
    instagram: '',
    facebook: '',
    linkwhats: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
    inep: '',
    complemento: '',
  });
  const [usuarioPDG, setUsuarioPDG] = useState<EntitiesUsersPDG[]>([]);
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

      const response = await backendApi.localizarEntidadeEscolar(idEntidade);
      setFormData({
        nome_operacional: response[0].nome_operacional,
        cnpj_escola: response[0].cnpj_escola,
        url_dados: response[0].url_dados,
        instagram: response[0].instagram,
        facebook: response[0].facebook,
        linkwhats: response[0].linkwhats,
        cep: response[0].cep,
        endereco: response[0].endereco,
        cidade: response[0].cidade,
        uf: response[0].uf,
        bairro: response[0].bairro,
        inep: response[0].inep,
        complemento: response[0].complemento,
      });
      const usuariosPDG = await backendApi.localizarUsuariosPDG();
      const usuarioEncontrado = usuariosPDG.find((user) => {
        return user.id === response[0].id_usuario_pdg;
      });
      setUsuarioPDG(usuarioEncontrado ? [usuarioEncontrado] : []);
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
                <span className={styles.label}>
                  Nome Operacional:{' '}
                  {formData.nome_operacional?.trim()
                    ? formData.nome_operacional
                    : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  CNPJ Escola:{' '}
                  {formData.cnpj_escola?.trim() ? formData.cnpj_escola : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  RESP. Pedagógico:{' '}
                  {usuarioPDG && usuarioPDG.length > 0
                    ? usuarioPDG[0].nome
                    : 'N/A'}
                </span>
              </div>
              <div className={styles.conteinerUrlDados}>
                <span className={styles.label}>URL Dados:</span>
                <div className={styles.boxUrl}>
                  {formData.url_dados?.trim() ? formData.url_dados : 'N/A'}
                </div>
              </div>
              <div>
                <span className={styles.label}>
                  Instagram:{' '}
                  {formData.instagram?.trim() ? formData.instagram : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  Facebook:{' '}
                  {formData.facebook?.trim() ? formData.facebook : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  Link WhatsApp:{' '}
                  {formData.linkwhats?.trim() ? formData.linkwhats : 'N/A'}
                </span>
              </div>
            </div>
            <div className={styles.dadosColumn}>
              <div>
                <span className={styles.label}>
                  INEP: {formData.inep ? formData.inep : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  Rua: {formData.endereco?.trim() ? formData.endereco : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  CEP: {formData.cep?.trim() ? formData.cep : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  Cidade: {formData.cidade?.trim() ? formData.cidade : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  UF: {formData.uf?.trim() ? formData.uf : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  Bairro: {formData.bairro?.trim() ? formData.bairro : 'N/A'}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  Complemento:{' '}
                  {formData.complemento?.trim() ? formData.complemento : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
};

export default ModalDadosEntidadeEscolar;
