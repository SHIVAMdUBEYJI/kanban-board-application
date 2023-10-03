import {Column} from "./column.model";

export type Board = {
	boardName?: string,
	columns?: Column[],
	members?: string[]
}
