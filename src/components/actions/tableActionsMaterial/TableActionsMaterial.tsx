import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit, FiEye } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDelete, ModalMaterials } from '../../modal';
import { useState } from 'react';

interface PropsForFxclusion {
  id: string;
  titleDelete?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsMaterial(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalMaterials, setShowModalMaterials] = useState('');
  const [showModalDelete, setShowModalDelete] = useState('');

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }

  function handleClickOpenModalMaterial(id: string): void {
    setShowModalMaterials(props.id);
  }

  return (
    <div className={styles.container}>
      <Action
        data-testid="edit-action"
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenModalMaterial(props.id)}
      />

      <Action
        data-testid="trash-action"
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />

      {showModalMaterials === props.id && (
        <ModalMaterials
          onCancel={() => setShowModalMaterials('')}
          modalMaterials={props.id}
        />
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
