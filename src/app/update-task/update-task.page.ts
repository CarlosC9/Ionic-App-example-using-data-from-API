import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  private dataRoute;
  private state = "To do";
  public textDescription = "";

  constructor(private route : ActivatedRoute,private service : ServiceService, private router : Router) {
    this.route.queryParams.subscribe((params) => {
      this.dataRoute = params;
      this.state = this.dataRoute.state;
      this.textDescription = this.dataRoute.descripcion;
    });
  }


  ngOnInit() {
  }

  onChangeState(state) {
    this.state = state;
  }

  

  onClickUpdate() {
    if (this.state != undefined && this.textDescription != "") {
      this.dataRoute = {
        id: parseInt(this.dataRoute.id),
        descripcion: this.textDescription,
        state: this.state
      }

      this.service.uploadTask(this.dataRoute).subscribe(
        (data) => {
          this.router.navigateByUrl("home");
        },
        (error) => {

        }
      );
    }
    
  }

  onClickExit() {
    this.router.navigateByUrl("home");
  }

}
