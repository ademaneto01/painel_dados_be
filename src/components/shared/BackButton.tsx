import styles from '@/styles/Page.module.css';
import React, { ReactNode } from 'react';

interface BackButtonprops {
  text?: string;
  icon?: ReactNode;
  size?: string;
  onClick: VoidFunction;
  color: string;
  colorBackGround: string;
}

export default function BackButton(props: BackButtonprops): JSX.Element {
  const styleButton = {
    backgroundColor: props.colorBackGround,
    color: props.color,
    width: props.size,
  };
  return (
    <div className={styles.backButtonContainer}>
      <div
        className={styles.backButton}
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