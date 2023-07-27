// import MultilineInput from '../multipeInput/MultipleInput';
import styles from '@/styles/ComponenteQuill.module.css';
import { useGlobalContext } from '@/context/store';
import { CreateButton } from '@/components/shared';
import dynamic from 'next/dynamic';

const MultilineInputSSR = dynamic(
  () => import('../multipeInput/MultipleInput'),
  {
    ssr: false,
  },
);

const ComponenteQuill = () => {
  const { lesson, setLesson, setTitleQuill, titleQuill } = useGlobalContext();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleQuill(event.target.value);
  };

  return (
    <div>
      {/* <h3>Documentação</h3> */}
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

        <MultilineInputSSR
          label="Conteúdo"
          onChange={(newValue) => setLesson(newValue)}
          value={lesson}
        />
        <div className={styles.boxToAlignBtnSave}>
          <CreateButton
            color={'var(--white)'}
            colorBackGround={'var(--blue-300)'}
            text="Salvar e voltar"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default ComponenteQuill;
