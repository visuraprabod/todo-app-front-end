import {Injectable} from '@angular/core';
import {Task} from '../model/task';
import {Priority} from '../util/priority.enum';

@Injectable()

export class TaskService {

  taskList: Array<Task> = [];

  constructor() {
    this.taskList.push(new Task('T001', 'Requirement Elicitation', true, Priority.PRIORITY1));
    this.taskList.push(new Task('T002', 'Design UI', true, Priority.PRIORITY1));
    this.taskList.push(new Task('T003', 'Develop the Code', false, Priority.PRIORITY2));
    this.taskList.push(new Task('T004', 'Test the App', false, Priority.PRIORITY3));
    this.taskList.push(new Task('T005', 'Build for Production', false, Priority.PRIORITY3));
    this.taskList.push(new Task('T006', 'Deploy the App', false, Priority.PRIORITY4));
  }

  async deleteTask(task: Task): Promise<boolean> {
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
      http.open('DELETE', `http://localhost:8080/todoist/tasks?id=${task.id}`, true);
      http.send();

    });

  }

}
