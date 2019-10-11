import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  public createData = {
    descripcion:"",
    state: ""
  }

  constructor(private router : Router,public service : ServiceService) { }

  ngOnInit() {
  }

  onClickExit() {
    this.router.navigateByUrl("home");
  }

  onChangeState(state) {
    this.createData.state = state;
  }

  onClickCreate() {
    if (this.createData.state != "" && this.createData.descripcion != "") {
      
      this.service.postTask(this.createData).subscribe((data) => {
        this.router.navigateByUrl("home");
      })
    }
  }
}
