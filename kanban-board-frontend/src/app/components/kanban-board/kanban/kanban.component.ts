import {Component, OnInit} from '@angular/core';
import {Task} from "../../../models/task/task.model";
import {Kanban} from "../../../models/kanban/kanban.model";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {TaskServiceService} from "../../../services/task-service.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";


@Component({
	selector: 'app-kanban', templateUrl: './kanban.component.html', styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

	kanban !: Kanban;
	todos: Task[] = [];
	inProgress: Task[] = [];
	dones: Task[] = [];

	constructor(private kanbanService: KanbanServiceService, private taskService: TaskServiceService, private route: ActivatedRoute, private dialog: MatDialog) {
	}

	ngOnInit(): void {
		this.getKanban();
	}

	drop(event: CdkDragDrop<Task[], any>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			this.updateTaskStatusAfterDragDrop(event);
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
		}
	}

	openDialogForNewTask(): void {
		this.openDialog('Create New Task', new Task(1,"hgc","jbjk","hj","ghj"));
	}

	// openTaskDialog(event: { srcElement: { id: any; }; }): void {
	// 	let taskId = event.srcElement.id;
	//
	// 	this.taskService.getTaskById(taskId).subscribe(response => {
	// 		this.openDialog('Update Task', response);
	// 	});
	// }
	openTaskDialog(event: MouseEvent):void{
		const taskId = (event.target as HTMLElement).id;
		this.taskService.getTaskById(taskId).subscribe(response =>{
			this.openDialog('Update Task',response);
		})
	}


	private getKanban(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if(id !==null){
			this.kanbanService.retrieveKanbanById(id).subscribe(response => {
				this.kanban = response;
				this.splitTaskByStatus(response);
			})
		}else {
			console.error('No valid ID found in the route.');
		}

	}

	private splitTaskByStatus(kanban: Kanban): void {
		this.todos = kanban.tasks.filter(t => t.status === 'TODO');
		this.inProgress = kanban.tasks.filter(t => t.status === 'INPROGRESS');
		this.dones = kanban.tasks.filter(t => t.status === 'DONE')
	}

	private updateTaskStatusAfterDragDrop(event: CdkDragDrop<Task[], any>) {
		let taskId = event.item.element.nativeElement.id;
		let containerId = event.container.id;

		this.taskService.getTaskById(taskId).subscribe(response => {
			this.updateTaskStatus(response, containerId);
		});
	}

	private updateTaskStatus(task: Task, containerId: string): void {
		if (containerId === 'todo') {
			task.status = 'TODO'
		} else if (containerId === 'inProgress') {
			task.status = 'INPROGRESS'
		} else {
			task.status = 'DONE'
		}
		this.taskService.updateTask(task).subscribe();
	}

	private openDialog(title: string, task: Task): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			title: title,
			task: task,
			kanbanId: this.kanban.id
		};
		this.dialog.open(TaskDialogComponent, dialogConfig)
	}
}
