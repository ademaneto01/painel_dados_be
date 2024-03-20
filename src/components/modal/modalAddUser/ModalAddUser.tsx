import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { BackendApiGet, BackendApiPost } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import handleApiErrors from '@/utils/HandleApiErrors';
import { InputSelect, InputStandard, ModalForm } from '@/components/shared';

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
  onUserAdded: () => void;
  titleModal: string;
}

const ModalAddUser: React.FC<ModalProps> = ({
  onCancel,
  titleModal,
  onUserAdded,
}) => {
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
  const [msgError, setMsgError] = useState('');
  const [error, setError] = useState(false);
  const [entidadesEscolaresData, setEntidadesEscolaresData] = useState<
    EntidadesEscolaresData[]
  >([]);

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
    fetchDataEntidadesEscolares();
  }, []);

  async function fetchDataEntidadesEscolares() {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiGet(`${token}`);
      const response = await backendApi.todasEntidadesEscolares();

      const sortedEntidades = response.sort((a, b) => {
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
    } catch (error) {
      handleApiErrors(error, setError, setMsgError);
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
      if (onUserAdded) {
        onUserAdded();
      }

      onCancel();
    } catch (error: any) {
      handleApiErrors(error, setError, setMsgError);
      return null;
    }
  };

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

export default ModalAddUser;
