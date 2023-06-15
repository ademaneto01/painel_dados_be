import styles from "@/styles/Action.module.css";

interface ActionProps {
  onClick: VoidFunction;
  icon: JSX.Element;
}

export default function Action(props: ActionProps): JSX.Element {
  return (
    <div className={styles.action} onClick={props.onClick}>
      {props.icon}
    </div>
  );
}
