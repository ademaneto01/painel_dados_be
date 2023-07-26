import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';

interface ModalProps {
  // onSave: (data: FormData) => void;
  modalKey: string;
  onCancel: () => void;
}

interface FormData {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
  input7: string;
}

const ModalAddEditSchool: React.FC<ModalProps> = ({ onCancel, modalKey }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const schools = await backendApi.getSchools();
        const schoolInfo = schools.find((school) => school.id === modalKey);
        setFormData({
          input1: schoolInfo?.nome || '',
          input2: schoolInfo?.nomeContato || '',
          input3: schoolInfo?.sso || '',
          input4: schoolInfo?.cidade || '',
          input5: schoolInfo?.cep || '',
          input6: schoolInfo?.estado || '',
          input7: schoolInfo?.telefone || '',
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
  }, [loaded, modalKey]);

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if ('value' in event.target) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  // const handleSave = () => {
  //     onCancel();
  // };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2>Editar Escola</h2>
        <form>
          <div className={styles.boxStandard}>
            <label className={styles.labelStandard}>
              Nome:
              <input
                className={styles.inputStandard}
                type="text"
                name="input1"
                value={formData.input1}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.labelStandard}>
              Nome do Contato:
              <input
                className={styles.inputStandard}
                type="text"
                name="input2"
                value={formData.input2}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.labelStandard}>
              SSO:
              <select
                className={styles.inputSelect}
                name="input3"
                value={formData.input3}
                onChange={handleInputChange}
              >
                <option value="SEM SSO">SEM SSO</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Google">Google</option>
              </select>
            </label>
          </div>
          <div className={styles.boxCidadeEstadoCepTel}>
            <div className={styles.boxCidadeCep}>
              <label className={styles.labelStandard}>
                Cidade:
                <input
                  className={styles.inputStandard}
                  type="text"
                  name="input4"
                  value={formData.input4}
                  onChange={handleInputChange}
                />
              </label>
              <label className={styles.labelStandard}>
                CEP:
                <input
                  className={styles.inputStandard}
                  type="text"
                  name="input5"
                  value={formData.input5}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className={styles.boxEstadoTel}>
              <label className={styles.labelStandard}>
                Estado:
                <input
                  className={styles.inputStandard}
                  type="text"
                  name="input6"
                  value={formData.input6}
                  onChange={handleInputChange}
                />
              </label>
              <label className={styles.labelStandard}>
                Telefone:
                <input
                  className={styles.inputStandard}
                  type="text"
                  name="input7"
                  value={formData.input7}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.confirmButton} type="button">
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
    </div>
  );
};

export default ModalAddEditSchool;
