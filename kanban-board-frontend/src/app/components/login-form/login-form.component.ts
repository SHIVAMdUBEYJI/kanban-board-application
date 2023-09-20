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
		this.userService.loginUser(this.loginForm.value).subscribe(response => {
			alert("login successfully")
		}, error => {
			alert("Invalid access")
		})
	}
}
