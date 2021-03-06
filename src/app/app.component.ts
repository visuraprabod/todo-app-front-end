import {Component} from '@angular/core';
import {TaskService} from './service/task.service';
import {ToastrService} from 'ngx-toastr';
import {Task} from './model/task';
import {Priority} from './util/priority.enum';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isExpanded: any;
  textAreaTxt: any;

  constructor(public taskService: TaskService, private toaster: ToastrService, public loginService: LoginService) {

  }

  async addNewTask($event: Event): Promise<void> {
    const btn = $event.target as any;
    const txtArea = btn.parentElement.children[2];
    console.log('mehtnata enwa');
    if (txtArea.value === '') {
      this.toaster.error('Empty task cannot be added! Add a title to the task');
    } else {
      await this.taskService.addTask(txtArea.value).then((id) => {
        this.taskService.taskList.push(new Task(id, txtArea.value, false, Priority.PRIORITY4));
        this.toaster.success('New Task added Successfully');
        console.log(this.taskService.taskList);
      }).catch(() => {
        this.toaster.error('Failed to add');
      });
      txtArea.value = '';
      this.isExpanded = false;

    }


  }
}
