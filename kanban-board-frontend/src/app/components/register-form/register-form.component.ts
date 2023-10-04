import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../../services/notification.service";
import {User} from "../../models/user/user.model";
import {UserService} from "../../services/user-service";

@Component({
    selector: 'app-register-form', templateUrl: './register-form.component.html', styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
	registerForm = this.fb.group({
		firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
		lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
		email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)]],
		password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
		confirmPassword: [null, [Validators.required]],
		mobileNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9][0-9]{9}/)]],
	}, {validators: [this.mustMatchValidator]});

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private snackBar: MatSnackBar,
		private notificationService: NotificationService,
		private router: Router) {
	}

	ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

	mustMatchValidator(fg: AbstractControl) {
		const passwordValue = fg.get("password")?.value;
		const confirmPasswordValue = fg.get("confirmPassword")?.value;
		if (!passwordValue || !confirmPasswordValue) {
			return null;
		}
		if (passwordValue != confirmPasswordValue) {
			return {mustMatch: false}
		}
		return null;
	}

	onSubmit(): void {
		let user: User = {
			firstName: this.registerForm.get('firstName')?.value,
			lastName: this.registerForm.get('lastName')?.value,
			email: this.registerForm.get('email')?.value,
			password: this.registerForm.get('password')?.value,
			mobileNumber: this.registerForm.get('mobileNumber')?.value,
			imageURL: "https://res.cloudinary.com/dduwkdctl/image/upload/v1673595767/Kanban%20Project/blank-profile-picture_nodr1y.png",
		}
		this.userService.registerUser(user).subscribe({
			next: () => {
				this.snackBar.open("Registered Successfully!", "Close", {duration: 3000});
				this.router.navigateByUrl('/login');
			},
			error: (err: { status: number; }) => {
				if (err.status === 409) {
					this.snackBar.open("Email already exists!", "Close", {duration: 3000});
				} else {
					this.snackBar.open("Internal server error!", "Close", {duration: 3000});
				}
			}
		});
		this.notificationService.sendMail(user);
	}

}
