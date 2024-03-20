import React from 'react';
import styles from '@/styles/InputSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const InputSelect: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <label className={styles.labelStandard}>
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.inputSelect}
      >
        <option value="">-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InputSelect;
