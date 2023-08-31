import styles from '../../styles/Table.module.css';
import { useCallback, useMemo, useState } from 'react';
import ErrorComponent from '../ErrorComponent';
import { Loader } from '../shared';
import Column from './Column';
import TableHeaders from './TableHeaders';
import TableRow from './TableRow';
import { ImArrowRight2, ImArrowLeft2 } from 'react-icons/im';
import { IconType } from 'react-icons';

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  error?: boolean;
  loaded?: boolean;
  searchInputNone?: string;
  searchInputNoneNome?: string;
  labelInput?: string;
  onClickRow?: (item: T) => void;
}

function reactIcon(icon: IconType): JSX.Element {
  return icon({ style: { fontSize: '1.15em' } });
}

let id = 0;
function getKey(prefix: string): string {
  id++;
  return prefix + id;
}

export default function Table<T>(props: TableProps<T>): JSX.Element {
  const loaded = 'loaded' in props ? props.loaded : true;
  const error = 'error' in props ? props.error : false;

  const [currentPage, setCurrentPage] = useState(1);
  const [filterNameOrEmail, setFilterNameOrEmail] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [filterProfile, setFilterProfile] = useState('');

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const headers = useMemo(
    () => props.columns.map((column) => column.header),
    [props.columns],
  );
  const accessors = useMemo(
    () => props.columns.map((column) => column.accessor),
    [props.columns],
  );

  const styleInput: React.CSSProperties = {
    display: props.searchInputNone,
  };
  const styleInputNome: React.CSSProperties = {
    display: props.searchInputNoneNome,
  };
  const filterData = useCallback(
    (
      data: T[],
      filterNameOrEmail: string,
      filterSchool: string,
      filterProfile: string,
    ): T[] => {
      const normalizedFilterNameOrEmail = filterNameOrEmail
        .toLowerCase()
        .trim();
      const normalizedFilterSchool = filterSchool.toLowerCase().trim();

      return data.filter((item) => {
        const itemName = (item as any).nome?.toLowerCase();
        const itemEmail = (item as any).email?.toLowerCase();
        const itemSchool = (item as any).escola?.toLowerCase();
        const itemProfile = (item as any).perfil;

        const nameMatch =
          itemName && itemName.includes(normalizedFilterNameOrEmail);
        const emailMatch =
          itemEmail && itemEmail.includes(normalizedFilterNameOrEmail);
        const schoolMatch =
          !filterSchool ||
          (itemSchool && itemSchool.includes(normalizedFilterSchool));
        const profileMatch =
          !filterProfile || (itemProfile && itemProfile === filterProfile);

        return (nameMatch || emailMatch) && schoolMatch && profileMatch;
      });
    },
    [],
  );

  const filteredData = useMemo(() => {
    if (
      filterNameOrEmail.trim() === '' &&
      filterSchool.trim() === '' &&
      filterProfile === ''
    ) {
      return props.data;
    } else {
      return filterData(
        props.data,
        filterNameOrEmail,
        filterSchool,
        filterProfile,
      );
    }
  }, [props.data, filterNameOrEmail, filterSchool, filterProfile, filterData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  const handleFilterNameOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilterNameOrEmail(event.target.value);
    setCurrentPage(1);
  };
  const handleFilterSchoolChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilterSchool(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterProfileChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterProfile(event.target.value);
    setCurrentPage(1);
  };

  const paginatedData = filteredData.slice(startIndex, endIndex);

  if (loaded) {
    if (!error) {
      return (
        <>
          <div className={styles.boxInput}>
            <input
              className={styles.inputFilter}
              type="text"
              style={styleInputNome}
              placeholder={props.labelInput}
              value={filterNameOrEmail}
              onChange={handleFilterNameOrEmailChange}
            />
            <input
              className={styles.inputFilter}
              type="text"
              style={styleInput}
              placeholder="Buscar pela escola"
              value={filterSchool}
              onChange={handleFilterSchoolChange}
            />
            <select
              style={styleInput}
              className={styles.inputSelect}
              value={filterProfile}
              onChange={handleFilterProfileChange}
            >
              <option value="">Todos os perfis</option>
              <option value="Administrador">Administrador</option>
              <option value="Pedagógico">Pedagógico</option>
              <option value="Professor">Professor</option>
            </select>
          </div>
          <div className={styles.table}>
            <table>
              <TableHeaders headers={headers} />
              <tbody>
                {paginatedData.map((item) => {
                  const key = getKey('row-');
                  return (
                    <TableRow<T>
                      key={key}
                      id={id}
                      item={item}
                      accessors={accessors}
                      onClickRow={props.onClickRow}
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
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {reactIcon(ImArrowRight2)}
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <ErrorComponent
          message={'Erro inesperado, tente novamente mais tarde...'}
        />
      );
    }
  } else {
    return <Loader />;
  }
}
