import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{
	registerForm!: FormGroup;

	constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
		this.userService = userService;
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: [''],
			password: ['']
		})
	}

	register() {
		this.userService.registerUser(this.registerForm.value)
			.subscribe(response => {
				alert("Registered Successfully");
				this.registerForm.reset();
				this.router.navigate(['login'])
			}, error => {
				alert("Something went Wrong");
			})
	}

}
