import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit } from 'react-icons/fi';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalEditUser } from '../../modal';
import { useState } from 'react';

import Tooltip from '@/components/Tooltip/Tooltip';

interface PropsForExclusion {
  id: string;
  nome?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActionsUsers(
  props: PropsForExclusion,
): JSX.Element {
  const [showModalEditUser, setShowModalEditUser] = useState('');

  function handleClickOpenModalAddEditUser(id: string): void {
    setShowModalEditUser(props.id);
  }

  return (
    <div className={styles.container}>
      <Tooltip text="Editar Usuário">
        <Action
          icon={reactIcon(FiEdit)}
          onClick={() => handleClickOpenModalAddEditUser(props.id)}
        />
      </Tooltip>

      {showModalEditUser === props.id && (
        <ModalEditUser
          titleModal={'Editar usuário'}
          userId={props.id}
          onCancel={() => setShowModalEditUser('')}
        />
      )}
    </div>
  );
}
