import styles from "@/styles/Error.module.css";
import Image from "next/image";

export default function ErrorComponent(): JSX.Element {
  return (
    <div className={styles.container}>
      <Image src={"/error.svg"} alt="Erro" width={200} height={200} />
      Algo deu errado...
    </div>
  );
}