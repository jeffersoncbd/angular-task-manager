import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  confirmDelete = false;
  router: Router = inject(Router);

  constructor() {
    const taskId = Number(this.route.snapshot.params['id']);
    this.task = this.tasksService.getTaskById(taskId);
  }

  onCheckBoxChange(): void {
    this.tasksService.toggleCompleted(this.task?.id);
  }

  onDeleteClick(): void {
    this.confirmDelete = true;
  }
  onCancelClick(): void {
    this.confirmDelete = false;
  }

  onDelete() {
    this.tasksService.removeTask(this.task?.id);
    this.router.navigate(['/']);
  }
}
