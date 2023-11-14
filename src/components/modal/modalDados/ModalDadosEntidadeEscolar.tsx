import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalDados.module.css';
import { BackendApiGet } from '@/backendApi';
import { ImCross } from 'react-icons/im';
import { IconType, IconBaseProps } from 'react-icons';
import EntitiesUsersPDG from '@/entities/EntitiesUsuariosPDG';
import { ErrorComponent } from '@/errors/index';

interface FormData {
  nome_operacional: string;
  cnpj_escola: string;
  cep: string;
  url_dados: string;
  instagram: string;
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
    instagram: '',
    endereco: '',
    cidade: '',
    uf: '',
    bairro: '',
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
    } catch (error: any) {
      setError(true);
      if (error.response.data.mensagem) {
        setMsgError(error.response.data.mensagem);
      } else {
        setMsgError('Ocorreu um erro desconhecido.');
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
              <div>
                <span className={styles.label}>Nome Operacional:</span>{' '}
                {formData.nome_operacional}
              </div>
              <div>
                <span className={styles.label}>CNPJ Escola:</span>{' '}
                {formData.cnpj_escola}
              </div>
              <div>
                <span className={styles.label}>RESP. Pedagógico:</span>{' '}
                {usuarioPDG.length > 0 ? usuarioPDG[0].nome : 'N/A'}
              </div>
              <div className={styles.conteinerUrlDados}>
                <span className={styles.label}>URL Dados:</span>{' '}
                <div className={styles.boxUrl}>{formData.url_dados}</div>
              </div>
              <div>
                <span className={styles.label}>Instagram:</span>{' '}
                {formData.instagram}
              </div>
              <div>
                <span className={styles.label}>Rua:</span> {formData.endereco}
              </div>
            </div>
            <div className={styles.dadosColumn}>
              <div>
                <span className={styles.label}>CEP:</span> {formData.cep}
              </div>
              <div>
                <span className={styles.label}>Cidade:</span> {formData.cidade}
              </div>
              <div>
                <span className={styles.label}>UF:</span> {formData.uf}
              </div>
              <div>
                <span className={styles.label}>Bairro:</span> {formData.bairro}
              </div>

              <div>
                <span className={styles.label}>Complemento:</span>{' '}
                {formData.complemento}
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
