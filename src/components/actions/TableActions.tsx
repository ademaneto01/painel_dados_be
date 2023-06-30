'use client';

import styles from '@/styles/Action.module.css';
import Action from './Action';
import { FiEdit, FiEye } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';
import { useGlobalContext } from '@/context/store';
import { ModalDelete, ModalAddEditSchool, ModalMaterials } from '../modal';
import backendApi from '@/backendApi';
import { EntitiesDocumentation } from '@/entities';
import { useState } from 'react';

interface PropsForFxclusion {
  id: string;
  titleDelete?: string;
  modalKey?: string;
  documentationKey?: string;
  modalMaterials?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.3em';
  options.color = color;

  return icon(options);
}

export default function TableActions(props: PropsForFxclusion): JSX.Element {
  const [showModalMaterials, setShowModalMaterials] = useState('');
  const {
    showModalDelete,
    setShowModalDelete,
    showModalAddEditSchool,
    setShowModalAddEditSchool,
    setLesson,
    setShowQuillEdit,
    setShowBtnReturn,
    setResourceView,
    setTitleQuill,
    titleQuill,
  } = useGlobalContext();

  function handleClickShowView(id: string): void {
    async function fetchData() {
      try {
        const lessons = await backendApi.getDocumentation();
        const lessonFind: EntitiesDocumentation | undefined = lessons.find(
          (lesson) => lesson.id === props.documentationKey,
        );

        if (lessonFind) {
          const asString = lessonFind.register.join('');
          setLesson(asString);
          setTitleQuill(lessonFind.nome);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    setShowBtnReturn(true);
    setResourceView(true);
  }

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }

  function handleClickOpenModalEdit(id: string): void {
    setShowModalAddEditSchool(props.id);
  }
  function handleClickOpenModalMaterial(id: string): void {
    setShowModalMaterials(props.id);
  }

  function handleClickOpenLesson(id: string): void {
    async function fetchData() {
      try {
        const dataDoc = await backendApi.getDocumentation();
        const docFind: EntitiesDocumentation | undefined = dataDoc.find(
          (doc) => doc.id === props.documentationKey,
        );

        if (docFind) {
          const asString = docFind.register.join('');
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
      {props.modalKey && (
        <Action
          icon={reactIcon(FiEdit)}
          onClick={() => handleClickOpenModalEdit(props.id)}
        />
      )}
      {props.modalMaterials && (
        <Action
          icon={reactIcon(FiEdit)}
          onClick={() => handleClickOpenModalMaterial(props.id)}
        />
      )}
      {props.documentationKey && (
        <Action
          icon={reactIcon(FiEdit)}
          onClick={() => handleClickOpenLesson(props.id)}
        />
      )}
      {props.documentationKey && (
        <Action
          icon={reactIcon(FiEye)}
          onClick={() => handleClickShowView(props.id)}
        />
      )}
      <Action
        icon={reactIcon(FaTrashAlt, '#f1646c')}
        onClick={() => handleClickOpenModalExcluir(props.id)}
      />
      {showModalAddEditSchool === props.id && (
        <ModalAddEditSchool
          onCancel={() => setShowModalAddEditSchool('')}
          modalKey={props.id}
        />
      )}
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
