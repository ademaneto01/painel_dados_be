import { MultilineInput } from '../multipeInput/MultipleInput';
import styles from '@/styles/ComponenteQuill.module.css'
import { useGlobalContext } from '@/context/store';

const ComponenteQuill = () => {
  const { lesson, setLesson, setTitleQuill, titleQuill } = useGlobalContext();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleQuill(event.target.value);
  };

  return (
    <div>
      <h3>Documentação</h3>
      <form className={styles.boxForm}>
      <label className={styles.labelInput}>
        Nome:
        <input
          className={styles.inputName}
          type="text"
          onChange={handleTitleChange}
          value={titleQuill}
        />
      </label>

        <MultilineInput
          label="Conteúdo"
          onChange={(newValue) => setLesson(newValue)}
          value={lesson}

        />

      </form>
    </div>
  );
}

export default ComponenteQuill;
