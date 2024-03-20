import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalEditUser.module.css';
import { BackendApiGet, BackendApiPut } from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors/index';
import handleApiErrors from '@/utils/HandleApiErrors';
import { ModalForm, InputStandard, InputSelect } from '@/components/shared';

interface FormData {
  nome: string | null;
  email: string | null;
  senha: string | null;
  confirmPassword: string | null;
  perfil: string | null;
  escola: string | null;
  id_ee: string | null;
  isPasswordMatch: boolean;
}

interface EntidadesEscolaresData {
  id: string | null;
  nome_operacional: string | null;
}

interface ModalProps {
  onCancel: () => void;
  userId: string;
  titleModal: string;
}

const ModalEditUser: React.FC<ModalProps> = ({
  onCancel,
  userId,
  titleModal,
}) => {
  const { setLoadedUser } = useGlobalContext();
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

  function getPasswordClass(isPasswordMatch: boolean): string {
    return isPasswordMatch ? styles.inputStandard : styles.inputStandardError;
  }

  useEffect(() => {
    fetchDataInitial();
  }, [userId]);

  async function fetchDataInitial() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const response = await backendApi.localizarUsuario(userId);

      setFormData({
        nome: response[0]?.nome || '',
        email: response[0]?.email || '',
        senha: '',
        confirmPassword: '',
        id_ee: response[0]?.id_ee || '',
        perfil: response[0]?.perfil || '',
        escola: response[0]?.escola || '',
        isPasswordMatch: true,
      });

      const entidadesEscolares = await backendApi.todasEntidadesEscolares();
      const sortedEntidades = entidadesEscolares.sort((a, b) => {
        const nomeA = a.nome_operacional.toUpperCase();
        const nomeB = b.nome_operacional.toUpperCase();
        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }

        return 0;
      });

      setEntidadesEscolaresData(
        sortedEntidades.map((school) => ({
          id: school.id || '',
          nome_operacional: school.nome_operacional || '',
        })),
      );
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  }

  const handleSubmit = (e: FormEvent) => {
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

    if (!loaded) {
      fetchDataUpdate();
    }

    onCancel();
  };

  async function fetchDataUpdate() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPut(`${token}`);

      await backendApi.editarUsuario({
        id: userId,
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        perfil: formData.perfil,
        id_ee: formData.id_ee,
      });
      setLoadedUser(true);
      setTimeout(() => {
        setLoadedUser(false);
      }, 9000);
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    } finally {
      setLoaded(true);
    }
  }

  return (
    <>
      <ModalForm
        onSubmit={handleSubmit}
        title={titleModal}
        onCancel={onCancel}
        children={
          <div className={styles.boxStandard}>
            <InputStandard
              label="Nome*"
              type="text"
              placeholder="Nome"
              name="nome"
              value={formData.nome ?? ''}
              onChange={handleInputChange}
            />
            <InputStandard
              label="E-mail*"
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email ?? ''}
              onChange={handleInputChange}
            />
            <div className={styles.containerSenhasAddUser}>
              <div className={styles.boxSenhasAddUser}>
                <InputStandard
                  label="Senha*"
                  type="password"
                  placeholder="Senha"
                  name="senha"
                  value={formData.senha ?? ''}
                  onChange={handleInputChange}
                  className={getPasswordClass(formData.isPasswordMatch)}
                />
              </div>
              <div className={styles.boxSenhasAddUser}>
                <InputStandard
                  label="Confirme a senha*"
                  type="password"
                  placeholder="Confirme a senha"
                  name="confirmPassword"
                  value={formData.confirmPassword ?? ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <InputSelect
              label={'Escola*'}
              name={'id_ee'}
              value={formData.id_ee ?? ''}
              onChange={handleInputChange}
              options={entidadesEscolaresData.map((school) => ({
                value: school.id || '',
                label: school.nome_operacional || '-',
              }))}
            />
            <InputSelect
              label={'Perfil*'}
              name={'perfil'}
              value={formData.perfil ?? ''}
              onChange={handleInputChange}
              options={[
                { value: 'Administrador', label: 'Administrator' },
                { value: 'Pedagógico', label: 'Pedagógico' },
                { value: 'Escola', label: 'Escola' },
              ]}
            />
          </div>
        }
      />

      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
};

export default ModalEditUser;
