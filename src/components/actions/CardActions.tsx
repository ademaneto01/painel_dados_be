'use client';

import styles from '@/styles/Action.module.css';
import Action from './Action';
import { FiEdit } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons';

import { ModalAddEditTeachers, ModalDelete, ModalLessons } from '../modal';
import { useState } from 'react';
import { useGlobalContext } from '@/context/store';

interface PropsForFxclusion {
  id: string;
  titleDelete?: string;
  titleDeleteTeachers?: string;
  modalDeleteTeachers?: boolean;
  modalDeleteLessons?: boolean;
  color?: string;
}

function reactIcon(icon: IconType, color?: string): JSX.Element {
  const options: IconBaseProps = {};

  options.fontSize = '1.1em';
  options.color = color;

  return icon(options);
}

export default function CardActions(props: PropsForFxclusion): JSX.Element {
  const [showModalDelete, setShowModalDelete] = useState('');
  const [showModalEdit, setShowModalEdit] = useState('');
  const [showModalDeleteTeachers, setShowModalDeleteTeachers] = useState('');
  const [showModalEditTeachers, setShowModalEditTeachers] = useState('');

  function handleClickOpenModalExcluir(id: string): void {
    setShowModalDelete(props.id);
  }
  function handleClickOpenModalEdit(id: string): void {
    setShowModalEdit(props.id);
  }
  function handleClickOpenModalExcluirTeachers(id: string): void {
    setShowModalDeleteTeachers(props.id);
  }
  function handleClickOpenModalEditTeachers(id: string): void {
    setShowModalEditTeachers(props.id);
  }
  return (
    <div className={styles.container}>
      {props.modalDeleteTeachers && (
        <Action
          icon={reactIcon(FiEdit, 'var(--gray-300)')}
          onClick={() => handleClickOpenModalEditTeachers(props.id)}
        />
      )}
      {props.modalDeleteTeachers && (
        <Action
          icon={reactIcon(FaTrashAlt, '#f1646c')}
          onClick={() => handleClickOpenModalExcluirTeachers(props.id)}
        />
      )}

      {props.modalDeleteLessons && (
        <Action
          icon={reactIcon(FiEdit, 'var(--gray-300)')}
          onClick={() => handleClickOpenModalEdit(props.id)}
        />
      )}
      {props.modalDeleteLessons && (
        <Action
          icon={reactIcon(FaTrashAlt, '#f1646c')}
          onClick={() => handleClickOpenModalExcluir(props.id)}
        />
      )}
      {showModalEditTeachers === props.id && (
        <ModalAddEditTeachers
          modalKey={props.id}
          onClose={() => setShowModalEditTeachers('')}
        />
      )}
      {showModalDeleteTeachers === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.titleDeleteTeachers}?`}
          onCancel={() => setShowModalDeleteTeachers('')}
        />
      )}

      {showModalEdit === props.id && (
        <ModalLessons
          modalKey={props.id}
          onClose={() => setShowModalEdit('')}
        />
      )}
      {showModalDelete === props.id && (
        <ModalDelete
          title={'Excluir'}
          message={`Realmente deseja excluir ${props.titleDelete}?`}
          onCancel={() => setShowModalDelete('')}
        />
      )}
    </div>
  );
}
