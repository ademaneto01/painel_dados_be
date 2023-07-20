import styles from '@/styles/Page.module.css';
import React, { ReactNode } from 'react';

interface CreateButtonProps {
  text?: string;
  icon?: ReactNode;
  size?: string;
  onClick: VoidFunction;
  color: string;
  colorBackGround: string;
}

export default function CreateButton(props: CreateButtonProps): JSX.Element {
  const styleButton = {
    backgroundColor: props.colorBackGround,
    color: props.color,
    width: props.size,
  };
  return (
    <div className={styles.createButtonContainer}>
      <div
        className={styles.createButton}
        data-testid="action"
        onClick={props.onClick}
        style={styleButton}
      >
        {props.text ? props.text : <>{props.icon}Visualizar</>}
      </div>
    </div>
  );
}
