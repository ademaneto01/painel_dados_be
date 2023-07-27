import React, { useState, useEffect } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { base64 } from '@/components/base64';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import ImageNext from 'next/image';

interface ModalProps {
  onClose: () => void;
  modalKey: string;
}

interface FormData {
  textInput: string;
  imageInput: string | null;
  textareaInput: string;
}

const ModalLessons: React.FC<ModalProps> = ({ onClose, modalKey }) => {
  const [formData, setFormData] = useState<FormData>({
    textInput: '',
    imageInput: null,
    textareaInput: '',
  });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const lessons = await backendApi.getLessons();
        const lessonsData = lessons.find((lesson) => lesson.id === modalKey);
        setFormData({
          textInput: lessonsData?.nome || '',
          imageInput: lessonsData?.arquivo || '',
          textareaInput: lessonsData?.descricao || '',
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const base64String = await base64(file);

      const imageELement = new Image();
      imageELement.src = base64String;

      imageELement.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = imageELement.width;
        canvas.height = imageELement.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(imageELement, 0, 0);

        const convertedBase64 = canvas.toDataURL('image/jpeg');

        setFormData((prevFormData) => ({
          ...prevFormData,
          imageInput: convertedBase64,
        }));
      };
    }
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    onClose();
  };

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleSave}>
        <h2>Modal Editar</h2>
        <div className={styles.boxStandard}>
          <label className={styles.labelStandard} htmlFor="textInput">
            Nome
          </label>
          <input
            id="textInput"
            type="text"
            name="textInput"
            className={styles.inputStandard}
            value={formData.textInput}
            onChange={handleChange}
          />

          <label className={styles.labelStandard} htmlFor="image-input">
            Upload
          </label>
          <input
            className={styles.inputFile}
            type="file"
            id="image-input"
            onChange={handleFileChange}
          />
          {formData.imageInput && (
            <ImageNext
              src={formData.imageInput}
              alt="Uploaded"
              width={6}
              height={6}
              className={styles.uploadedImage}
            />
          )}
          <label className={styles.labelStandard} htmlFor="textarea-input">
            Descrição
          </label>
          <input
            id="textarea-input"
            name="textareaInput"
            type="text"
            className={styles.inputStandard}
            value={formData.textareaInput}
            onChange={handleChange}
          />
        </div>
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

export default ModalLessons;
