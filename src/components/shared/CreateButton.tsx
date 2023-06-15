import styles from "@/styles/Page.module.css";

interface CreateButtonProps {
  text: string;
  onClick: VoidFunction;
}

export default function CreateButton(props: CreateButtonProps): JSX.Element {
  return (
    <div className={styles.createButtonContainer}>
      <div className={styles.createButton} onClick={props.onClick}>
        {props.text}
      </div>
    </div>
  );
}