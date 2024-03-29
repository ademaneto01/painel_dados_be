import * as React from 'react';
import Switch from '@mui/material/Switch';
import { BackendApiPut } from '@/backendApi';
import { useState } from 'react';
import { useGlobalContext } from '@/context/store';
import { ErrorComponent } from '@/errors/index';

interface SwitchProps {
  active: boolean;
  contractId: string;
}

export default function SwitchContrato(props: SwitchProps): JSX.Element {
  const [active, setActive] = useState(props.active);
  const { setSwitchContrato } = useGlobalContext();
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
  async function EditedContract(newActiveState: boolean) {
    try {
      const token = localStorage.getItem('auth_token');
      const backendApi = new BackendApiPut(`${token}`);

      const response = await backendApi.editarAtivoContrato({
        ativo: newActiveState,
        id: props.contractId,
      });

      setSwitchContrato(true);
      setTimeout(() => {
        setSwitchContrato(false);
      }, 1500);
      return response;
    } catch (error) {
      handleApiErrors(error);
    }
  }

  function handleClick() {
    const newActiveState = !active;
    setActive(newActiveState);
    EditedContract(newActiveState);
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
