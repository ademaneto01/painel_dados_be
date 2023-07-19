import { CreateButton, PageContentContainer } from '@/components/shared';
import styles from '@/styles/ClassPlans.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';
import { PageEnumLessons } from '@/enums';
import { Column, Table } from '@/components/Table';
import { EntitiesClassPlan, EntitiesUsers } from '@/entities';
import error from 'next/error';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import { ModalAddEditClassPlan } from '@/components/modal';

const columns = [
  new Column('Nome', 'nome'),
  new Column('Planos', 'planos'),
  new Column('Ações', 'acoes'),
];

interface pageClassPlanProps {
  setPage: Dispatch<SetStateAction<PageEnumLessons>>;
}

export default function ClassPlans(props: pageClassPlanProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesClassPlan[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showModalAddEditClassPlan, setShowModalAddEditClassPlan] =
    useState(false);

  function handleClickOpenModalClassPlan(): void {
    setShowModalAddEditClassPlan(true);
  }

  const handleRowClick = (item: EntitiesClassPlan) => {
    // console.log('Row clicked:', item);
    props.setPage(PageEnumLessons.units);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await backendApi.getClassPlans();
        setData(users);
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
      <h4>Class Plans</h4>
      <PageContentContainer>
        <div className={styles.boxBtnClassPlan}>
          <nav className={styles.boxNavBtn}>
            <p
              className={styles.btnBreadCrumb}
              onClick={() => props.setPage(PageEnumLessons.lessons)}
            >
              Lessons Plans /<span>&nbsp;</span>
            </p>
            <p
              className={styles.btnBreadCrumb}
              onClick={() => props.setPage(PageEnumLessons.teacherGuides)}
            >
              Teacher Guides /<span>&nbsp;</span>
            </p>
            <strong>Class Plans</strong>
          </nav>
          <nav className={styles.boxNavBtn}>
            <CreateButton
              color={'var(--white'}
              colorBackGround={'var(--blue-300)'}
              text="Nova unidade"
              onClick={() => handleClickOpenModalClassPlan()}
            />
            <CreateButton
              color={'var(--gray-300'}
              colorBackGround={'var(--white)'}
              text="Voltar"
              size="8rem"
              onClick={() => props.setPage(PageEnumLessons.teacherGuides)}
            />
          </nav>
        </div>
        {showModalAddEditClassPlan && (
          <ModalAddEditClassPlan
            onCancel={() => setShowModalAddEditClassPlan(false)}
            modalKey={''}
          />
        )}
        <Table<EntitiesClassPlan>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          searchInputNone={'none'}
          labelInput={'Buscar pelo nome'}
          onClickRow={handleRowClick}
        />
      </PageContentContainer>
    </>
  );
}
