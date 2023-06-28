
import { Escolas } from "@/entities";
import styles from "@/styles/Page.module.css";
import { CreateButton, PageContentContainer } from "../shared";
import { Column, Table } from "../Table";
import { useEffect, useState } from "react";
import backendApi from "@/backendApi";
import { FailedToFetchError } from "@/errors";
import { ModalAddEditSchool } from "../modal";

const columns = [
  new Column("Nome", "nome"),
  new Column("Cidade", "cidade"),
  new Column("Ações", "acoes"),
  new Column("Ativo", "ativo"),
];

export default function Schools(): JSX.Element {
  const [data, setData] = useState([] as Escolas[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [ showModalAddEditSchool, setShowModalAddEditSchool ] = useState(false)

  function handleClickOpenModalAdd( ):void {
    setShowModalAddEditSchool(true)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const carteiras = await backendApi.getEscolas();
        setData(carteiras);
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
    <div className={styles.pageContainer}>
      <h4>Escolas</h4>
      <PageContentContainer>
        <CreateButton  color={'var(--white'} colorBackGround={'var(--blue-300)'} text="Nova escola" onClick={() => handleClickOpenModalAdd()} />
        {showModalAddEditSchool  && <ModalAddEditSchool onCancel={() => setShowModalAddEditSchool(false)} modalKey={''}/>}
        <Table<Escolas>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
          searchInputHidden={'none'}
        />
      </PageContentContainer>
    </div>
  );
}
