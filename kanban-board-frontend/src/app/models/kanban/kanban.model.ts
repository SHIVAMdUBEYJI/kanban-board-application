import {Task} from "../task/task.model";

export class Kanban {
	id : number |undefined ;
	title : string |undefined ;
	tasks : Task[] |undefined;

	constructor(id?: number, title?: string, tasks?: Task[]) {
		this.id= id;
		this.tasks = tasks;
	}
}
