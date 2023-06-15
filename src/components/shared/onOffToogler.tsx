import styles from "@/styles/OnOffToogler.module.css";
import { useState } from "react";

interface OnOffTogglerProps {
    active: boolean;
}

export default function OnOffToggler(props: OnOffTogglerProps): JSX.Element {
  const [active, setActive] = useState(props.active);

  function style({ on }: { on: boolean }): string {
    let classes = [styles.inner];
    if (on) {
      classes = classes.concat([styles.on, styles.left]);
      if (active) {
        classes.push(styles.active);
      }
    } else {
      classes.push(styles.off);
      if (!active) {
        classes.push(styles.active);
      }
    }
    return classes.join(" ");
  }

  return (
    <div className={styles.container} onClick={() => setActive(!active)}>
      <div className={style({ on: true })}>On</div>
      <div className={style({ on: false })}>Off</div>
    </div>
  );
}
