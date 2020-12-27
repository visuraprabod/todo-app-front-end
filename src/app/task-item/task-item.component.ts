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

  deleteClick($event: Event, task: Task): void {
    if (confirm('Are you sure want to delete this task?')) {
      console.log(this.taskService.taskList.indexOf(task));
      this.taskService.taskList.splice(this.taskService.taskList.indexOf(task), 1);
      this.toaster.success('Successfully Deleted! ');
    }
    $event.stopImmediatePropagation();
  }

  changePriority($event: MouseEvent): void {
    this.toaster.show('Priority Change Succeful');
    const li = $event.target as any;
    switch (li.innerText) {
      case 'Priority 1':
        this.borderPriority = '2px solid red';
        this.task.priority = Priority.PRIORITY1;
        this.backgroundColor = 'pink';
        break;
      case 'Priority 2':
        this.borderPriority = '2px solid yellow';
        this.task.priority = Priority.PRIORITY2;
        this.backgroundColor = 'lightyellow';
        break;
      case 'Priority 3':
        this.borderPriority = '2px solid blue';
        this.task.priority = Priority.PRIORITY3;
        this.backgroundColor = 'lightblue';
        break;
      case 'Priority 4':
        this.borderPriority = '2px solid lightgray';
        this.task.priority = Priority.PRIORITY4;
        this.backgroundColor = '#f3f3f3';
        break;
    }
    $event.stopImmediatePropagation();
  }

  editTask($event: MouseEvent): void {
    const btn = $event.target as any;
    const txtArea = btn.parentElement.children[2];
    if (txtArea.value === '' || txtArea.value.trim().length === 0) {
      this.toaster.error('Empty task cannot be added! Add a title to the task');
    } else {
      this.task.text = txtArea.value;
      this.isExpanded = false;
      this.toaster.success('Change task title successfully');
    }
    $event.stopPropagation();

  }
}
