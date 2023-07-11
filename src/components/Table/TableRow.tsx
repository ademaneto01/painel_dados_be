import styles from '@/styles/Table.module.css';

interface TableRowProps<T> {
  id: number;
  item: T;
  accessors: (keyof T)[];
  // onClick?: (item: T) => void;
  onClickRow?: (item: T, accessor: keyof T) => void;
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
  // const handleClick = (accessor: keyof T) => {
  //   if (props.onClickRow) {
  //     props.onClickRow(props.item, accessor);
  //   }
  // };
  const handleClick = (accessor: keyof T) => {
    if (props.onClickRow && accessor === 'nome') {
      props.onClickRow(props.item, accessor);
    }
  };

  const rowClassName = ` ${props.onClickRow ? styles.pointer : ''}`;

  return (
    <tr className={`${props.id % 2 === 0 ? styles.odd : ''}`}>
      {props.accessors.map((accessor) => (
        <td
          key={getKey(accessor)}
          className={accessor === 'nome' ? styles.pointer : ''}
          onClick={() => handleClick(accessor)}
        >
          {retrieve(props.item, accessor)}
        </td>
      ))}
    </tr>
  );
}
