
import { Lessons } from "@/entities";
import styles from "@/styles/Page.module.css";
import { CreateButton, PageContentContainer } from "../shared";
import { Column, Table } from "../Table";
import { useEffect, useState } from "react";
import backendApi from "@/backendApi";
import { FailedToFetchError } from "@/errors";
import ResourceCreate from "../quill/componentQuill/ComponenteQuill";

const columns = [
  new Column("Recursos", "nome"),
  new Column("Ações", "acoes"),
];

export default function LessonsPlans(): JSX.Element {
  const [data, setData] = useState([] as Lessons[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [ showQuill, setShowQuill ] = useState(false)

  function handleClickQuill( ):void {
    setShowQuill(true)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const carteiras = await backendApi.getLessons();
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
        <CreateButton text="Novo recurso" onClick={() => handleClickQuill()} />
        {showQuill? 
        <ResourceCreate /> :  
        <Table<Lessons>
          data={data}
          columns={columns}
          loaded={loaded}
          error={error}
        />}
      </PageContentContainer>
    </div>
  );
}
  