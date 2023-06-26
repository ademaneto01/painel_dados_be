import styles from "@/styles/Page.module.css";

interface CreateButtonProps {
  text?: string;
  icon?:string;
  onClick: VoidFunction;
  color: string; // Adicionando a prop "color"
  colorBackGround: string;
}

export default function CreateButton(props: CreateButtonProps): JSX.Element {
  const styleButton = {
    backgroundColor: props.colorBackGround,
    color: props.color
  }
  return (
    <div className={styles.createButtonContainer} >
      <div className={styles.createButton} onClick={props.onClick} style={styleButton}>
        {props.text? props.text :<>{props.icon}Visualizar</>}
      </div>
    </div>
  );
}
