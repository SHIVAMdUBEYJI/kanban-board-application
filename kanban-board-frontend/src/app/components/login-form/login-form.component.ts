import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user-service";

@Component({
	selector: 'app-login-form', templateUrl: './login-form.component.html', styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

	logInForm = this.formBuilder.group({
		email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)]],
		password: [null, [Validators.required, Validators.minLength(8)]]
	});

	constructor(private userService: UserService, private formBuilder: FormBuilder) {
	}

	ngOnInit(): void {
	}

	onSubmit(): void {
		if (this.logInForm.valid && this.logInForm.value != null) {
			this.userService.loginUser(this.logInForm.value);
		}
	}


}
