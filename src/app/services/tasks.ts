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
  private getapiUrl = 'https://2guks68ge9.execute-api.us-east-1.amazonaws.com/ender/proxy';
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getapiUrl);
  }

  createTask(task: { title: string }): Observable<Task> {
    return this.http.post<Task>(this.getapiUrl, task);
  }
}