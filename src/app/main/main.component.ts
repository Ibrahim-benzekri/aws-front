import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/tasks';
import { Task } from '../../models/task';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container glass-panel">
      <div class="header">
        <h2>Mes tâches ✨</h2>
        <p class="subtitle">Gérez vos activités en toute simplicité</p>
      </div>

      <div *ngIf="loading" class="loading-spinner">Chargement...</div>
      <div *ngIf="error" class="error-msg">{{ error }}</div>

      <form (ngSubmit)="addTask()" class="task-form">
        <input
          type="text"
          [(ngModel)]="newTaskTitle"
          name="title"
          class="task-input"
          placeholder="Qu'avez-vous à faire aujourd'hui ?"
          autocomplete="off"
        />
        <button type="submit" class="btn-primary" [disabled]="!newTaskTitle.trim()">
          Ajouter
        </button>
      </form>

      <ul class="task-list">
        <li *ngFor="let task of tasks" class="task-item">
          <!-- Mode Affichage -->
          <div class="task-content" *ngIf="editingTask?.id !== task.id">
            <span class="task-title">{{ task.title }}</span>
            <div class="task-actions">
              <button class="btn-icon btn-edit" (click)="editTask(task)" title="Modifier">✏️</button>
              <button class="btn-icon btn-delete" (click)="deleteTask(task.id)" title="Supprimer">🗑️</button>
            </div>
          </div>
          
          <!-- Mode Édition -->
          <form class="task-edit-form task-content" *ngIf="editingTask?.id === task.id" (ngSubmit)="saveTask()">
            <input 
              type="text" 
              name="editTitle"
              [(ngModel)]="editTaskTitle" 
              class="task-input edit-input"
              (keyup.escape)="cancelEdit()"
              autofocus
            />
            <div class="task-actions">
              <button type="submit" class="btn-icon btn-save" title="Sauvegarder" [disabled]="!editTaskTitle.trim()">✅</button>
              <button type="button" class="btn-icon btn-cancel" (click)="cancelEdit()" title="Annuler">❌</button>
            </div>
          </form>
        </li>
      </ul>

      <div *ngIf="!loading && tasks.length === 0" class="empty-state">
        <p>Aucune tâche pour le moment. Profitez de votre journée ! 🏖️</p>
      </div>
    </div>
  `,
})
export class MainComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  newTaskTitle = '';
  loading = false;
  error = '';

  editingTask: Task | null = null;
  editTaskTitle = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur GET /tasks', err);
        this.error = 'Impossible de charger les tâches.';
        this.loading = false;
      },
    });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    this.error = '';

    this.taskService.createTask({ title }).subscribe({
      next: (createdTask) => {
        // En fonction de l'API, parfois elle retourne directement la tache.
        if (createdTask) {
          this.tasks.unshift(createdTask);
        } else {
          // Sinon on recharge
          this.loadTasks();
        }
        this.newTaskTitle = '';
      },
      error: (err) => {
        console.error('Erreur POST /tasks', err);
        this.error = 'Impossible de créer la tâche.';
      },
    });
  }

  editTask(task: Task): void {
    this.editingTask = task;
    this.editTaskTitle = task.title;
    this.error = '';
  }

  cancelEdit(): void {
    this.editingTask = null;
    this.editTaskTitle = '';
  }

  saveTask(): void {
    if (!this.editingTask) return;
    const title = this.editTaskTitle.trim();
    if (!title) return;

    const taskId = this.editingTask.id;
    this.error = '';

    this.taskService.updateTask({ id: taskId, title }).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          // Si l'API renvoie la tache modifiée, on l'utilise, sinon on modifie localement
          this.tasks[index].title = updatedTask?.title || title;
        }
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Erreur PUT /tasks', err);
        this.error = 'Impossible de mettre à jour la tâche.';
      }
    });
  }

  deleteTask(id: any): void {
    if (!confirm('Voulez-vous vraiment supprimer cette tâche ?')) return;

    this.error = '';

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: (err) => {
        console.error('Erreur DELETE /tasks', err);
        this.error = 'Impossible de supprimer la tâche.';
      }
    });
  }
}