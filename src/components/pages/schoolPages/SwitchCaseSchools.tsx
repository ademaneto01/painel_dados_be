import pages from '@/components/pages/schoolPages/index';
import { PageEnumSchool } from '@/enums';
import styles from '@/styles/CardLessons.module.css';
import { useState } from 'react';

export default function SchoolPlans() {
  const [page, setPage] = useState(PageEnumSchool.schools);
  const [label, setLabel] = useState('');
  function PageSchoolsTeste(): JSX.Element {
    switch (page) {
      case PageEnumSchool.schools:
        return <pages.Schools setPage={setPage} setLabel={setLabel} />;
      case PageEnumSchool.turmas:
        return (
          <pages.Turmas setPage={setPage} label={label} setLabel={setLabel} />
        );
      case PageEnumSchool.alunos:
        return <pages.Alunos setPage={setPage} label={label} />;
      case PageEnumSchool.professores:
        return <pages.Professores setPage={setPage} label={label} />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PageSchoolsTeste />}</div>;
}
