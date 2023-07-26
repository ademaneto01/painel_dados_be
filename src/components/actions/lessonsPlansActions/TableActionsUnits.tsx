import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit, FiEye } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { BiCalendar } from 'react-icons/bi';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalAddEditUnits, ModalOpenDocLP } from '../../modal';
import { useState } from 'react';
import ComponenteCalendar from '../../calendar/componenteCalendar/Calendar';

interface PropsForFxclusion {
  id: string;
  titleDelete?: string;
  urlDoc?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsUnits(
  props: PropsForFxclusion,
): JSX.Element {
  const [showCalendar, setShowCalendar] = useState('');
  const [showModalUnits, setShowModalUnits] = useState('');
  const [showIframeDoc, setShowIframeDoc] = useState('');
  const [showModalDelete, setShowModalDelete] = useState('');

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(id);
  }

  function handleClickOpenCalendar(id: string): void {
    setShowCalendar(id);
  }
  function handleClickOpenModalUnits(id: string): void {
    setShowModalUnits(id);
  }
  function handleOpenDoc(urlDoc?: string): void {
    if (urlDoc) {
      setShowIframeDoc(props.id);
    }
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenModalUnits(props.id)}
      />

      <Action
        icon={reactIcon(BiCalendar)}
        onClick={() => handleClickOpenCalendar(props.id)}
      />

      <Action
        icon={reactIcon(FiEye)}
        onClick={() => handleOpenDoc(props.urlDoc)}
      />

      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />

      {showIframeDoc === props.id && (
        <ModalOpenDocLP
          unitsKey={props.id}
          urlDoc={props.urlDoc || ''}
          onCancel={() => setShowIframeDoc('')}
        />
      )}

      {showModalUnits === props.id && (
        <ModalAddEditUnits
          onCancel={() => setShowModalUnits('')}
          unitsKey={props.id}
        />
      )}

      {showCalendar === props.id && (
        <ComponenteCalendar onClick={() => setShowCalendar('')} />
      )}
      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.titleDelete} ?`}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
