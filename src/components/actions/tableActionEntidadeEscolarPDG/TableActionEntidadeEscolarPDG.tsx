import styles from '@/styles/Action.module.css';
import { IconBaseProps, IconType } from 'react-icons';
import { ModalDadosEntidadeEscolar } from '../../modal';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { ImEyePlus } from 'react-icons/im';
import { useState } from 'react';
import Action from '../Action';
import Tooltip from '@/components/Tooltip/Tooltip';
import { useGlobalContext } from '@/context/store';
import { PageEnumEscolasPDG } from '@/enums';

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
  const { setIdEntidadeEscolar, setPageEscolasPDG } = useGlobalContext();

  function verMais(id: string): void {
    setShowModalVerMais(id);
  }
  function verDocumentos(id: string): void {
    setIdEntidadeEscolar(id);
    setPageEscolasPDG(PageEnumEscolasPDG.docsEscola);
  }
  return (
    <div className={styles.container}>
      <Tooltip text="Documentos">
        <Action
          icon={reactIcon(HiOutlineDocumentSearch)}
          onClick={() => {
            verDocumentos(props.id);
          }}
        />
      </Tooltip>
      <Tooltip text="Visualizar Informações">
        <Action
          icon={reactIcon(ImEyePlus)}
          onClick={() => {
            verMais(props.id);
          }}
        />
      </Tooltip>
      {showModalVerMais === props.id && (
        <ModalDadosEntidadeEscolar
          idEntidade={props.id}
          onCancel={() => setShowModalVerMais('')}
        />
      )}
    </div>
  );
}
