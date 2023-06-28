import styles from "@/styles/Table.module.css";
import { useMemo, useState } from "react";
import ErrorComponent from "../ErrorComponent";
import { Loader } from "../shared";
import Column from "./Column";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";
import {
  ImArrowRight2,
  ImArrowLeft2
} from "react-icons/im";
import { IconType } from "react-icons";

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: "1.15em" } });
}
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  error?: boolean;
  loaded?: boolean;
  searchInputHidden?: string;
}

let id = 0;
function getKey(prefix: string): string {
  id++;
  return prefix + id;
}

export default function Table<T>(props: TableProps<T>): JSX.Element {
  const loaded = "loaded" in props ? props.loaded : true;
  const error = "error" in props ? props.error : false;

  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const headers = useMemo(() => props.columns.map((column) => column.header), [
    props.columns,
  ]);
  const accessors = useMemo(
    () => props.columns.map((column) => column.accessor),
    [props.columns]
  );

  const styleInput = {

    display: props.searchInputHidden,

  }
   const filterData = (data: T[], filterName: string): T[] => {
    const normalizedFilterName = filterName.toLowerCase().trim();
    return data.filter((item) => {
      const itemName = (item as any).nome.toLowerCase();
      return itemName.includes(normalizedFilterName);
    });
  };

  const filteredData = useMemo(() => {
    if (filterName.trim() === "") {
      return props.data;
    } else {
      return filterData(props.data, filterName);
    }
  }, [props.data, filterName]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  //const totalPages = Math.ceil(props.data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleFilterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setCurrentPage(1);
  };
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // const paginatedData = props.data.slice(startIndex, endIndex);
  if (loaded) {
    if (!error) {
      return (
  <>
  <div style={styleInput}>
        <input
          className={styles.inputFilter}
          type="text"
          placeholder="Filtre pelo nome"
          value={filterName}
          onChange={handleFilterNameChange}
        />
      </div>
         <div className={styles.table}>
           <table>
             <TableHeaders headers={headers} />
             <tbody>
               {paginatedData.map((item) => {
                 const key = getKey("row-");
                 return (
                   <TableRow<T>
                     key={key}
                     id={id}
                     item={item}
                     accessors={accessors}
                   />
                 );
               })}
             </tbody>
           </table>
           <div className={styles.pagination}>
             <button onClick={handlePreviousPage} disabled={currentPage === 1}>
               {reactIcon(ImArrowLeft2)}
             </button>
             <span>{`${currentPage}/${totalPages}`}</span>
             <button onClick={handleNextPage} disabled={currentPage === totalPages}>
             {reactIcon(ImArrowRight2)}
             </button>
           </div>
         </div>
</>
      );
    } else {
      return <ErrorComponent />;
    }
  } else {
    return <Loader />;
  }
}


