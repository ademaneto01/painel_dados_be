import styles from '@/styles/ComponenteQuill.module.css';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
type MultilineInputProps = {
  label?: string;
  register?: any;
  onChange?: (value: string) => void;
  value?: string;
};

const models = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'code-block'],
    ['clean'],
  ],
};

const theme = 'snow';

const MultilineInput: React.FC<MultilineInputProps> = ({
  label,
  register,
  onChange,
  value,
}) => {
  return (
    <>
      <label>{label}</label>
      <ReactQuill
        className={styles.meuEditorQuill}
        toolbarStyle={{ border: '2px solid red', backgroundColor: 'lightgray' }}
        placeholder={label}
        {...register}
        theme={theme}
        modules={models}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default MultilineInput;
