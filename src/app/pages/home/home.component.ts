import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TypeTask } from 'src/app/models/task.model';
import { StorageService } from 'src/app/services/storage.service';
import { I18nPluralPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // para pluralizar la palabra item, según el caso
  itemPluralMapping = {
      '=1' : 'Item',
      'other' : 'Items'
  }

  @Input() tasks!: TypeTask[];
  newTask = new FormControl('', [Validators.required]);

  editTask = new FormControl('', [Validators.required]);
  isAdding = false;
  countPend = 0;
  countCompleted = 0;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.showTask();
  }

  addTask() {
    // Flag to indicate that user want to add a task
    this.isAdding = true;
    this.newTask.markAsTouched();
    if (this.newTask.valid) {
      // Trim blank spaces
      const newTitle = this.newTask.value!.trim();
      // Add a new task to array
      this.tasks.push({
        id: this.getNewId(),
        title: newTitle,
        completed: false,
        isEditting: 'false',
      });
      // Save tasks to Local Storage
      this.storageService.saveTask(this.tasks);
      this.newTask.reset();
      this.countPend += 1;
      this.isAdding = false;
    }
  }

  /* Crae un nuevo Id para la tarea, para ello:
  - Toma el id del ultimo elemento del array (si el array esta en 0 retorna '0')
  - lo convierte en Int y le suma 1
  - luego lo convierte nuevamente en string*/
  getNewId(){
    if (this.tasks.length > 0){
      const lastTaskId = this.tasks[this.tasks.length -1].id;
      return (parseInt(lastTaskId) + 1).toString();
    }
    return '0'
  }

  showTask() {
    this.tasks = this.storageService.getTasks();
    if (this.tasks) {
      this.countPendindTask();
    } else {
      this.tasks = [];
    }
  }

  changeState(id: string) {
    const index = this.tasks.findIndex((t) => t.id === id);
    this.tasks[index].completed = !this.tasks[index].completed;
    this.storageService.saveTask(this.tasks);
    if (this.tasks[index].completed) {
      this.countPend -= 1;
      this.countCompleted += 1;
    } else {
      this.countPend += 1;
      this.countCompleted -= 1;
    }
    // this.countPendindTask();
  }

  onDestroy(id: string) {
    const index = parseInt(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.storageService.saveTask(this.tasks);
    if (this.tasks.length === 0) {
      this.storageService.destroyAllTask();
      this.tasks = [];
      this.countPend = 0;
      this.countCompleted = 0;
    } else {
      this.countPendindTask();
    }
  }

  changeToEdit(id: string) {
    this.tasks.map((t) => {
      if (t.id === id) {
        t.isEditting = 'true';
        this.editTask.setValue(t.title);
      } else {
        t.isEditting = 'disabled';
      }
    });
    this.storageService.saveTask(this.tasks);
    // espera unos milisegundos para que el input ya este creado y le da el focus
    setTimeout(() => {
      document.getElementById('editInput')?.focus();
    }, 0);
  }

  onExitEdit() {
    this.tasks.map((t) => (t.isEditting = 'false'));
  }

  onEditTask(id: string) {
    const index = this.tasks.findIndex((t) => t.id === id);
    this.tasks[index].title = this.editTask.value!;
    this.onExitEdit();
    this.storageService.saveTask(this.tasks);
  }

  countPendindTask() {
    this.countPend = 0;
    this.countCompleted = 0
    this.tasks.map((t) => {
      if (t.completed === false) {
        this.countPend += 1;
      }else{
        this.countCompleted += 1;
      }
    });
  }

  clearCompleted(){
    const arrAux: TypeTask[] = [];
    this.tasks.map((t) => {
      if (t.completed === false) {
        arrAux.push(t);
      }
    });
    this.tasks = arrAux;
    this.countCompleted = 0;
  }
}
