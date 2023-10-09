import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {UserService} from "../services/user-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {

	constructor(private userService: UserService, private router: Router, private snackbar: MatSnackBar) {
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.userService.isLoggedIn || localStorage.getItem('token') != null) {
			return true;
		} else {
			this.snackbar.open("You must be logged in to access this page", "Close", {duration: 2000});
			this.router.navigateByUrl("login");
			return false;
		}
	}
}


