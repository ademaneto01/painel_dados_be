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

export default function Units(props: pageClassPlanProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesClassPlan[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showModalAddEditClassPlan, setShowModalAddEditClassPlan] =
    useState(false);

  function handleClickOpenModalClassPlan(): void {
    setShowModalAddEditClassPlan(true);
  }
  const handleRowClick = (item: EntitiesClassPlan) => {
    // Lógica de clique na linha
    console.log('Clicou na linha:', item);
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
      <h4>Units</h4>
      <PageContentContainer></PageContentContainer>
    </>
  );
}
