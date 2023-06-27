
import { Users} from "@/entities";
import styles from "@/styles/Page.module.css";
import { CreateButton, PageContentContainer } from "../shared";
import { Column, Table } from "../Table";
import { useEffect, useState } from "react";
import backendApi from "@/backendApi";
import { FailedToFetchError } from "@/errors";
import { ModalAddUser } from "../modal";

const columns = [
  new Column("Nome", "nome"),
  new Column("E-mail", "email"),
  new Column("Escola", "escola"),
  new Column("Perfil", "perfil"),
  new Column("Ativo", "ativo"),
];

export default function PageUsers() {
  const [data, setData] = useState([] as Users[]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [ showModalUser, setShowModalUser ] = useState(false)

  function handleClickOpenModalAdd( ):void {
    setShowModalUser(true)
  }
  function handleClickCloseModalAdd( ):void {
    setShowModalUser(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await backendApi.getUsers();
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
       <div className={styles.pageContainer}>
       <h4>Usuarios</h4>
       <PageContentContainer>
         <CreateButton  color={'var(--white'} colorBackGround={'var(--blue-300)'} text="Nova usuário" onClick={() => handleClickOpenModalAdd()} />
         {showModalUser  && <ModalAddUser onCancel={() => handleClickCloseModalAdd()}/>}
         <Table<Users>
           data={data}
           columns={columns}
           loaded={loaded}
           error={error}
         />
       </PageContentContainer>
     </div>
    );
  }



