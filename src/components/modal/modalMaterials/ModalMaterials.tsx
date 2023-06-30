import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/ModalAddUser.module.css';
import { useEffect } from 'react';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import ErrorComponent from '@/components/ErrorComponent';
interface FormData {
  nome: string;
  disciplina: string;
  grade: string;
}
interface ModalProps {
  onCancel: () => void;
  modalMaterials?: string;
}
const ModalMaterials: React.FC<ModalProps> = ({ onCancel, modalMaterials }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    disciplina: '',
    grade: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const schools = await backendApi.getMaterials();

        const schoolInfo = schools.find(
          (school) => school.id === modalMaterials,
        );
        setFormData({
          nome: schoolInfo?.nome || '',
          disciplina: schoolInfo?.disciplina || '',
          grade: schoolInfo?.grade || '',
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
      nome: '',
      disciplina: '',
      grade: '',
    });
  };
  if (!error) {
    return (
      <div className={styles.backGroundModalAddUser}>
        <form className={styles.container} onSubmit={handleSubmit}>
          <h2>Novo Material</h2>
          <label className={styles.labelModalAddUser}>
            Nome
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className={styles.inputAddUser}
            />
          </label>
          <label className={styles.labelModalAddUser}>
            Permissão
            <select
              value={formData.disciplina}
              onChange={handleInputChange}
              name="disciplina"
              className={styles.inputAddUserSelect}
            >
              <option value="">-</option>
              <option value="Be Activities">Be Activities</option>
              <option value="Be Activities for Kids">Estudante</option>
              <option value="Language">Language</option>
              <option value="Science">Science</option>
            </select>
          </label>
          <label className={styles.labelModalAddUser}>
            Permissão
            <select
              value={formData.grade}
              onChange={handleInputChange}
              name="grade"
              className={styles.inputAddUserSelect}
            >
              <option value="">-</option>
              <option value="k3">k3</option>
              <option value="k4">k4</option>
              <option value="k5">k5</option>
              <option value="1º ano">1º ano</option>
              <option value="2º ano">2º ano</option>
            </select>
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
  } else {
    return <ErrorComponent />;
  }
};

export default ModalMaterials;
