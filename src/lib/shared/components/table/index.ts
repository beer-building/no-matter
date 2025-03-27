import TableComponent from './Table.svelte';
import Cell from './Cell.svelte';
import InputCell from './InputCell.svelte';
import EditableCell from './EditableCell.svelte';
import Header from './Header.svelte';
import Head from './Head.svelte';
import Row from './Row.svelte';
import Body from './Body.svelte';

type _Table = typeof TableComponent & {
	Cell: typeof Cell;
	Header: typeof Header;
	Head: typeof Head;
	Row: typeof Row;
	Body: typeof Body;
	InputCell: typeof InputCell;
	EditableCell: typeof EditableCell;
};

const Table: _Table = TableComponent as _Table;
Table.Cell = Cell;
Table.Header = Header;
Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.InputCell = InputCell;
Table.EditableCell = EditableCell;

export { Table };
