import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service";

@Component({
    selector: 'app-register-form', templateUrl: './register-form.component.html', styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
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
            alert("Registered successfully");
           // this.registerForm.reset();
          //  this.router.navigate(['login']);
        }, error => alert("Something wrong"))
    }
}
