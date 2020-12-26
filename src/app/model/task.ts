import {Priority} from '../util/priority.enum';

export class Task {

  constructor(public text: string, public completed: boolean, public priority: Priority) {

  }
}
