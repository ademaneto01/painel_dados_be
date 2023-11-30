import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '@/styles/AcompanhamentoPDG.module.css';
import { BackendApiGet, BackendApiPost } from '@/backendApi';
import { ErrorComponent } from '@/errors/index';
import { PageEnumContratos } from '@/enums';
import { PageContentContainer, BackButton } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

export default function RegistrarAcompanhamento(): JSX.Element {
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { setPage, idContrato } = useGlobalContext();

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <PageContentContainer>
        <NavigationButtons setPage={setPage} />
        <FormComponent setPage={setPage} />
        {error && <ErrorComponent message={msgError} />}
      </PageContentContainer>
    </div>
  );
}

const HeaderComponent: React.FC = () => <h4>Novo Acompanhamento</h4>;

const NavigationButtons: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<PageEnumContratos>>;
}> = ({ setPage }) => (
  <div className={styles.boxBtns}>
    <BackButton
      color={'var(--gray-300'}
      colorBackGround={'var(--white)'}
      text="Voltar"
      size="8rem"
      onClick={() => setPage(PageEnumContratos.entidadesEscolares)}
    />
  </div>
);

const FormComponent: React.FC<any> = ({ handleSubmit, setPage }) => {
  return (
    <form className={styles.conteinerForm} onSubmit={handleSubmit}>
      <div className={styles.boxStatus}>
        <label className={styles.labelStandard}>
          Form Status*
          <input
            type="text"
            placeholder="Form Status"
            name="status"
            className={styles.inputStandard}
          />
        </label>
      </div>
      <div className={styles.conteinerObsCycle}>
        <div className={styles.conteinerObservation}>
          <h3>Observation Info.</h3>
          <label className={styles.labelStandard}>
            Educator's name
            <input
              type="text"
              placeholder="Educator's name"
              name="status"
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Partner school
            <input
              type="text"
              placeholder="Partner school"
              name="status"
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Assessor
            <input
              type="text"
              placeholder="Assessor"
              name="status"
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Date of observation*
            <input
              type="text"
              placeholder="Date of observations"
              name="status"
              className={styles.inputStandard}
            />
          </label>
        </div>
        <div className={styles.conteinerObservation}>
          <h3>Cycle</h3>
          <label className={styles.labelStandard}>
            Grade
            <input
              type="text"
              placeholder="Grade"
              name="status"
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            # of students
            <input
              type="text"
              placeholder="# of students"
              name="status"
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Subject
            <input
              type="text"
              placeholder="Subject"
              name="status"
              className={styles.inputStandard}
            />
          </label>
          <label className={styles.labelStandard}>
            Lesson plan Be #:
            <input
              type="text"
              placeholder="Lesson plan Be #:"
              name="status"
              className={styles.inputStandard}
            />
          </label>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.confirmButton}
          type="button"
          onClick={handleSubmit}
        >
          Salvar
        </button>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setPage(PageEnumContratos.entidadesContratuais)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
