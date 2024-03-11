import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  tasksService: TasksService = inject(TasksService);

  task: Task | undefined;
  confirmDelete = false;
  edit = false;
  taskForm = new FormGroup({
    description: new FormControl(''),
    dueDate: new FormControl(''),
  });

  constructor() {
    const taskId = Number(this.route.snapshot.params['id']);
    this.task = this.tasksService.getTaskById(taskId);
    let dueDate = '';
    if (this.task?.date !== undefined) {
      const year = this.task.date.getFullYear();
      const month = (this.task.date.getMonth() + 1).toString().padStart(2, '0');
      const day = this.task.date.getDate().toString().padStart(2, '0');
      dueDate = `${year}-${month}-${day}`;
    }
    this.taskForm = new FormGroup({
      description: new FormControl(this.task?.description ?? ''),
      dueDate: new FormControl(dueDate),
    });
  }

  onCheckBoxChange(): void {
    this.tasksService.toggleCompleted(this.task?.id);
  }

  onEditClick(): void {
    this.edit = true;
  }
  onDeleteClick(): void {
    this.confirmDelete = true;
  }
  onCancelClick(): void {
    this.edit = false;
    this.confirmDelete = false;
  }

  onSave(): void {
    if (this.task !== undefined) {
      const { description, dueDate } = this.taskForm.value;
      this.tasksService.editTask(
        this.task.id,
        description ?? '',
        dueDate ? new Date(dueDate) : undefined
      );
    }
    this.edit = false;
  }
  onDelete() {
    this.tasksService.removeTask(this.task?.id);
    this.router.navigate(['/']);
  }
}
