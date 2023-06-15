import dynamic from "next/dynamic";
import { TableProps} from "./Table";

const TableNoServerSideRendering = dynamic(() => import("./Table"), {
  ssr: false,
});

export default function Table<T>(props: TableProps<T>) {
  return (
    <TableNoServerSideRendering data={props.data} columns={props.columns} />
  );
}
