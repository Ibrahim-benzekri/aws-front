import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl2 = 'http://localhost:8080/tasks';
  private apiUrl = 'http://34.200.246.127:8080/tasks';
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: { title: string }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}