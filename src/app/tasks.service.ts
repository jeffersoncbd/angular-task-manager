import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[] = [];

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks !== null) {
      this.tasks = (JSON.parse(tasks) as any).map((task: any) => {
        if (task.date !== undefined) {
          task.date = new Date(task.date);
        }
        return task;
      });
    }
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  addTask(description: string, date: Date | undefined): void {
    this.tasks.push({
      id: this.tasks.length,
      description,
      date,
      completed: false,
    });
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

  toggleCompleted(taskId: number | undefined): void {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
  }
}
