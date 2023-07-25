interface TableHeadersProps {
  headers: string[];
}

export default function TableHeaders(props: TableHeadersProps) {
  return (
    <thead>
      <tr>
        {props.headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}
