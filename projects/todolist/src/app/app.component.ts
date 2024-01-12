import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { toDoListComponent } from './todo-list/todo-list.component';
import { BorderHighlightDirective } from './border-highlight.directive';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, toDoListComponent, BorderHighlightDirective],
  template:`
    

      <div class = "container">
        <todo-list />
      </div>
  `
  ,
  styles: []
})
export class AppComponent {}
