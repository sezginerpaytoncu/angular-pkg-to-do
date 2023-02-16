import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';

@NgModule({
  declarations: [TaskFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TaskFormComponent],
})
export class SezginModule {}
