import {Component, OnInit} from '@angular/core';
import {Kanban} from "../../models/kanban/kanban.model";
import {Board} from "../../models/kanban/board.model";
import {User} from "../../models/user/user.model";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {KanbanServiceService} from "../../services/kanban-service.service";
import {UserService} from "../../services/user-service";
import {
	AddBoardPopupComponent,
	AddColumnPopupComponent,
	AddMemberPopupComponent,
	AddTaskPopupComponent
} from "./pop-up/pop-up-component";
import {Column} from "../../models/kanban/column.model";

import {Task} from "../../models/kanban/task.model";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DialogData} from "./dialog.data";


@Component({
	selector: 'app-kanban-board',
	templateUrl: './kanban-board.component.html',
	styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

	currentUserKanban?: Kanban;
	boardToDisplay?: Board;
	boardMembers: User[] = [];
	currentUserFirstName = localStorage.getItem('user_firstname');
	numberOfTasksAssignedToUser: Map<string, number> = new Map<string, number>();


	constructor(private kanbanService: KanbanServiceService, public dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar) {
	}

	// fetchDetailsOfBoardMembers() {
	// 	this.boardMembers = [];
	// 	this.boardToDisplay?.members?.forEach((memberEmail: string) => {
	// 		this.userService.getUserByEmail(memberEmail).subscribe({
	// 			next: (response: User) => {
	// 				this.boardMembers.push(response);
	// 			}
	// 		})
	// 	})
	// }
	fetchDetailsOfBoardMembers() {
		this.boardMembers = [];

		// Ensure this.boardToDisplay?.members is an array of strings
		const members = this.boardToDisplay?.members as string[] | undefined;

		if (members) {
			// Create an array of promises for fetching user details
			const promises = members.map((memberEmail: string) => {
				return this.userService.getUserByEmail(memberEmail).toPromise();
			});

			// Use Promise.all to handle all promises
			Promise.all(promises).then((responses: (User | undefined)[]) => {
				responses.forEach((response: User | undefined, index: number) => {
					// Check if the response is defined and if the corresponding email is not already in the boardMembers array
					if (response) {
						const memberEmail = members[index];
						const isMemberExists = this.boardMembers.some(member => member.email === memberEmail);

						if (!isMemberExists) {
							// If not, push the response to boardMembers
							this.boardMembers.push(response);
						}
					}
				});
			});
		}
	}



	displayBoard(board: Board) {
		this.boardToDisplay = board;
		this.fetchDetailsOfBoardMembers();
		this.getNumberOfTasksAssignedToUser();
	}

	addBoardToKanban() {
		const dialogRef = this.dialog.open(AddBoardPopupComponent, {
			width: '250px', data: {
				boardName: null, messageToDisplay: "Add"
			}, disableClose: true
		});
		dialogRef.afterClosed().subscribe({
			next: (result: string) => {
				console.log("result :" + result);
				if (result !== null) {
					console.log("result :" + result)
					//this.currentUserKanban?.boards?.push({boardName:result,columns:[],members:[]});
					if (this.currentUserKanban) {
						if (!this.currentUserKanban.boards) {
							this.currentUserKanban.boards = [];
						}
						this.currentUserKanban.boards.push({boardName: result, columns: [], members: []});
					}
					console.log(this.currentUserKanban);
					this.kanbanService.updateKanban(this.currentUserKanban!).subscribe((response: Kanban) => {
						this.currentUserKanban = response;
					}, (error) => {
						console.error('Error', error);
					})
				}
			}
		});
	}

	addColumnToBoard() {
		const dialogRef = this.dialog.open(AddColumnPopupComponent, {
			width: '250px', data: {
				columnName: '', boardToDisplay: this.boardToDisplay, messageToDisplay: "Add"
			}, disableClose: true
		});
		dialogRef.afterClosed().subscribe({
			next: (result: string) => {
				if (result !== null) {
					this.currentUserKanban?.boards?.forEach((b: Board) => {
						if (b.boardName === this.boardToDisplay?.boardName) {
							b.columns?.push({columnName: result, tasks: []});
						}
					});
					this.kanbanService.updateKanban(this.currentUserKanban!);
				}
			}
		})
	}

	addTaskToColumn(column: Column) {
		const dialogRef = this.dialog.open(AddTaskPopupComponent, {
			width: '300px', data: {
				taskName: '',
				taskDescription: '',
				taskAssignee: '',
				taskStartDate: '',
				taskDueDate: '',
				taskPriority: '',
				taskStatus: '',
				boardToDisplay: this.boardToDisplay,
				messageToDisplay: "Add",
				numberOfTasksAssignedToUsers: this.numberOfTasksAssignedToUser
			}, disableClose: true
		});
		dialogRef.afterClosed().subscribe({
			next: (result: DialogData) => {
				if (result !== null) {
					this.currentUserKanban?.boards?.forEach((b: Board) => {
						if (b.boardName === this.boardToDisplay?.boardName) {
							b.columns?.forEach((c: Column) => {
								if (c.columnName === column.columnName) {
									c.tasks?.push({
										name: result.taskName,
										description: result.taskDescription,
										assigneeEmail: result.taskAssignee,
										startDate: result.taskStartDate,
										dueDate: result.taskDueDate,
										priority: result.taskPriority
									});
									this.getNumberOfTasksAssignedToUser();
								}
							});
						}
					});
					this.kanbanService.updateKanban(this.currentUserKanban!);
					this.fetchDetailsOfTaskAssignee();
					this.kanbanService.sendMessageToMember(`You have been assigned a new task ${result.taskName} in ${this.boardToDisplay?.boardName} by ${localStorage.getItem('user_firstname')}`, result.taskAssignee);
				}
			}
		})
	}

	addMembersToBoard() {
		const dialogRef = this.dialog.open(AddMemberPopupComponent, {
			width: '250px', data: {email: undefined}, disableClose: true
		});
		dialogRef.beforeClosed().subscribe({
			next: (result: string) => {
				console.log(result);
				if (result !== null) {
					this.currentUserKanban?.boards?.forEach((board: Board) => {
						if (board.boardName === this.boardToDisplay?.boardName) {
							if (board.members?.includes(result)) {
								this.snackBar.open("Member already exists in this board", "Close", {duration: 2000});
							} else {
								board.members?.push(result);
								this.snackBar.open("Member added successfully", "Close", {duration: 2000});
								this.kanbanService.sendMessageToMember(`You have been added to the board ${this.boardToDisplay?.boardName} by ${localStorage.getItem('user_firstname')}`, result);
								this.kanbanService.addMemberToBoard(this.currentUserKanban!, result).subscribe({
									next: (result) => console.log(result)
								})
								this.fetchDetailsOfBoardMembers();
							}
						}
					});
				}
			}
		})
	}

	fetchDetailsOfTaskAssignee() {
		this.currentUserKanban?.boards?.forEach((board: Board) => {
			board.columns?.forEach((column: Column) => {
				column.tasks?.forEach((task: Task) => {
					if (task.assigneeEmail != null && task.assigneeEmail !== "") {
						this.userService.getUserByEmail(task.assigneeEmail!).subscribe({
							next: (response) => {
								task.assigneeName = response.firstName;
								task.assigneeImageURL = response.imageURL;
							}
						})
					}
				})
			})
		})
	}

	deleteBoard(boardName: string | undefined) {
		let boardMembers: string[] = []
		this.currentUserKanban?.boards?.forEach((board: Board) => {
			if (board.boardName === boardName) {
				boardMembers = board.members!;
			}
		});
		if (boardMembers.length != 0) {
			boardMembers.forEach((member: string) => {
				this.kanbanService.getKanbanByEmail(member).subscribe({
					next: (result: Kanban) => {
						result.boards?.forEach((board: Board) => {
							if (board.boardName === boardName) {
								result.boards?.splice(result.boards.indexOf(board), 1);
								this.kanbanService.saveKanban(result).subscribe({
									error: (err) => console.log(err)
								});
							}
						})
						setTimeout(() => {
							window.location.reload();
						}, 100);
					}, error: (err) => console.log(err)
				});
			})
		} else {
			this.currentUserKanban?.boards?.forEach((board: Board, index: number) => {
				if (board.boardName === boardName) {
					this.currentUserKanban?.boards?.splice(index, 1);
				}
			});
			this.kanbanService.updateKanban(this.currentUserKanban!);
			setTimeout(() => {
				window.location.reload();
			}, 100);
		}
	}

	deleteColumn(column: Column) {
		this.currentUserKanban?.boards?.forEach((board: Board) => {
			if (board.boardName === this.boardToDisplay?.boardName) {
				board.columns?.forEach((column1: Column, index: number) => {
					if (column1.columnName === column.columnName) {
						board.columns?.splice(index, 1);
					}
				})
			}
		});
		this.kanbanService.updateKanban(this.currentUserKanban!);
	}

	deleteTask(task: Task) {
		this.currentUserKanban?.boards?.forEach((board: Board) => {
			if (board.boardName === this.boardToDisplay?.boardName) {
				board.columns?.forEach((column: Column) => {
					column.tasks?.forEach((t: Task, index: number) => {
						if (t.name === task.name) {
							column.tasks?.splice(index, 1);
						}
					})
				})
			}
		});
		this.kanbanService.updateKanban(this.currentUserKanban!);
	}

	drop(event: CdkDragDrop<Task[] | undefined>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data!, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data!, event.container.data!, event.previousIndex!, event.currentIndex!,);
		}
		this.kanbanService.updateKanban(this.currentUserKanban!);
	}

	cannotDrag(task: Task) {
		return this.boardToDisplay?.columns![this.boardToDisplay.columns!.length - 1].tasks?.includes(task);
	}

	ngOnInit(): void {
		console.log("checking:" + this.currentUserKanban)
		this.kanbanService.getCurrentUserKanban();
		setTimeout(() => {
			this.currentUserKanban = this.kanbanService.currentUserKanban;
			this.fetchDetailsOfTaskAssignee();
			console.log(this.currentUserKanban);
		}, 1000);
	}

	editColumnName(column: Column) {
		const dialogRef = this.dialog.open(AddColumnPopupComponent, {
			width: '250px', data: {
				columnName: column.columnName, boardToDisplay: this.boardToDisplay, messageToDisplay: "Edit"
			}, disableClose: true
		});
		dialogRef.afterClosed().subscribe({
			next: (result: string) => {
				if (result != null) {
					this.currentUserKanban?.boards?.forEach((board: Board) => {
						if (board.boardName === this.boardToDisplay?.boardName) {
							board.columns?.forEach((column1: Column) => {
								if (column1.columnName === column.columnName) {
									column1.columnName = result;
								}
							})
						}
					})
					this.kanbanService.updateKanban(this.currentUserKanban!);
				}
			}
		});
	}

	editTask(task: Task, columnName: string) {
		const dialogRef = this.dialog.open(AddTaskPopupComponent, {
			width: '300px', data: {
				taskName: task.name,
				taskDescription: task.description,
				taskAssignee: task.assigneeEmail,
				taskStartDate: task.startDate,
				taskDueDate: task.dueDate,
				taskPriority: task.priority,
				boardToDisplay: this.boardToDisplay,
				messageToDisplay: "Edit",
				numberOfTasksAssignedToUsers: this.numberOfTasksAssignedToUser
			}, disableClose: true
		});
		dialogRef.beforeClosed().subscribe({
			next: (result: DialogData) => {
				if (result != null) {
					this.currentUserKanban?.boards?.forEach((board: Board) => {
						if (board.boardName === this.boardToDisplay?.boardName) {
							board.columns?.forEach((column: Column) => {
								if (column.columnName === columnName) {
									column.tasks?.forEach((task1: Task) => {
										if (task1.name === task.name) {
											task1.name = result.taskName;
											task1.description = result.taskDescription;
											task1.assigneeEmail = result.taskAssignee;
											task1.startDate = result.taskStartDate;
											task1.dueDate = result.taskDueDate;
											task1.priority = result.taskPriority;
											this.getNumberOfTasksAssignedToUser();
										}
									})
								}
							})
						}
					})
					this.kanbanService.updateKanban(this.currentUserKanban!);
					this.kanbanService.sendMessageToMember(`You have been assigned a new task ${result.taskName} in ${this.boardToDisplay?.boardName} by ${localStorage.getItem('user_firstname')}`, result.taskAssignee);
				}
			}
		});
	}

	editBoardName() {
		const dialogRef = this.dialog.open(AddBoardPopupComponent, {
			width: '250px', data: {
				boardName: this.boardToDisplay?.boardName, messageToDisplay: "Edit"
			}, disableClose: true
		});
		dialogRef.afterClosed().subscribe({
			next: (result: string) => {
				if (result != null) {
					this.currentUserKanban?.boards?.forEach((board: Board) => {
						if (board.boardName === this.boardToDisplay?.boardName) {
							board.boardName = result;
						}
					})
					this.kanbanService.updateKanban(this.currentUserKanban!);
				}
			}
		});
	}

	getNumberOfTasksAssignedToUser() {
		this.numberOfTasksAssignedToUser = new Map<string, number>();
		this.currentUserKanban?.boards?.forEach((board: Board) => {
			if (board.boardName === this.boardToDisplay?.boardName) {
				board.columns?.forEach((column: Column) => {
					column.tasks?.forEach((task: Task) => {
						if (this.numberOfTasksAssignedToUser.has(task.assigneeEmail!) && task.assigneeEmail != undefined && task.assigneeEmail != "") {
							this.numberOfTasksAssignedToUser.set(task.assigneeEmail!, this.numberOfTasksAssignedToUser.get(task.assigneeEmail!)! + 1);
						} else if (task.assigneeEmail != undefined && task.assigneeEmail != "") {
							this.numberOfTasksAssignedToUser.set(task.assigneeEmail!, 1);
						}
					})
				})
			}
		});
	}
}
