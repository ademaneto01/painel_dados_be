import styles from '@/styles/Action.module.css';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalDadosEntidadeEscolar } from '../../modal';
import { ImEyePlus } from 'react-icons/im';
import { useState } from 'react';
import Cookies from 'js-cookie';
import BackendApiMock from '@/backendApi';
import { useGlobalContext } from '@/context/store';
import { PageEnumContratos } from '@/enums';
import Action from '../Action';

interface PropsForFxclusion {
  id: string;
  nome?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionEntidadeEscolar(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalAddEditSchool, setShowModalAddEditSchool] = useState('');
  const { setUsersUpdated, setIdContrato, setPage } = useGlobalContext();
  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }

  async function deleteEntidadeEscolar(id: string) {
    const token = Cookies.get('auth_token');

    try {
      const backendApi = new BackendApiMock(`${token}`);

      await backendApi.deleteEntidadeEscolar({ id_escola: props.id });
      setShowModalDelete('');
      setUsersUpdated(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickOpenModalAddEditSchool(id: string): void {
    setIdContrato(props.id);
    setPage(PageEnumContratos.editEntidade);
  }
  function verMais(id: string): void {
    setShowModalAddEditSchool(id);
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => {
          handleClickOpenModalAddEditSchool(props.id);
        }}
      />
      <Action
        icon={reactIcon(ImEyePlus)}
        onClick={() => {
          verMais(props.id);
        }}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />
      {showModalAddEditSchool === props.id && (
        <ModalDadosEntidadeEscolar
          idEntidade={props.id}
          onCancel={() => setShowModalAddEditSchool('')}
        />
      )}

      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.nome} ?`}
          onConfirm={() => deleteEntidadeEscolar(props.id)}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
