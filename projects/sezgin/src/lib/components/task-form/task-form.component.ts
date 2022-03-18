import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../services/task';

@Component({
  selector: 'lib-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  public taskForm = new FormGroup({
    createdAt: new FormControl(Date.now(), Validators.required),
    description: new FormControl("", [Validators.required, Validators.minLength(10)]),
    completed: new FormControl(false, Validators.required),
    updatedAt: new FormControl(Date.now(), Validators.required),
    media: new FormControl(""),
    id: new FormControl("", Validators.required),
  });

  constructor(private taskService: TaskService) { }

  task1: Task = {
    createdAt: Date.now(),
    description: "",
    completed: false,
    updatedAt: Date.now(),
    media: "",
    id: ""
  };
  isImageProper: boolean = true;

  ngOnInit(): void {
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe(task => {console.log(task)});
  }



  onSubmit(f: NgForm) {
    f.value.taskDescription = f.value.taskDescription.trim();
    if(f.value.taskDescription.length===0){
      console.log('You can not submit empty data');
      return;
    }

    this.task1.createdAt = Date.now();
    this.task1.description = f.value.taskDescription;
    this.task1.completed = false;
    this.task1.updatedAt = Date.now();
    if(this.isImageProper===true)
      this.addTask(this.task1);
    else
      return;
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
        const max_size = 20000;

        if (fileInput.target.files[0].size > max_size) {
            // console.error('Maximum size allowed is ' + max_size / 1000 + 'kB');
            this.isImageProper = false;
            return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const imgBase64Path = e.target.result;
                this.task1.media = imgBase64Path;
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
        this.isImageProper = true;
        return;
    }else{
      this.isImageProper = true;
      return;
    }
  }

}
