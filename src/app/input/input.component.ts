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
    const { description, dueDate } = this.taskForm.value;

    if (description === undefined || description === '') {
      return;
    }

    this.tasksService.addTask(
      description ?? '',
      dueDate ? new Date(dueDate) : undefined
    );
    this.taskForm.reset();
  }
}
