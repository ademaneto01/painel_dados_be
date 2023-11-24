import React from 'react';
import styles from '@/styles/ModalSucesso.module.css';
import { IconBaseProps, IconType } from 'react-icons';
import { FaRegCircleCheck } from 'react-icons/fa6';

interface ModalValidationProps {
  message: string;
}

const ModalSucesso: React.FC<ModalValidationProps> = ({ message }) => {
  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '4em',
      color: color,
    };

    return icon(options);
  }
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div>{renderIcon(FaRegCircleCheck, 'var(--blue-300)')}</div>
        <p id={styles.text}>{message}</p>
      </div>
    </div>
  );
};

export default ModalSucesso;
