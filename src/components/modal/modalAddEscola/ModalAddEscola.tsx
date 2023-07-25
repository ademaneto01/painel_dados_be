import React, { useState } from 'react';
import styles from '@/styles/ModalStandard.module.css';
import { IconType, IconBaseProps } from 'react-icons';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface FormData {
  name: string;
  ano: string;
  token: string;
}
interface ModalProps {
  onCancel: () => void;
  unitsKey?: string;
}
interface Option {
  value: string;
  label: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

const ModalAddEscola: React.FC<ModalProps> = ({ onCancel, unitsKey }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    ano: '',
    token: '3MR03M2SPS',
  });

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

    console.log('Form Data:', formData);

    onCancel();
  };

  ////////////////////////////////////////

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectOpen, setSelectOpen] = useState(false);

  const [dropdownOptions] = useState<Option[]>([
    { value: 'Felipe Freitas', label: 'Felipe Freitas' },
    { value: 'Danilo Martins', label: 'Danilo Martins' },
    { value: 'Simone Oliveira', label: 'Simone Oliveira' },
    { value: 'Felipe Rocha', label: 'Felipe Rocha' },
    { value: 'Anderson Nunes', label: 'Anderson Nunes' },
  ]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions).map(
      (option) => option.value,
    );

    const newSelectedOptions = dropdownOptions.filter(
      (option) =>
        selectedValues.includes(option.value) &&
        !selectedOptions.some((selected) => selected.value === option.value),
    );

    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions,
      ...newSelectedOptions,
    ]);
  };

  const handleRemoveOption = (optionValue: string) => {
    setSelectedOptions((selectedOptions) => {
      const updatedOptions = selectedOptions.filter(
        (option) => option.value != optionValue,
      );
      return updatedOptions;
    });
  };

  const handleOpenSelect = () => {
    setSelectOpen(!selectOpen);
  };

  /////////////////////////////////////////////

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>Nova Escola</h2>
        <div className={styles.boxStandard}>
          <label className={styles.labelStandard}>
            Nome
            <input
              type="text"
              placeholder="Nome"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Ano
            <input
              type="text"
              placeholder="Ano"
              name="ano"
              value={formData.ano}
              onChange={handleInputChange}
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Token
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleInputChange}
              className={styles.inputStandard}
              readOnly
            />
          </label>
          <label className={styles.labelStandard}>
            Professor
            <div className={styles.inputStandardAddEscola}>
              <div className={styles.boxTags}>
                {selectedOptions.map((option) => (
                  <button
                    className={styles.buttonLabelEscola}
                    type="button"
                    key={option.value}
                    style={{ marginRight: '5px' }}
                  >
                    {option.label}
                    <button
                      className={styles.buttonRemoveEscola}
                      type="button"
                      onClick={() => handleRemoveOption(option.value)}
                    >
                      x
                    </button>
                  </button>
                ))}
                <button
                  className={styles.btnDropDownEscola}
                  type="button"
                  onClick={handleOpenSelect}
                >
                  {reactIcon(RiArrowDropDownLine)}
                </button>
              </div>
            </div>
            {selectOpen && (
              <select
                multiple
                id={styles.selectDrop}
                onChange={handleSelectChange}
              >
                {dropdownOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            )}
          </label>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.confirmButton}
            type="submit"
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

export default ModalAddEscola;
