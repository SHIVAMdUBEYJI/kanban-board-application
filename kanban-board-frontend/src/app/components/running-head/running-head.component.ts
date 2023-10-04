import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user-service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {User} from "../../models/user/user.model";
import {Notification} from "../../models/notification/notification.model"

@Component({
    selector: 'app-running-head', templateUrl: './running-head.component.html', styleUrls: ['./running-head.component.css']
})
export class RunningHeadComponent implements OnInit {

    currentUser?: User;
    isLoggedIn: boolean = false;
    currentUserNotification?: Notification | undefined;
    noOfUnreadNotifications: number | undefined;

    constructor(private userService: UserService, private notification: NotificationService, private router: Router) {
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }



    logout() {
        this.userService.logoutUser();
    }

    goToNotification() {
        this.router.navigateByUrl('/notification').then(() => {
            window.location.reload();
        });
    }
}
