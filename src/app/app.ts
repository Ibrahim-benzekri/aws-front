import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/tasks';
import { Task } from '../models/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  newTaskTitle = '';
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('GET /tasks =>', data);
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur GET /tasks', err);
        this.error = 'Impossible de charger les tâches.';
        this.loading = false;
      }
    });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();

    if (!title) {
      return;
    }

    this.error = '';
    console.log('POST /tasks avec =>', { title });

    this.taskService.createTask({ title }).subscribe({
      next: (createdTask) => {
        console.log('Tâche créée =>', createdTask);
        this.tasks.unshift(createdTask);
        this.newTaskTitle = '';
      },
      error: (err) => {
        console.error('Erreur POST /tasks', err);
        this.error = 'Impossible de créer la tâche.';
      }
    });
  }
}