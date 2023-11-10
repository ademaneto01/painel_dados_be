import styles from '@/styles/Page.module.css';
import React, { ReactNode } from 'react';

interface DeleteButtonProps {
  text?: string;
  icon?: ReactNode;
  size?: string;
  onClick: VoidFunction;
  color: string;
  colorBackGround: string;
}

export default function DeleteButton(props: DeleteButtonProps): JSX.Element {
  const styleButton = {
    backgroundColor: props.colorBackGround,
    color: props.color,
    width: props.size,
  };
  return (
    <div className={styles.deleteButtonContainer}>
      <div
        className={styles.deleteButton}
        data-testid="action"
        onClick={props.onClick}
        style={styleButton}
      >
        {props.icon ? (
          <>
            {props.icon}
            {props.text}
          </>
        ) : (
          props.text
        )}
      </div>
    </div>
  );
}
