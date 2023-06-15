import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TypeTask } from 'src/app/models/task.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {


  completedTask: TypeTask[] = [];

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    const tasks: TypeTask[] = this.storageService.getTasks();
    const comTask: TypeTask[] = [];
    if(tasks){
      tasks.map((tk) =>{
        if(tk.completed){
          comTask.push(tk);
        }
      })
      this.completedTask = comTask;
      console.log(this.completedTask);
    }
  }

}
