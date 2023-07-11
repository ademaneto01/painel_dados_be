import styles from '@/styles/Table.module.css';

interface TableRowProps<T> {
  id: number;
  item: T;
  accessors: (keyof T)[];
  // onClick?: (item: T) => void;
  onClick?: (item: T, accessor: keyof T) => void;
}

export default function TableRow<T>(props: TableRowProps<T>): JSX.Element {
  function getKey(accessor: string | number | symbol): string {
    return `row-${props.id}-${String(accessor)}`;
  }

  function retrieve(item: T, accessor: keyof T): any {
    return item[accessor];
  }

  // const handleClick = () => {
  //   if (props.onClick) {
  //     props.onClick(props.item);
  //   }
  // };
  const handleClick = (accessor: keyof T) => {
    if (props.onClick) {
      props.onClick(props.item, accessor);
    }
  };

  const rowClassName = `${props.id % 2 === 0 ? styles.odd : ''} ${
    props.onClick ? styles.pointer : ''
  }`;
  return (
    <tr className={rowClassName}>
      {props.accessors.map((accessor) => (
        <td
          key={getKey(accessor)}
          // onClick={props.onClick ? handleClick : undefined}
          onClick={() => handleClick(accessor)}
        >
          {retrieve(props.item, accessor)}
        </td>
      ))}
    </tr>
  );
}
