import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TODOS } from '../mock-todo';
import { TodoComponent } from '../todo/todo.component';


@Component({
selector: 'todo-list',
standalone: true,
imports: [CommonModule, TodoComponent],
template:`

<h1> Liste des choses à faire </h1>

 <a href ="#" role ="button" (click)="onClickTodo"> A faire</a>
 <a href ="#" role ="button"(click)="onClickTodoCompleted"> Terminées</a>
 <a href="#" role="button" (click)="onClickTodoAll()"> Tout afficher</a>

<ng-container *ngFor="let todo of todoList">
  <todo *ngIf="todo.isCompleted === completedFilter || allList"  [value]="todo"/>
</ng-container>
`,
styles: []
})

export class toDoListComponent{
    todoList = TODOS;

    completedFilter = false

    allList = false

    onClickTodo(){
      console.log("A faire!");
    }

    onClickTodoCompleted(){
      console.log("Terminées");
    }
    onClickTodoAll() {
      this.allList = true;
    }
}
