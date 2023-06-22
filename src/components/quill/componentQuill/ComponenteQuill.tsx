import {  useState } from 'react';
import { MultilineInput } from '../multipeInput/MultipleInput';
import styles from '@/styles/ComponenteQuill.module.css'

const ComponenteQuill = () => {
  const [quillValue, setQuillValue] = useState<string>('');

  return (
    <div className={styles.container}>
      <h3>Documentação</h3>
      <form className={styles.boxForm}>
      <label className={styles.labelInput}>
        Nome:
        <input
          className={styles.inputName}
          type="text"
        />
      </label>

        <MultilineInput
          label="Conteúdo"
          onChange={(newValue) => setQuillValue(newValue)}
          value={quillValue}
        />

      </form>
    </div>
  );
}

export default ComponenteQuill;
