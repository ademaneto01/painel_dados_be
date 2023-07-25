'use client';

import styles from '@/styles/Action.module.css';
import Action from '../Action';
import { FiEdit, FiEye } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { useGlobalContext } from '@/context/store';
import { ModalDelete } from '../../modal';
import backendApi from '@/backendApi';
import { EntitiesDocumentation } from '@/entities';
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

export default function TableActionsDoc(props: PropsForFxclusion): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const {
    setLesson,
    setShowQuillEdit,
    setShowBtnReturn,
    setResourceView,
    setTitleQuill,
  } = useGlobalContext();

  function handleClickShowView(id: string): void {
    async function fetchData() {
      try {
        const documentations = await backendApi.getDocumentation();
        const documentationFind: EntitiesDocumentation | undefined =
          documentations.find((documentation) => documentation.id === props.id);

        if (documentationFind) {
          const asString = documentationFind.register.join('');
          setLesson(asString);
          setTitleQuill(documentationFind.nome);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchData();
    setShowBtnReturn(true);
    setResourceView(true);
  }

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }

  function handleClickOpenLesson(id: string): void {
    async function fetchData() {
      try {
        const dataDoc = await backendApi.getDocumentation();
        const docFind: EntitiesDocumentation | undefined = dataDoc.find(
          (doc) => doc.id === props.id,
        );

        if (docFind) {
          const asString = docFind.register.join(' ');
          setLesson(asString);
          setTitleQuill(docFind.nome);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setShowBtnReturn(true);
    setShowQuillEdit(true);
    fetchData();
  }

  return (
    <div className={styles.container}>
      <Action
        icon={reactIcon(FiEdit)}
        onClick={() => handleClickOpenLesson(props.id)}
      />
      <Action
        icon={reactIcon(FiEye)}
        onClick={() => handleClickShowView(props.id)}
      />
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />

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
