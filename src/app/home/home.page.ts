import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listTask;
  private state = "All";

  constructor(public service : ServiceService, private router : Router) {
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getTask();
  }
  
  onClickCreateTask() {
    this.router.navigateByUrl("create-task");
  }

  getTask() {
    this.service.getTask().subscribe(
      (data : any) => {
        
        for (var i = 0; i< data.length; i++) {
          switch (data[i].state) {
            case "To do":
              data[i].urlImage = "http://localhost:8080/to-do.jpg"
              break;
            case "In progress":
              data[i].urlImage = "http://localhost:8080/in-progress.png"
              break;
            case "Done":
              data[i].urlImage = "http://localhost:8080/done.png"
              break;
          }
        }

        console.log(data);
        this.listTask = data;
      },
      (error) => {

      });
  }

  getTaskDependingState(state) {
    this.service.getTaskDependingState(state).subscribe(
      (data) => {
        this.listTask = data;
      },
      (error) => {

      });
  }

  onClickUpdate(task) {

    let navigationExtras : NavigationExtras = {
      queryParams: task
    };

    this.router.navigate(['update-task'], navigationExtras);

  }

  onClickDelete(id) {
    
    this.service.deleteTask(id).subscribe(
      (data) => {
        this.onChangeState(this.state);
      },
      (error) => {

      });
  }

  onChangeState(state) {
    
    this.state = state;
    
    switch (state) {
      case "All":
        this.getTask();
        break;
      default:
        this.getTaskDependingState(state);
        break;
    }

  }
}
