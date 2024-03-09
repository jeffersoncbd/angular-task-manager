import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  taskForm = new FormGroup({
    description: new FormControl(''),
    dueDate: new FormControl(''),
  });
  tasksService: TasksService = inject(TasksService);

  constructor() {}

  newTaskSubmit() {
    this.tasksService.addTask(
      this.taskForm.value.description ?? '',
      this.taskForm.value.dueDate
        ? new Date(this.taskForm.value.dueDate)
        : undefined
    );
    this.taskForm.reset();
  }
}
