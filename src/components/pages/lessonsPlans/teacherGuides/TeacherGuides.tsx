import { EntitiesTeacherGuides } from '@/entities';
import styles from '@/styles/TeacherGuides.module.css';
import {
  CreateButton,
  Loader,
  PageContentContainerTeacher,
} from '@/components/shared';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import React from 'react';
import { CardActions } from '@/components/actions';
import { ModalAddEditTeachers } from '@/components/modal';
import { PageEnumLessons } from '@/enums';
import ErrorComponent from '@/components/ErrorComponent';

interface pageLessonsTeachers {
  setPage: (page: PageEnumLessons) => void;
}

export default function TeacherGuides(props: pageLessonsTeachers): JSX.Element {
  const [data, setData] = useState([] as EntitiesTeacherGuides[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showModalEditTeachers, setShowModalEditTeachers] = useState(false);

  function handlePageTeacherGuides(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    props.setPage(PageEnumLessons.classPlan);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const teacherGuides = await backendApi.getTeacherGuides();
        setData(teacherGuides);
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

  if (loaded) {
    if (!error) {
      return (
        <>
          <h4>Teacher Guides</h4>
          <PageContentContainerTeacher>
            <div className={styles.boxBtn}>
              <CreateButton
                color={'var(--white'}
                colorBackGround={'var(--blue-300)'}
                text="Novo Teacher's guide"
                size="12rem"
                onClick={() => setShowModalEditTeachers(true)}
              />
              <CreateButton
                color={'var(--gray-300'}
                colorBackGround={'var(--white)'}
                text="Voltar"
                size="8rem"
                onClick={() => props.setPage(PageEnumLessons.lessons)}
              />
            </div>

            {showModalEditTeachers && (
              <ModalAddEditTeachers
                modalKey={''}
                onClose={() => setShowModalEditTeachers(false)}
              />
            )}

            {data.map((guides) => {
              return (
                <div
                  className={styles.boxTeacherGuides}
                  key={guides.id}
                  // onClick={(event) => handlePageTeacherGuides(event)}
                  // onClick={(event) => props.setPage(PageEnumLessons.classPlan)}
                >
                  <div className={styles.boxTitleAction}>
                    <p>{guides.nome}</p>
                    <CardActions
                      id={guides.id}
                      modalDeleteTeachers={true}
                      titleDeleteTeachers={guides.nome}
                    />
                  </div>
                  <strong>{`${guides.unidades} | ${guides.aulas}`}</strong>
                </div>
              );
            })}
          </PageContentContainerTeacher>
        </>
      );
    } else {
      return <ErrorComponent />;
    }
  } else {
    return <Loader />;
  }
}
