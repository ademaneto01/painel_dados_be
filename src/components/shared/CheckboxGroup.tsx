import React from 'react';
import styles from '@/styles/CheckboxGroup.module.css';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selectedOptions, onChange }) => {
  const handleCheckboxChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      onChange(selectedOptions.filter((option) => option !== value));
    } else {
      onChange([...selectedOptions, value]);
    }
  };

  return (
    <div className={styles.checkboxGroup}>
      {options.map((option) => (
        <label key={option.value} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
