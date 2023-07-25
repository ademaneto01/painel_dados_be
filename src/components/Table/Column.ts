export default class Column<T> {
  constructor(readonly header: string, readonly accessor: keyof T) {}
}
