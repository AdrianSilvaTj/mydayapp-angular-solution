import { Injectable } from '@angular/core';
import { TypeTask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveTask(task: TypeTask[]) {
    //console.log(task);
    localStorage.setItem('mydayapp-angular', JSON.stringify(task));
  }

  getTasks() {
    let tasks = localStorage.getItem('mydayapp-angular');
    console.log(tasks);
    if (tasks) {
      return JSON.parse(tasks);
    }
    return null
  }

  destroyAllTask(){
    localStorage.removeItem('mydayapp-angular');
  }
}
