import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListTasksService {
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get('https://ng-tasks-c6b03.firebaseio.com/Tasks.json');
  }

  addTask(newTask) {
    return this.http.post(
      'https://ng-tasks-c6b03.firebaseio.com/Tasks.json',
      newTask
    );
  }

  updateTask(uTask) {
    return this.http.patch(
      'https://ng-tasks-c6b03.firebaseio.com/Tasks/' + uTask.id + '.json',
      { checked: uTask.checked }
    );
  }

  deleteTask(idTask) {
    return this.http.delete(
      'https://ng-tasks-c6b03.firebaseio.com/Tasks/' + idTask + '.json'
    );
  }
}
