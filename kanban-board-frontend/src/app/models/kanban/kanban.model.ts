import {Task} from "../task/task.model";

export class Kanban {
	id: number;
	title: string;
	tasks: Task[];

	constructor(id: number, title: string, tasks: Task[]) {
		this.id = id;
		this.title = title;
		this.tasks = tasks;
	}
}
