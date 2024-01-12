import { Component, Input } from '@angular/core';
import { Todo } from '../src/app/todo';
import { CommonModule } from '@angular/common';
import { BorderHighlightDirective } from '../src/app/border-highlight.directive';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, BorderHighlightDirective],
  template:`
  <article *ngIf = "todo" border-highlight> 
        <div class="grid">
        <label for='todo-{{todo.id}}'>
            <input type="checkbox" id="todo-{{todo.id}}" name ="todo-{{todo.id}}">
        {{todo.title}}
        </label>
        <div class="action">
            <a href = '#'>Edit</a>
            <a href = '#'>Delete</a>

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
  }

`
]
})
export class TodoComponent {
@Input("value")
todo: Todo |undefined

onCheck
}
