import { EntitiesLessons } from '@/entities';
import styles from '@/styles/CardLessons.module.css';
import { CreateButton, PageContentContainerLessons } from '@/components/shared';
import { useEffect, useState } from 'react';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import { Column } from '@/components/Table';
import React from 'react';
import { CardActions } from '@/components/actions';

export default function Lessons(): JSX.Element {
  const [data, setData] = useState([] as EntitiesLessons[]);
  const [loaded, setLoaded] = useState(false);
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

  return (
    <>
      <h4>Lessons Plans</h4>
      <PageContentContainerLessons>
        {data.map((lesson) => {
          return (
            <div className={styles.boxCardLesson} key={lesson.id}>
              <div className={styles.cardLessons}>
                <div className={styles.boxActions}>
                  <CardActions id={lesson.id} titleDelete={lesson.nome} />
                </div>
                <div className={styles.boxNome}>
                  <h3>{lesson.nome}</h3>
                  <p>{lesson.descricao}</p>
                </div>
              </div>
            </div>
          );
        })}
      </PageContentContainerLessons>
    </>
  );
}
