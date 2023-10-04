import {Board} from "../../models/kanban/board.model";

export interface DialogData {
	boardToDisplay: Board;
	boardName: string;
	columnName: string;
	taskName: string;
	taskDescription: string;
	taskPriority: string;
	taskStartDate: Date;
	taskDueDate: Date;
	taskAssignee: string;
	email: string;
	messageToDisplay: string;
	numberOfTasksAssignedToUsers: Map<string, number>;
}
