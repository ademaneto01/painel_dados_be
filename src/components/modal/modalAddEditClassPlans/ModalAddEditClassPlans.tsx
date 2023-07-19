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
}

const ModalAddEditClassPlan: React.FC<ModalProps> = ({
  onCancel,
  modalKey,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    input1: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const classPlans = await backendApi.getClassPlans();
        const classPlan = classPlans.find(
          (classPlan) => classPlan.id === modalKey,
        );
        setFormData({
          input1: classPlan?.nome || '',
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSave = () => {
  //     onCancel();
  // };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2>Editar Class Plans</h2>
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

export default ModalAddEditClassPlan;
