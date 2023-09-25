import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {KanbanHomeComponent} from "./components/kanban-board/kanban-home/kanban-home.component";
import {KanbanComponent} from "./components/kanban-board/kanban/kanban.component";

const routes: Routes = [
	{
		path:'register',component:RegisterFormComponent
	},
	{
		path:'login',component:LoginFormComponent
	},
	{
		path: 'kanbans/:id', component: KanbanComponent
	},
	{
		path:'kanban-home' ,component:KanbanHomeComponent
	}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
