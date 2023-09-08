import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service";

@Component({
    selector: 'app-register-form', templateUrl: './register-form.component.html', styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    registerForm!: FormGroup;

    ngOnInit(): void {
    }

}
