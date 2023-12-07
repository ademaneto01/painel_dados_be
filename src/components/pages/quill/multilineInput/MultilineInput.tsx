import styles from '@/styles/ComponenteQuill.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type MultilineInputProps = {
  label?: string;
  register?: any;
  onChange?: (value: string) => void;
  value?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const theme = 'snow';

const MultilineInput: React.FC<MultilineInputProps> = ({
  register,
  onChange,
  value,
}) => {
  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };
  return (
    <>
      <ReactQuill
        className={styles.meuEditorQuill}
        {...register}
        theme={theme}
        modules={modules}
        onChange={handleChange}
        value={value}
      />
    </>
  );
};

export default MultilineInput;
