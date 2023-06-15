import styles from "@/styles/Table.module.css";

interface TableRowProps<T> {
  id: number;
  item: T;
  accessors: (keyof T)[];
}

export default function TableRow<T>(props: TableRowProps<T>): JSX.Element {
  function getKey(accessor: string | number | symbol): string {
    return `row-${props.id}-${String(accessor)}`;
  }

  function retrieve(item: T, accessor: keyof T): any {
    return item[accessor];
  }

  return (
    <tr className={props.id % 2 === 0 ? styles.odd : ""}>
      {props.accessors.map((accessor) => (
        <td key={getKey(accessor)}>{retrieve(props.item, accessor)}</td>
      ))}
    </tr>
  );
}
