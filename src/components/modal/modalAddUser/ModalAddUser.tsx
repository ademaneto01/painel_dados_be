import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';

interface FormData {
  nome: string | null;
  email: string | null;
  confirmEmail: string | null;
  senha: string | null;
  confirmPassword: string | null;
  perfil: string | null;
  url_dados: string | null;
}
interface ModalProps {
  onCancel: () => void;
  userId: string;
}
const ModalAddUser: React.FC<ModalProps> = ({ onCancel, userId }) => {
  const { usersUpdated, setUsersUpdated } = useGlobalContext();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    confirmEmail: '',
    senha: '',
    confirmPassword: '',
    perfil: '',
    url_dados: '',
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    async function fetchData() {
      try {
        const token = localStorage.getItem('auth_token');
        const backendApi = new BackendApiMock(`${token}`);

        await backendApi.cadastroUser({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          perfil: formData.perfil,
          url_dados: formData.url_dados,
        });
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          setError(true);
        } else {
          throw error;
        }
      } finally {
        setUsersUpdated(true);
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
    setUsersUpdated(true);
    onCancel();
  };

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>Novo Usuário</h2>
        <div className={styles.boxStandard}>
          <label className={styles.labelStandard}>
            Nome
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
            E-mail
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>

          <label className={styles.labelStandard}>
            Senha
            <input
              type="password"
              placeholder="Senha"
              name="senha"
              value={formData.senha ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Confirme a senha
            <input
              type="password"
              placeholder="Confirme a senha"
              name="confirmPassword"
              value={formData.confirmPassword ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            URL
            <input
              type="text"
              placeholder="URL Dados"
              name="url_dados"
              value={formData.url_dados ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Permissão
            <select
              value={formData.perfil ?? ''}
              onChange={handleInputChange}
              name="perfil"
              className={styles.inputSelect}
            >
              <option value="">-</option>
              <option value="Administrador">Administrator</option>
              <option value="Estudante">Estudante</option>
              <option value="Professor">Professor</option>
            </select>
          </label>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.confirmButton}
            type="button"
            onClick={handleSubmit}
          >
            Salvar
          </button>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddUser;
