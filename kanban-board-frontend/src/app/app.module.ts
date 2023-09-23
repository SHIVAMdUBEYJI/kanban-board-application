import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import {ToastrModule} from "ngx-toastr";
import { KanbanComponent } from './components/kanban-board/kanban/kanban.component';
import { KanbanDialogComponent } from './components/kanban-board/kanban-dialog/kanban-dialog.component';
import { TaskDialogComponent } from './components/kanban-board/task-dialog/task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterFormComponent,
    LoginFormComponent,
    KanbanBoardComponent,
    KanbanComponent,
    KanbanDialogComponent,
    TaskDialogComponent
  ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatInputModule,
		ReactiveFormsModule,
		HttpClientModule,
		ToastrModule.forRoot({
			positionClass :'toast-top-right'
		})
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
