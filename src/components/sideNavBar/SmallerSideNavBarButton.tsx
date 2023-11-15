import styles from '@/styles/SideNavBar.module.css';

interface SmallerSideNavBarButtonProps {
  icon: JSX.Element;
  onClick?: VoidFunction;
  hidden: boolean;
  active: boolean;
}

export default function SmallerSideNavBarButton(props: SmallerSideNavBarButtonProps) {
  function activable(style: string): string {
    return style + (props.active ? ` ${styles.activeNavBarButton}` : '');
  }

  function hidable(style: string): string {
    return style + (props.hidden ? ` ${styles.smallNavBarButtonHidden}` : '');
  }

  return (
    <a
      data-testid="small-side-nav-button"
      onClick={props.onClick}
      className={
        props.hidden
          ? activable(styles.smallNavBarButton)
          : hidable(styles.smallNavBarButton)
      }
    >
      {props.icon}
    </a>
  );
}
