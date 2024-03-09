import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  task: Task | undefined;
  tasksService: TasksService = inject(TasksService);

  constructor() {
    const taskId = Number(this.route.snapshot.params['id']);
    this.task = this.tasksService.getTaskById(taskId);
  }

  onCheckBoxChange(taskId: number | undefined) {
    this.tasksService.toggleCompleted(taskId);
  }
}
