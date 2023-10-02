import styles from '@/styles/Action.module.css';

interface ActionProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  icon: JSX.Element;
}

export default function Action(props: ActionProps): JSX.Element {
  return (
    <div className={styles.action} onClick={props.onClick} data-testid="action">
      {props.icon}
    </div>
  );
}
