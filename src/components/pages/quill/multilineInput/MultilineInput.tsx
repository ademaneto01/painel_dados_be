import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '@/styles/ComponenteQuill.module.css';

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
    ['link'],
  ],
};

const theme = 'snow';

const MultilineInput: React.FC<MultilineInputProps> = ({
  register,
  onChange,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  useEffect(() => {
    if (isMounted) {
      const element = document.querySelector(
        '.ql-container.ql-snow',
      ) as HTMLElement;
      if (element) {
        element.style.border = 'none';
      }
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ReactQuill
        className={styles.meuEditorQuill}
        {...register}
        theme={theme}
        modules={modules}
        onChange={handleChange}
        value={value || ''}
      />
    </>
  );
};

export default MultilineInput;
