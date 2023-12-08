import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TODOS } from './mock-todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template:`
    <h1> Liste des choses à faire </h1>
    <ul>
      <li> {{selectTodo(0).title}}</li>
      <li> {{selectTodo(1).title}}</li>
      <li> {{selectTodo(2).title}}</li>
      <li> {{selectTodo(3).title}}</li>
      <li> {{selectTodo(4).title}}</li>
      <li> {{selectTodo(5).title}}</li>
      <li> {{selectTodo(6).title}}</li>
      <li> {{selectTodo(7).title}}</li>
      <li> {{selectTodo(8).title}}</li>
      <li> {{selectTodo(9).title}}</li>
      <li> {{selectTodo(10).title}}</li>
  `
  ,
  styles: []
})
export class AppComponent {

  todoList = TODOS

  constructor(){
    console.table(this.todoList)
  }
  
  selectTodo(id : number){
    return this.todoList[id];
  }
  
}
