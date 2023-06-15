import { Component, OnInit, Output } from '@angular/core';
import { TypeTask } from 'src/app/models/task.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  @Output() completedTask!: TypeTask[];

  constructor(private storageService: StorageService) {
    if(this.storageService.getTasks()){

    }
  }

  ngOnInit(): void {

  }

}
