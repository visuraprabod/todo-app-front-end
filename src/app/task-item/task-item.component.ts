import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ToastrService} from 'ngx-toastr';
import {Priority} from '../util/priority.enum';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Task;
  borderPriority = '2px solid lightgray';
  backgroundColor = '#f2f2f2';
  isExpanded = false;


  constructor(private toaster: ToastrService, public taskService: TaskService) {

  }

  ngOnInit(): void {
    if (!this.task.completed) {
      switch (this.task.priority) {
        case Priority.PRIORITY1:
          this.borderPriority = '2px solid red';
          this.backgroundColor = 'pink';
          break;
        case Priority.PRIORITY2:
          this.borderPriority = '2px solid yellow';
          this.backgroundColor = 'lightyellow';
          break;
        case Priority.PRIORITY3:
          this.borderPriority = '2px solid blue';
          this.backgroundColor = 'lightblue';
          break;
        case Priority.PRIORITY4:
          this.borderPriority = '2px solid lightgray';
          this.backgroundColor = '#f3f3f3';
          break;
      }
    } else {
      this.backgroundColor = '#BCF7E2';
      this.borderPriority = '2px solid green';
    }

  }

  async deleteClick($event: Event, task: Task): Promise<void> {
    if (confirm('Are you sure want to delete this task?')) {
      // console.log(this.taskService.taskList.indexOf(task));
      await this.taskService.deleteTask(task).then(() => {
        this.toaster.success('Successfully Deleted! ');
      }).catch(() => {
        this.toaster.warning('Delete Failed! Something went wrong');
      });
    }
    $event.stopImmediatePropagation();
  }

  async changePriority($event: MouseEvent): Promise<void> {
    $event.stopImmediatePropagation();
    let tempPriority: Priority = this.task.priority;
    const li = $event.target as any;
    switch (li.innerText) {
      case 'Priority 1':
        this.borderPriority = '2px solid red';
        tempPriority = Priority.PRIORITY1;
        this.backgroundColor = 'pink';
        break;
      case 'Priority 2':
        this.borderPriority = '2px solid yellow';
        tempPriority = Priority.PRIORITY2;
        this.backgroundColor = 'lightyellow';
        break;
      case 'Priority 3':
        this.borderPriority = '2px solid blue';
        tempPriority = Priority.PRIORITY3;
        this.backgroundColor = 'lightblue';
        break;
      case 'Priority 4':
        this.borderPriority = '2px solid lightgray';
        tempPriority = Priority.PRIORITY4;
        this.backgroundColor = '#f3f3f3';
        break;
    }
    await this.taskService.updateTask(new Task(this.task.id, this.task.text, this.task.completed, tempPriority)).then(() => {
      this.task.priority = tempPriority;
      this.toaster.show('Priority Change Successful');
    }).catch(() => {
      this.toaster.error('Something went wrong');
    });

  }

  async editTask($event: MouseEvent): Promise<void> {
    const btn = $event.target as any;
    const txtArea = btn.parentElement.children[2];
    if (txtArea.value === '' || txtArea.value.trim().length === 0) {
      this.toaster.error('Empty task cannot be added! Add a title to the task');
    } else {
      await this.taskService.updateTask(new Task(this.task.id, txtArea.value, this.task.completed, this.task.priority)).then(() => {
        this.task.text = txtArea.value;
        this.isExpanded = false;
        this.toaster.success('Change task title successfully');
      }).catch(() => {
        this.toaster.error('Something went wrong try again');
      });

    }
    $event.stopPropagation();

  }

  async changeCompleted(): Promise<void> {
    const b = !this.task.completed;
    await this.taskService.updateTask(new Task(this.task.id, this.task.text, b, this.task.priority)).then(() => {
      this.task.completed = !this.task.completed;
    }).catch(() => {
      this.toaster.error('Something went wrong');
    });


  }
}
