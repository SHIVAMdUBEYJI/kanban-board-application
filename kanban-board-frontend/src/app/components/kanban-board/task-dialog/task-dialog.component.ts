import {Component, Inject, OnInit} from '@angular/core';
import {Task} from "../../../models/task/task.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {TaskServiceService} from "../../../services/task-service.service";
import {Kanban} from "../../../models/kanban/kanban.model";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit{

	dialogTitle:string;
	task:Task;
	id:string =''

	form:FormGroup;

	constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private dialogRef:MatDialogRef<TaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private kanbanService:KanbanServiceService, private taskService:TaskServiceService) {

		this.dialogTitle = data.title;
		this.id = data.id;
		this.task = data.task;

		this.form = formBuilder.group({
			title:[this.task.title,Validators.required],
			description:[this.task.description,Validators.required],
			color:[this.task.color,Validators.required]
		});

	}

	ngOnInit(): void {
	}

	save(){
		console.log(this.data.kanban);
		this.mapFormToTaskModel();
		if(!this.task.id){
			console.log(this.data.kanban);
			this.kanbanService.saveNewTaskInKanban(this.data.kanban,this.task).subscribe();
		}else {
			this.taskService.updateTask(this.task).subscribe();
		}
		this.dialogRef.close();
	}

	close(){
		this.dialogRef.close();
	}

	private mapFormToTaskModel(): void{
		this.task.title = this.form.get('title')?.value;
		this.task.description = this.form.get('description')?.value
		this.task.color = this.form.get('color')?.value;
		this.task.status = 'TODO';

	}
}
