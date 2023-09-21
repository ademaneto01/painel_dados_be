import styles from '@/styles/Action.module.css';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDadosEntidadeEscolar } from '../../modal';
import { ImEyePlus } from 'react-icons/im';
import { useState } from 'react';
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

export default function TableActionEntidadeEscolarPDG(
  props: PropsForFxclusion,
): JSX.Element {
  const [showModalVerMais, setShowModalVerMais] = useState('');

  function verMais(id: string): void {
    setShowModalVerMais(id);
  }
  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(ImEyePlus)}
        onClick={() => {
          verMais(props.id);
        }}
      />

      {showModalVerMais === props.id && (
        <ModalDadosEntidadeEscolar
          idEntidade={props.id}
          onCancel={() => setShowModalVerMais('')}
        />
      )}
    </div>
  );
}
