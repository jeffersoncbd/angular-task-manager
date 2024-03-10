import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[] = [];

  constructor() {
    const storageTasks = localStorage.getItem('tasks');
    if (storageTasks !== null) {
      this.tasks = (JSON.parse(storageTasks) as Task[]).map((task) => {
        if (task.date !== undefined) {
          task.date = new Date(task.date);
        }
        return task;
      });
    }
  }

  private saveTasks(): void {
    localStorage.setItem(
      'tasks',
      JSON.stringify(
        this.tasks.map((task) => {
          if (task.date !== undefined) {
            return {
              ...task,
              date: task.date.toJSON(),
            };
          }
          return task;
        })
      )
    );
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: number): Task | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }

  addTask(description: string, date: Date | undefined): void {
    const id = new Date().getTime();
    this.tasks.push({
      id,
      description,
      date,
      completed: false,
    });
    this.saveTasks();
  }

  removeTask(taskId: number | undefined): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  toggleCompleted(taskId: number | undefined): void {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    this.saveTasks();
  }
}
