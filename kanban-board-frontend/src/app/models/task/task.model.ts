export class Task {
	id: number;
	title: string;
	description: string;
	color: string;
	status: string;

	constructor(id: number, title: string, description: string, color: string, status: string) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.color = color;
		this.status = status;
	}
}
