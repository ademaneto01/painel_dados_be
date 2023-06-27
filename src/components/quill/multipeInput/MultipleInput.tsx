import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '@/styles/ComponenteQuill.module.css'

type MultilineInputProps = {
  label?: string;
  register?: any;
  onChange?: (value: string) => void;
  value?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'code-block'],
    ['clean'],
  ],
};

const theme = 'snow';

const MultilineInput: React.FC<MultilineInputProps> = (
  {
  label,
  register,
  onChange,
  value,
}) => {
  return (
    <>
      <label>{label}</label>
      <ReactQuill className={styles.meuEditorQuill}
      toolbarStyle={{ border: '2px solid red', backgroundColor: 'lightgray' }}
        placeholder={label}
         {...register}
        theme={theme}
        modules={modules}
        onChange={onChange}
        value={value}
      />
    </>
  );
}

export default MultilineInput;
