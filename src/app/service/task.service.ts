import {Injectable} from '@angular/core';
import {Task} from '../model/task';
import {Priority} from '../util/priority.enum';

@Injectable()

export class TaskService {

  taskList: Array<Task> = [];

  constructor() {
    this.taskList.push(new Task('Requirement Elicitation', true, Priority.PRIORITY1));
    this.taskList.push(new Task('Design UI', true, Priority.PRIORITY1));
    this.taskList.push(new Task('Develop the Code', false, Priority.PRIORITY2));
    this.taskList.push(new Task('Test the App', false, Priority.PRIORITY3));
    this.taskList.push(new Task('Build for Production', false, Priority.PRIORITY3));
    this.taskList.push(new Task('Deploy the App', false, Priority.PRIORITY4));
  }
}
