import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user-service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-login-form', templateUrl: './login-form.component.html', styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

	loginForm!: FormGroup;

	constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
		this.userService = userService;
	}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: [''], password: ['']
		})
	}

	login() {
		this.userService.loginUser()
			.subscribe(response => {
				const user = response.find((user: any) => {
					return user.username === this.loginForm.value.username && user.password === this.loginForm.value.password
				});
				if (user) {
					alert("Login Success");
					this.loginForm.reset();
					//this.router.navigate([''])
				} else {
					alert("User not found !!");
				}
			}, error => {
				alert("Something went wrong");
			})
	}
}
