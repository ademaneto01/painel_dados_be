import styles from '@/styles/SideNavBar.module.css';
import React from 'react';

interface SideNavBarButtonProps {
  text: string;
  icon: JSX.Element;
  onClick?: VoidFunction;
  active: boolean;
  hidden: boolean;
  buttonHidden ?: boolean;
}

export default function SideNavBarButton(props: SideNavBarButtonProps) {
  function activable(style: string): string {
    return style + (props.active ? ` ${styles.activeNavBarButton}` : '');
  }
  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.navBarButtonHidden}` : '');
  }

  return (
    <a
      data-testid="side-nav-button"
      className={
        props.buttonHidden
        ? `${styles.buttonHidden}`
        : props.hidden
          ? activable(styles.navBarButton)
          : hidable(styles.navBarButtonHidden)
      }
      onClick={props.onClick}
    >
      {props.icon}
      <span className={styles.text}> {props.buttonHidden ? "" 
      :props.text}</span>
    </a>
  );
}
