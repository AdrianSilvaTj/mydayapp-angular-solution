import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TypeTask } from 'src/app/models/task.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: TypeTask[] = [];
  newTask = new FormControl('', [Validators.required]);

  @ViewChild('editInput') editInput!: ElementRef;
  editTask = new FormControl('', [Validators.required]);
  isAdding = false;
  isEditting: boolean[] = [false];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.showTask();
  }

  addTask() {
    let newId = '0';
    // Flag to indicate that user want to add a task
    this.isAdding = true;
    this.newTask.markAsTouched();
    if (this.newTask.valid) {
      // Add a Id from the length of the array
      newId = this.tasks.length.toString();
      // Trim blank spaces
      const newTitle = this.newTask.value!.trim();
      // Add a new task to array
      this.tasks.push({
        id: newId,
        title: newTitle,
        completed: false,
        isEditting: false
      });
      // Save tasks to Local Storage
      this.storageService.saveTask(this.tasks);
      console.log(this.tasks);
      this.newTask.reset();
      this.isAdding = false;
    }
  }

  showTask() {
    this.tasks = this.storageService.getTasks();
    if (this.tasks) {
      console.log(this.tasks);
    } else {
      this.tasks = [];
    }
  }

  changeState(id: string) {
    // const element = event.target as HTMLInputElement;
    const index = this.tasks.findIndex(t => t.id === id);
    this.tasks[index].completed = !this.tasks[index].completed;
    this.storageService.saveTask(this.tasks);
   // console.log(this.tasks[index]);
  }

  onDestroy(id:string) {
    const index = parseInt(id);
    this.tasks=this.tasks.filter(t => t.id !==id);
    this.storageService.saveTask(this.tasks);
    if (this.tasks.length === 0){
      this.storageService.destroyAllTask();
    }
  }

  changeToEdit(id: string, event:Event){
    const index = this.tasks.findIndex(t => t.id === id);
    const element = event.target as HTMLElement;
    this.tasks[index].isEditting = !this.tasks[index].isEditting;
    this.storageService.saveTask(this.tasks);
    this.editTask.setValue(this.tasks[index].title);
    this.editTask.markAsTouched();

  }

  onEditTask(id : string){
    const index = this.tasks.findIndex(t => t.id === id);
    this.tasks[index].title = this.editTask.value!;
    this.tasks[index].isEditting = !this.tasks[index].isEditting;
    this.storageService.saveTask(this.tasks);
  }

}
