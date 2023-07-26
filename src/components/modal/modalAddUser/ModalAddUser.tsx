import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';

interface FormData {
  firstName: string | null;
  email: string | null;
  confirmEmail: string | null;
  password: string | null;
  confirmPassword: string | null;
  role: string | null;
}
interface ModalProps {
  onCancel: () => void;
  userId: string;
}
const ModalAddUser: React.FC<ModalProps> = ({ onCancel, userId }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const users = await backendApi.getUsers();
        const userData = users.find((user) => user.id === userId);
        setFormData({
          firstName: userData?.nome || '',
          email: userData?.email || '',
          confirmEmail: '',
          password: '',
          confirmPassword: '',
          role: '',
        });
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          setError(true);
        } else {
          throw error;
        }
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
  }, [loaded]);
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

    console.log('Form Data:', formData);

    setFormData({
      firstName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
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
              name="firstName"
              value={formData.firstName ?? ''}
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
            Confirme o E-mail
            <input
              type="email"
              placeholder="Confirme o E-mail"
              name="confirmEmail"
              value={formData.confirmEmail ?? ''}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Senha
            <input
              type="password"
              placeholder="Senha"
              name="password"
              value={formData.password ?? ''}
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
            Permissão
            <select
              value={formData.role ?? ''}
              onChange={handleInputChange}
              name="role"
              className={styles.inputSelect}
            >
              <option value="">-</option>
              <option value="administrator">Administrator</option>
              <option value="estudante">Estudante</option>
              <option value="professor">Professor</option>
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
