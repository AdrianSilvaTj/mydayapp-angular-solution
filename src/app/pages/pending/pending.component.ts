import { Component, OnInit } from '@angular/core';
import { TypeTask } from 'src/app/models/task.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  pendingTask: TypeTask[] = [];

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    const tasks: TypeTask[] = this.storageService.getTasks();
    const comTask: TypeTask[] = [];
    if(tasks){
      tasks.map((tk) =>{
        if(tk.completed === false){
          comTask.push(tk);
        }
      })
      this.pendingTask = comTask;
      console.log(this.pendingTask);
    }
    this.pendingTask = comTask;
  }

}


