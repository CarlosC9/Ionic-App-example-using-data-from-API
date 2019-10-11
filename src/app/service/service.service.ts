import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http :HttpClient) {

   }

   postTask(task) {
     return this.http.post("http://192.168.103.24:8080/createTask",null, {
       params: task
     });
   }

   getTask() {
     return this.http.get("http://192.168.103.24:8080/allTask");
   }

   getTaskDependingState(state) {
    return this.http.get("http://192.168.103.24:8080/allTask/" + state);
  }

  deleteTask(id) {
    return this.http.delete("http://192.168.103.24:8080/deleteTask", {
      params: {
        id:id
      }
    })
  }

  uploadTask(task) {
    console.log(task);
    return this.http.put("http://192.168.103.24:8080/uploadTask",null ,{
      params: task
    })
  }
}
