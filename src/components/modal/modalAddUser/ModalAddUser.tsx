import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { BackendApiGet, BackendApiPost } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors/index';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmPassword: string;
  perfil: string;
  escola: string;
  id_ee: string;
  isPasswordMatch: boolean;
}

interface EntidadesEscolaresData {
  id: string;
  nome_operacional: string;
}

interface ModalProps {
  onCancel: () => void;
  titleModal: string;
}

const ModalAddUser: React.FC<ModalProps> = ({ onCancel, titleModal }) => {
  const { usersUpdated, setUsersUpdated } = useGlobalContext();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    confirmPassword: '',
    perfil: '',
    escola: '',
    id_ee: '',
    isPasswordMatch: true,
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [entidadesEscolaresData, setEntidadesEscolaresData] = useState<
    EntidadesEscolaresData[]
  >([]);

  const [msgError, setMsgError] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleApiErrors = (error: any) => {
    setError(true);

    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };

  function getPasswordClass(isPasswordMatch: boolean): string {
    return isPasswordMatch ? styles.inputStandard : styles.inputStandardError;
  }

  useEffect(() => {
    fetchDataEntidadesEscolares();
  }, []);

  async function fetchDataEntidadesEscolares() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const response = await backendApi.todasEntidadesEscolares();
      setEntidadesEscolaresData(
        response.map((school) => ({
          id: school.id || '',
          nome_operacional: school.nome_operacional || '',
        })),
      );
    } catch (error) {
      handleApiErrors(error);
      return null;
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      formData.nome === '' ||
      formData.email === '' ||
      formData.senha === '' ||
      formData.confirmPassword === '' ||
      formData.id_ee === '' ||
      formData.perfil === ''
    ) {
      setError(true);
      setMsgError('Informe os campos obrigatórios.');
      setTimeout(() => {
        setError(false);
      }, 6000);
      return;
    } else if (formData.senha !== formData.confirmPassword) {
      setFormData((prevState) => ({
        ...prevState,
        isPasswordMatch: false,
      }));
      setError(true);
      setMsgError('As senhas digitadas não coincidem.');
      setTimeout(() => {
        setError(false);
        setFormData((prevState) => ({
          ...prevState,
          isPasswordMatch: true,
        }));
      }, 6000);
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPost(`${token}`);

      await backendApi.registrarUsuario({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        perfil: formData.perfil,
        id_ee: formData.id_ee,
      });

      setUsersUpdated(true);
      onCancel();
    } catch (error: any) {
      handleApiErrors(error);
      return null;
    }
  };

  return (
    <>
      <div className={styles.background} onClick={onCancel}>
        <form
          className={styles.container}
          onSubmit={handleSubmit}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1
            style={{
              fontSize: '20px',
              color: 'gray',
            }}
          >
            {titleModal}
          </h1>
          <div className={styles.boxStandard}>
            <label className={styles.labelStandard}>
              Nome*
              <input
                type="text"
                placeholder="Nome"
                name="nome"
                value={formData.nome ?? ''}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </label>
            <label className={styles.labelStandard}>
              E-mail*
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={formData.email ?? ''}
                onChange={handleInputChange}
                className={styles.inputStandard}
              />
            </label>
            <div className={styles.containerSenhasAddUser}>
              <div className={styles.boxSenhasAddUser}>
                <label className={styles.labelStandard}>
                  Senha*
                  <input
                    type="password"
                    placeholder="Senha"
                    name="senha"
                    value={formData.senha ?? ''}
                    onChange={handleInputChange}
                    className={getPasswordClass(formData.isPasswordMatch)}
                  />
                </label>
              </div>
              <div className={styles.boxSenhasAddUser}>
                <label className={styles.labelStandard}>
                  Confirme a senha*
                  <input
                    type="password"
                    placeholder="Confirme a senha"
                    name="confirmPassword"
                    value={formData.confirmPassword ?? ''}
                    onChange={handleInputChange}
                    className={styles.inputStandard}
                  />
                </label>
              </div>
            </div>
            <label className={styles.labelStandard}>
              Escola*
              <select
                value={formData.id_ee ?? ''}
                onChange={handleInputChange}
                name="id_ee"
                className={styles.inputSelect}
              >
                <option value="">-</option>
                {entidadesEscolaresData.map((school) => (
                  <option key={school.id} value={school.id || ''}>
                    {school.nome_operacional}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.labelStandard}>
              Perfil*
              <select
                value={formData.perfil ?? ''}
                onChange={handleInputChange}
                name="perfil"
                className={styles.inputSelect}
              >
                <option value="">-</option>
                <option value="Administrador">Administrator</option>
                <option value="Pedagógico">Pedagógico</option>
                <option value="Escola">Escola</option>
              </select>
            </label>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button className={styles.confirmButton} type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
};

export default ModalAddUser;
