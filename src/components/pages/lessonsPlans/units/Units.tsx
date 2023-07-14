import { CreateButton, PageContentContainer } from '@/components/shared';
import styles from '@/styles/ClassPlans.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';
import { PageEnumLessons } from '@/enums';
import { Column, Table } from '@/components/Table';
import { EntitiesUnits } from '@/entities';
import error from 'next/error';
import backendApi from '@/backendApi';
import { FailedToFetchError } from '@/errors';
import { ModalAddEditUnits } from '@/components/modal';

const columns = [
  new Column('Nome', 'nome'),
  new Column('Planos', 'planos'),
  new Column('Ações', 'acoes'),
];

interface pageClassPlanProps {
  setPage: Dispatch<SetStateAction<PageEnumLessons>>;
}

export default function Units(props: pageClassPlanProps): JSX.Element {
  const [data, setData] = useState([] as EntitiesUnits[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showModalUnits, setShowModalUnits] = useState(false);

  function handleClickOpenModalUnits(): void {
    setShowModalUnits(true);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await backendApi.getUnits();
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
      <PageContentContainer>
        <div className={styles.boxBtnClassPlan}>
          <CreateButton
            color={'var(--white'}
            colorBackGround={'var(--blue-300)'}
            size={'11rem'}
            text="Novo Plano de Aula"
            onClick={() => handleClickOpenModalUnits()}
          />
          <CreateButton
            color={'var(--gray-300'}
            colorBackGround={'var(--white)'}
            text="Voltar"
            size="8rem"
            onClick={() => props.setPage(PageEnumLessons.classPlan)}
          />
        </div>
        {showModalUnits && (
          <ModalAddEditUnits
            onCancel={() => setShowModalUnits(false)}
            unitsKey={''}
          />
        )}
        <Table<EntitiesUnits>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          searchInputNone={'none'}
          labelInput={'Buscar pelo nome'}
        />
      </PageContentContainer>
    </>
  );
}
