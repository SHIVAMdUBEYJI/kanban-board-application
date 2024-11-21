import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-register-form', templateUrl: './register-form.component.html', styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private formBuilder: FormBuilder,
				private router: Router,
				private userService: UserService,
				private toastr: ToastrService) {
        this.userService = userService;
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            username: [''], password: ['']
        })
    }

    register(): void {
        //console.log("working")
        this.userService.registerUser(this.registerForm.value).subscribe(response => {
			console.log("i n s i d e")
			this.showSuccess();
            this.registerForm.reset();
           this.router.navigateByUrl("/loginForm");

        }, error => this.showError(error))
    }

	showSuccess() {
		this.toastr.success('Hello world!', 'Toastr fun!');
	}

	showError(ex: any) {
		console.log(ex)
		this.toastr.error(ex.error, 'Error');
	}
}
