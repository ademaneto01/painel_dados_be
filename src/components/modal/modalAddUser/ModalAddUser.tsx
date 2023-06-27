import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from "@/styles/ModalAddUser.module.css";

interface FormData {
  firstName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  role: string;
}
interface ModalProps {
  onCancel: () => void;
}
const ModalAddUser: React.FC<ModalProps> = ({  onCancel}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <div className={styles.backGroundModalAddUser}>
      <form className={styles.container} onSubmit={handleSubmit}>
          <h2>Novo Usuário</h2>
        <label className={styles.labelModalAddUser}>
          Nome
        <input
          type="text"
          placeholder="Nome"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className={styles.inputAddUser}
        />
        </label>
        <label className={styles.labelModalAddUser}>
          E-mail
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={formData.email}
          className={styles.inputAddUser}
        />
        </label>
        <label className={styles.labelModalAddUser}>
        Confirme o E-mail
        <input
          type="email"
          placeholder="Confirme o E-mail"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleInputChange}
          className={styles.inputAddUser}
        />
        </label>
        <label className={styles.labelModalAddUser}>
          Senha
        <input
          type="password"
          placeholder="Senha"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={styles.inputAddUser}
        />
        </label>
        <label className={styles.labelModalAddUser}>
          Confirme a senha
        <input
          type="password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={styles.inputAddUser}
        />
        </label>
        <label className={styles.labelModalAddUser}>
          Permissão
        <select
          value={formData.role}
          onChange={handleInputChange}
          name="role"
          className={styles.inputAddUserSelect}
        >
          <option value="">-</option>
          <option value="administrator">Administrator</option>
          <option value="estudante">Estudante</option>
          <option value="professor">Professor</option>
        </select>
        </label>
        <div className={styles.buttonContainer}>
                <button className={styles.confirmButton} type="button" onClick={handleSubmit} >
                  Salvar
                </button>
                <button className={styles.cancelButton} type="button" onClick={onCancel}>
                  Cancelar
                </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddUser;
