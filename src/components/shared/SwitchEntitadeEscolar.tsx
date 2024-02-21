import * as React from 'react';
import Switch from '@mui/material/Switch';
import { BackendApiPut } from '@/backendApi';
import { useState } from 'react';
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors/index';

interface SwitchProps {
  active: boolean;
  entidadeEscolaId: string;
}

export default function SwitchEntidadeEscolar(props: SwitchProps): JSX.Element {
  const [active, setActive] = useState(props.active);
  const { setSwitchEntidadeEscolar } = useGlobalContext();
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
  async function EditedEntidadeEscolar(newActiveState: boolean) {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPut(`${token}`);

      const response = await backendApi.editarAtivoEntidadeEscolar({
        ativo: newActiveState,
        id: props.entidadeEscolaId,
      });

      setSwitchEntidadeEscolar(true);
      setTimeout(() => {
        setSwitchEntidadeEscolar(false);
      }, 1500);
      return response;
    } catch (error) {
      handleApiErrors(error);
    }
  }

  function handleClick() {
    const newActiveState = !active;
    setActive(newActiveState);
    EditedEntidadeEscolar(newActiveState);
  }

  return (
    <>
      <div onClick={handleClick}>
        <Switch checked={active} />
      </div>
      {error ? <ErrorComponent message={msgError} /> : ''}
    </>
  );
}
