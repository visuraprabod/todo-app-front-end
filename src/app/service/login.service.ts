import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable()
export class LoginService {
  login = false;
  userId = '';

  constructor() {
  }

  async signUp(email: string, userName: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 204) {
            resolve();
          } else {
            reject();
          }
        }
      };
      http.open('POST', 'http://localhost:8080/todoist/users', true);
      http.setRequestHeader('Content-Type', 'application/json');
      http.send(JSON.stringify(new User(userName, email, password)));
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200) {
            this.userId = http.responseText;
            resolve();
          } else {
            reject();
          }
        }
      };
      http.open('GET', `http://localhost:8080/todoist/users?email=${email}&pass=${password}`, true);
      http.send();
    });
  }
}
