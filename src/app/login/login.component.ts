import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userEmail = '';
  userName = '';
  userPassword = '';
  userRetypePassword = '';
  email = '';
  password = '';
  active = false;


  constructor(public loginService: LoginService, public taskService: TaskService) {

  }

  ngOnInit(): void {
  }


  async login(): Promise<void> {
    await this.loginService.signIn(this.email.trim(), this.password.trim()).then(async () => {
      await this.taskService.getAllTasks().then(() => {
        this.loginService.login = true;
        alert('Login Successful');
      }).catch(() => {
        alert('Something went wrong try again');
      });
    }).catch(() => {
      alert('Invalid Credentials');
    });
  }

  async signUp(): Promise<void> {
    await this.loginService.signUp(this.userEmail.trim(), this.userName.trim(), this.userPassword.trim()).then(() => {
      alert('Signup Successful');
    }).catch(() => {
      alert('SignUp Failed');
    });

    this.userEmail = '';
    this.userPassword = '';
    this.userName = '';
    this.userEmail = '';

    this.active = true;

    const btn = document.getElementById('nav-home-tab') as HTMLElement;
    btn.click();


  }
}
