import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/ModalAddUser.module.css';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';

interface FormData {
  className: string;
  contentName: string;
}
interface ModalProps {
  onCancel: () => void;
  unitsKey?: string;
}
const ModalAddEditUnits: React.FC<ModalProps> = ({ onCancel, unitsKey }) => {
  const [formData, setFormData] = useState<FormData>({
    className: '',
    contentName: '',
  });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const unitsData = await backendApi.getUnits();
        const unitData = unitsData.find((unit) => unit.id === unitsKey);
        setFormData({
          className: unitData?.nome || '',
          contentName: unitData?.doc || '',
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode realizar a lógica para salvar os dados do formulário
    console.log('Form Data:', formData);

    // Fechar o modal após salvar
    onCancel();
  };

  return (
    <div className={styles.backGroundModalAddUser}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>Novo Plano de Aula</h2>
        <label className={styles.labelModalAddUser}>
          Nome
          <input
            type="text"
            placeholder="Nome"
            name="className"
            value={formData.className}
            onChange={handleInputChange}
            className={styles.inputAddUser}
          />
        </label>
        <label className={styles.labelModalAddUser}>
          Content
          <input
            type="text"
            placeholder="Content"
            name="contentName"
            value={formData.contentName}
            onChange={handleInputChange}
            className={styles.inputAddUser}
          />
        </label>

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

export default ModalAddEditUnits;
