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
import { PageEnumContratos } from '@/enums';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';

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
  const [actionPosition, setActionPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showModalVerMais, setShowModalVerMais] = useState('');
  const { setIdEntidadeEscolar, setPageEscolasPDG, setPage } = useGlobalContext();
  const [modalInfos, setModalInfos] = useState('');

  const handleAlunadosClick = () => handleClickOpenPageAlunados(props.id);

  const handleModalInfos = (id: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setActionPosition({ x: rect.left, y: rect.bottom + scrollTop });
    setModalInfos(id);
  };

  function renderIcon(icon: IconType, color?: string): JSX.Element {
    const options: IconBaseProps = {
      fontSize: '1.3em',
      color: color,
    };

    return icon(options);
  }

  function verMais(id: string): void {
    setShowModalVerMais(id);
  }

  function verDocumentos(id: string): void {
    setIdEntidadeEscolar(id);
    setPageEscolasPDG(PageEnumEscolasPDG.docsEscola);
  }

  function handleClickOpenPageAlunados(id: string): void {
    setIdEntidadeEscolar(id);
    setPage(PageEnumContratos.alunados);
  }

  return (
    <div className={styles.container}>
      <Action
        icon={
          modalInfos ? renderIcon(FiMoreVertical) : renderIcon(FiMoreHorizontal)
        }
        onClick={(event) => {
          handleModalInfos(props.id, event);
        }}
      />

      {modalInfos === props.id && (
        <div className={styles.fullScreenDiv} onClick={() => setModalInfos('')}>
          <div
            className={styles.modalWrapper}
            style={{
              left: actionPosition?.x,
              top: actionPosition?.y,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal}>
              <button onClick={handleAlunadosClick}>Alunado</button>
              <button>Registrar Ocorrência</button>
            </div>
          </div>
        </div>
      )}
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
