import { EntitiesLessons } from '@/entities';
import styles from '@/styles/CardLessons.module.css';
import {
  CreateButton,
  Loader,
  PageContentContainerLessons,
} from '@/components/shared';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import React from 'react';
import { TableLessonsPlansCard } from '@/components/actions';
import { ModalLessons } from '@/components/modal';
import { PageEnumLessons } from '@/enums';
import ErrorComponent from '@/components/ErrorComponent';

interface pageLessonsProps {
  setPage: Dispatch<SetStateAction<PageEnumLessons>>;
}

export default function Lessons(props: pageLessonsProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesLessons[]);
  const [loaded, setLoaded] = useState(false);
  const [showModalLesson, setShowModalLesson] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const lessons = await backendApi.getLessons();
        setData(lessons);
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          setError(true);
        } else {
          throw error;
        }
      } finally {
        setLoaded(true);
      }
    }
    if (!loaded) {
      fetchData();
    }
  }, [loaded]);
  function HandlePageLesson() {
    props.setPage(PageEnumLessons.teacherGuides);
  }
  if (loaded) {
    if (!error) {
      return (
        <>
          <h4>Lessons Plans</h4>
          <PageContentContainerLessons>
            <div className={styles.boxBtn}>
              <CreateButton
                color={'var(--white'}
                colorBackGround={'var(--blue-300)'}
                text="Nova Disciplina"
                onClick={() => setShowModalLesson(true)}
              />
            </div>
            {showModalLesson && (
              <ModalLessons onClose={() => setShowModalLesson(false)} />
            )}
            {data.map((lesson) => {
              return (
                <div key={lesson.id}>
                  <div className={styles.boxActions}>
                    <TableLessonsPlansCard
                      id={lesson.id}
                      titleDelete={lesson.nome}
                    />
                  </div>
                  <div className={styles.boxCardLesson} key={lesson.id}>
                    <div
                      className={styles.cardLessons}
                      onClick={HandlePageLesson}
                    >
                      <div className={styles.boxNome}>
                        <h3>{lesson.nome}</h3>
                        <p>{lesson.descricao}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </PageContentContainerLessons>
        </>
      );
    } else {
      return <ErrorComponent />;
    }
  } else {
    return <Loader />;
  }
}
