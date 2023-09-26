export class Task {
	id : number |undefined;
	title: string |undefined;
	description: string |undefined;
	color: string |undefined;
	status: string |undefined;

	constructor(id?: number, title?: string, description?: string, color?: string, status?: string) {
        this.id = id;
		this.title=title;
		this.description=description;
		this.color=color;
		this.status=status;
	}
}
