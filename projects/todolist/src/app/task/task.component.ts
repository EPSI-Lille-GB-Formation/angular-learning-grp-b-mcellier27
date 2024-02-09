import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  
  //affichage page 
  template: `
    <h1>Afficher la tâche cliqué</h1>

    <a role ="button" (click)="goToHomePage">Retour à l'accueil</a>

    <p> Id: {{this.todo?.id}}</p>
    <p> Title: {{this.todo?.title}}</p>
    <p> Contenu: {{this.todo?.content}}</p>
    <p> Auteur: {{this.todo?.author}}</p>
    <p> Date de création: {{this.todo?.createdAt}}</p>
    <p> Date d'accomplissement: {{this.todo?.completedAt}}</p>
  `,
  styles: []
})
export class TaskComponent {
  todo : Todo | undefined
  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {

    const taskId : string|null = this.route.snapshot.paramMap.get('id') 
    
    if ( taskId)[
      this.todoService.getTodoById(+taskId).subscribe(todo => this.todo = todo)
    ]
  }

  goToHomePage() {
  this.router.navigate(['']);
  }
  
}