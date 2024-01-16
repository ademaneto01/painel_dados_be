import * as React from 'react';
import Switch from '@mui/material/Switch';
import { BackendApiPut } from '@/backendApi';
import { useState } from 'react';
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors/index';

interface OnOffTogglerProps {
  active: boolean;
  userId: string;
}

export default function OnOffToggler(props: OnOffTogglerProps): JSX.Element {
  const [active, setActive] = useState(props.active);
  const { usersUpdated, setUsersUpdated } = useGlobalContext();
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');

  const handleApiErrors = (error: any) => {
    setError(true);
    if (error.response.data.mensagem) {
      setMsgError(error.response.data.mensagem);
    } else {
      setMsgError('Ocorreu um erro desconhecido.');
    }
  };
  async function EditedUser(newActiveState: boolean) {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPut(`${token}`);
      const response = await backendApi.editarUsuarioAtivo({
        id: props.userId,
        ativo: newActiveState,
      });

      setUsersUpdated(true);
      return response;
    } catch (error) {
      handleApiErrors(error);
    }
  }

  function handleClick() {
    const newActiveState = !active;
    setActive(newActiveState);
    EditedUser(newActiveState);
  }

  return (
    <>
      <div onClick={handleClick}>
        <Switch checked={active} defaultChecked />
      </div>
      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
}
