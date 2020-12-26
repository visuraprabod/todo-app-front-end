import {Component} from '@angular/core';
import {TaskService} from './service/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public taskService: TaskService) {

  }
}
