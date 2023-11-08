import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { FailedToFetchError } from '@/errors';
import { BackendApiGet, BackendApiPost, BackendApiPut } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import ErrorComponent from '@/components/ErrorComponent';

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
  const [entidadesEscolaresData, setEntidadesEscolaresData] = useState<EntidadesEscolaresData[]>([]);

  const [msgError, setMsgError] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        }))
      );
    } catch (error) {
      console.error('Failed to fetch entidades escolares:', error);
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
      setMsgError('Todos os campos são obrigatórios...');
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
    } catch (error) {
      if (error instanceof FailedToFetchError) {
        setError(true);
      } else {
        console.error('Error during user registration:', error);
      }
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
            {/* Rest of the form elements */}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.confirmButton} type="submit">
              Salvar
            </button>
            <button className={styles.cancelButton} type="button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
};

export default ModalAddUser;
