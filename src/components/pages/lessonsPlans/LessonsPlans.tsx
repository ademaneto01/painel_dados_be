import pages from '@/components/pages/lessonsPlans/index';
import { PageEnumLessons } from '@/enums';
import styles from '@/styles/CardLessons.module.css';
import { useState } from 'react';

export default function LessonsPlans() {
  const [page, setPage] = useState(PageEnumLessons.lessons);

  function PageLessons(): JSX.Element {
    switch (page) {
      case PageEnumLessons.lessons:
        return <pages.Lessons setPage={setPage} />;
      case PageEnumLessons.teacherGuides:
        return <pages.TeacherGuides setPage={setPage} />;
      case PageEnumLessons.classPlan:
        return <pages.ClassPlans setPage={setPage} />;
      case PageEnumLessons.units:
        return <pages.Units setPage={setPage} />;
      default:
        return <></>;
    }
  }
  return <div className={styles.pageContainer}>{<PageLessons />}</div>;
}
