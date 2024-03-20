import styles from '@/styles/InputStandard.module.css';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function InputStandard(props: InputProps) {
  return (
    <label className={styles.labelStandard}>
      {props.label}
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value ?? ''}
        onChange={props.onChange}
        className={props.className || styles.inputStandard}
      />
    </label>
  );
}
