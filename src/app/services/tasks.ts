import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private gatewayApiUrl = 'https://2guks68ge9.execute-api.us-east-1.amazonaws.com/ender/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.gatewayApiUrl);
  }

  createTask(task: { title: string }): Observable<Task> {
    return this.http.post<Task>(this.gatewayApiUrl, task);
  }

  updateTask(task: { id: any, title: string }): Observable<Task> {
    return this.http.put<Task>(this.gatewayApiUrl, { id: task.id, title: task.title });
  }

  deleteTask(id: any): Observable<any> {
    return this.http.delete(this.gatewayApiUrl, { body: { id } });
  }
}