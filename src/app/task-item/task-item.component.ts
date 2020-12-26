import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {Priority} from '../util/priority.enum';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Task;

  constructor() {
  }

  ngOnInit(): void {
  }

}
