import { FormControl } from '@angular/forms/src/model';
import { Login } from './../../core/model';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  model = new Login();

  constructor(private auth: AuthService) { }

  login(form: FormControl) {
    this.auth.login(this.model.usuario, this.model.senha);
  }

}
