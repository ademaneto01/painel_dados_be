import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalAddEditTeachers.module.css';
import backendApi from '@/backendApi';
import { EntitiesTeacherGuides } from '@/entities';
import { FailedToFetchError } from '@/errors';

interface ModalProps {
  onClose: () => void;
  modalKey?: string;
}

interface FormData {
  nomeInput: string;
  anoInput: string | null;
  materialInput: string;
}

const ModalAddEditTeachers: React.FC<ModalProps> = ({ onClose, modalKey }) => {
  const [formData, setFormData] = useState<FormData>({
    nomeInput: '',
    anoInput: null,
    materialInput: '',
  });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const teachersGuides = await backendApi.getTeacherGuides();
        const teachersData = teachersGuides.find(
          (teachersGuide) => teachersGuide.id === modalKey,
        );
        setFormData({
          nomeInput: teachersData?.nome || '',
          anoInput: teachersData?.ano || '',
          materialInput: teachersData?.material || '',
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode realizar a lógica para salvar os dados do formulário
    console.log('Form Data:', formData);

    // Fechar o modal após salvar
    onClose();
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.backGroundModalAddUser}>
      <form className={styles.container} onSubmit={handleSave}>
        <h2>Modal Editar</h2>
        <label className={styles.labelModalAddUser}>Nome</label>
        <input
          type="text"
          id="text-input"
          name="textInput"
          className={styles.inputAddUser}
          value={formData.nomeInput}
          onChange={handleChange}
        />

        <label className={styles.labelModalAddUser}>
          Ano
          <select
            className={styles.inputSelect}
            name="anoInput"
            id="image-input"
            value={formData.anoInput || ''}
            onChange={handleInputChange}
          >
            <option value="-">-</option>
            <option value="1 em">1 em</option>
            <option value="2 em">2 em</option>
            <option value="3 em">3 em</option>
            <option value="K3">k3</option>
          </select>
        </label>

        <label className={styles.labelModalAddUser}>
          Material
          <select
            className={styles.inputSelect}
            name="materialInput"
            id="image-input"
            value={formData.materialInput || ''}
            onChange={handleInputChange}
          >
            <option value="-">-</option>
            <option value="21C COMM level 1">21C COMM level 1</option>
            <option value="21C COMM level 2">21C COMM level 2</option>
            <option value="21C COMM level 3">21C COMM level 3</option>
            <option value="Explorations 2">Explorations 2</option>
          </select>
        </label>
        <div className={styles.buttonContainer}>
          <button
            className={styles.confirmButton}
            type="button"
            onClick={handleSave}
          >
            Salvar
          </button>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddEditTeachers;
