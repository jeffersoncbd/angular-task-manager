import { NgFor } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../input/input.component';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputComponent, RouterLink, NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  tasks: Task[] = [];
  tasksService: TasksService = inject(TasksService);

  constructor() {
    this.tasks = this.tasksService.getAllTasks();
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    event.stopPropagation();
  }
  onCheckBoxChange(taskId: number) {
    this.tasksService.toggleCompleted(taskId);
  }
}
