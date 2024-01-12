import { Component, Input } from '@angular/core';
import { Todo } from '../todo';
import { CommonModule } from '@angular/common';
import { BorderHighlightDirective } from '../border-highlight.directive';
import { Route } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [CommonModule, BorderHighlightDirective],
  template: `
    <article *ngIf="todo" border-highlight>
      <div class="grid">
        <label for="todo-{{todo.id}}">
          <input type="checkbox" [checked]="todo.isCompleted" id="todo-{{todo.id}}" (click)="onCheck()" >{{todo.title}}
        </label>
        <div class="action">
          <a href="#">Edit</a>
          <a href= # role =  "button" (click)="onView">Retour à l'accueil</a>
          <a href="#">Delete</a>
          
        </div>
      </div>
    </article>
    `,
  styles: [
    `
    .action {
      display: flex;
      flex-direction: row;
      justify-content:flex-end;
    }

    .action a{
      margin-left: 8px;
    }`
  ]
})
export class TodoComponent {

  @Input("value")
  todo: Todo | undefined;

  constructor(private router: Router)

  onCheck() {
    if(this.todo) {
      this.todo.isCompleted = !this.todo?.isCompleted
      console.table(this.todo)
    }
  }

  onView(){
    
  }
}