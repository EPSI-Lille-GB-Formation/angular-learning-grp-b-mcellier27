import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HighlightDirective } from './highlight.directive';
import { noOpenDirective } from './no-open.directive';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HighlightDirective, noOpenDirective],
  template:`<h1> Découverte des directives d'attributs</h1>

  <p highlight bg-color="green" default-color="blue"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime alias eaque qui at corrupti sequi reprehenderit similique consectetur hic voluptates,
     harum omnis suscipit pariatur aliquam rerum voluptas, a voluptate modi.
</p>

<p highlight bg-color="blue" default-color="green">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae in nam architecto eligendi, pariatur voluptas modi animi,
   molestias praesentium illo adipisci dolor, totam doloremque laudantium a est! Libero, facere architecto?
</p>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quos impedit, 
  expedita rerum suscipit modi possimus eos labore rem culpa laborum, at velit doloribus facilis sunt officia. Tenetur, in ipsum?
</p>

'<a noOpenDirective href="https://google.com">Essaye pour voir</a>',


  `,
  styles: []
})
export class AppComponent {
  title = 'sandbox';
}
