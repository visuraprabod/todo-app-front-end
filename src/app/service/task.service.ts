import {Injectable} from '@angular/core';
import {Task} from '../model/task';
import {Priority} from '../util/priority.enum';
import {LoginService} from './login.service';

@Injectable()

export class TaskService {

  taskList: Array<Task> = [];

  constructor(public loginService: LoginService) {
    this.taskList.push(new Task('T001', 'Requirement Elicitation', true, Priority.PRIORITY1));
    this.taskList.push(new Task('T002', 'Design UI', true, Priority.PRIORITY1));
    this.taskList.push(new Task('T003', 'Develop the Code', false, Priority.PRIORITY2));
    this.taskList.push(new Task('T004', 'Test the App', false, Priority.PRIORITY3));
    this.taskList.push(new Task('T005', 'Build for Production', false, Priority.PRIORITY3));
    this.taskList.push(new Task('T006', 'Deploy the App', false, Priority.PRIORITY4));
  }

  async deleteTask(task: Task): Promise<void> {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 204) {
            this.taskList.splice(this.taskList.indexOf(task), 1);
            resolve();
          } else {
            reject();
          }
        }
      };
      http.open('DELETE', `http://localhost:8080/todoist/tasks?id=${task.id}&uid=${this.loginService.userId}`, true);
      http.send();
    });
  }


  async getAllTasks(): Promise<void> {
    return new Promise(((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200) {
            this.taskList = JSON.parse(http.responseText);
            resolve();
          } else {
            reject();
          }
        }
      };

      http.open('GET', `http://localhost:8080/todoist/tasks?uid=${this.loginService.userId}`, true);
      http.send();
    }));
  }

  async addTask(text: string): Promise<string> {
    return new Promise(((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 201) {
            const id = http.responseText;
            resolve(id);
          }
        }
      };

      http.open('POST', `http://localhost:8080/todoist/tasks?uid=${this.loginService.userId}`, true);
      http.setRequestHeader('Content-Type', 'application/json');
      http.send(JSON.stringify(new Task('', text, false, Priority.PRIORITY4)));


    }));
  }

  async updateTask(task: Task): Promise<void> {
    return new Promise(((resolve, reject) => {
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

      http.open('PUT', `http://localhost:8080/todoist/tasks?uid=${this.loginService.userId}`, true);
      http.setRequestHeader('Content-Type', 'application/json');
      http.send(JSON.stringify(task));
    }));
  }


}
