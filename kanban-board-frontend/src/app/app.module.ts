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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { RunningHeadComponent } from './components/running-head/running-head.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import { NotificationComponent } from './components/notification/notification.component';
import {DeleteAccountPopupComponent, UserProfileComponent} from './components/user-profile/user-profile.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import {
	AddBoardPopupComponent,
	AddColumnPopupComponent,
	AddMemberPopupComponent,
	AddTaskPopupComponent,
} from "./components/kanban-board/pop-up/pop-up-component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatRadioModule} from '@angular/material/radio';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {LayoutModule} from "@angular/cdk/layout";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterFormComponent,
    LoginFormComponent,
    RunningHeadComponent,
    NotificationComponent,
    UserProfileComponent,
    ErrorNotFoundComponent,
    KanbanBoardComponent,
    AddBoardPopupComponent,
    AddColumnPopupComponent,
    AddMemberPopupComponent,
    AddTaskPopupComponent,
    DeleteAccountPopupComponent,
  ],
	imports: [
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		DragDropModule,
		MatRadioModule,
		MatIconModule,
		MatListModule,
		MatInputModule,
		ReactiveFormsModule,
		HttpClientModule,
		ToastrModule.forRoot({
			positionClass: 'toast-top-right'
		}),
		CdkDropList,
		CdkDrag,
		MatDialogModule,
		MatSelectModule,
		MatCardModule,
		MatMenuModule,
		MatBadgeModule,
		MatTooltipModule,
		MatDatepickerModule,
		MatSnackBarModule,
		LayoutModule,
		MatNativeDateModule

	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
