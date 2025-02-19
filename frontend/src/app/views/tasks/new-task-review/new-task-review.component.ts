import { Component, OnInit, Input } from '@angular/core';
import { Task } from '@models/Task';
import { NewTask } from '@models/NewTask';

@Component({
  selector: 'app-new-task-review',
  templateUrl: './new-task-review.component.html',
  styleUrls: ['./new-task-review.component.css']
})
export class NewTaskReviewComponent implements OnInit {

  @Input() task: Task;
  constructor() { }

  ngOnInit() {
  }

}
