import {Component, Injectable, OnInit} from '@angular/core';
import {NbAuthService, NbLoginComponent, NbTokenService} from '@nebular/auth';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CanActivate, Router} from "@angular/router";
import {tap} from "rxjs/internal/operators";
import {LoginService} from "./login.service";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
@Injectable()
export class LoginComponent extends NbLoginComponent implements OnInit , CanActivate {


  constructor(public authService: LoginService , public router: Router ) {
    super(null,null,null,router);
  }
  user={name:"",password:""};
  showMessages={error:false};
  public form : any;
  ngOnInit()
  {
    this.user.name="";
    this.user.password="";
    this.form = new FormGroup({
      username: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(this.user.password,Validators.required),
    });


    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }
  login()
  {
    
    
      this.authService.login(
      this.form
      )
        .subscribe(success => {
          if (success) {
            this.router.navigate(['/pages']);
            this.showMessages.error = false;
            console.log(this.user.name+" "+this.user.password);
          }
          else{
            this.showMessages.error = true;
          }
        });
    
  }
  canActivate() {
    if(!this.authService.isLoggedIn())
    {
      this.router.navigate(['auth/login']);
    }
    return this.authService.isLoggedIn();
          /*
          else
            this.router.navigate(['pages']);
          */
  }
}

