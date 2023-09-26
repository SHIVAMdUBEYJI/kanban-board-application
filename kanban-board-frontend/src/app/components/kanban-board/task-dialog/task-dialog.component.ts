import {Component, Inject, OnInit} from '@angular/core';
import {Task} from "../../../models/task/task.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {TaskServiceService} from "../../../services/task-service.service";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit{

	dialogTitle:string;
	kanbanId :number =2;
	task:Task;

	form:FormGroup;

	constructor(private formBuilder:FormBuilder, private dialogRef:MatDialogRef<TaskDialogComponent>, @Inject(MAT_DIALOG_DATA) private data:any, private kanbanService:KanbanServiceService, private taskService:TaskServiceService) {

		this.dialogTitle = data.title;
		//this.kanbanId = data.kanbanId;
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
	   //console.log(this.kanbanId = this.data.kanbanId);
		console.log(this.kanbanId);
		this.mapFormToTaskModel();
		if(!this.task.id){
			console.log(this.kanbanId);
			this.kanbanService.saveNewTaskInKanban(this.kanbanId,this.task).subscribe();
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
