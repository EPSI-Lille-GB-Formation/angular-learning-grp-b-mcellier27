import { Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[noOpenDirective]',
  standalone: true
})

export class noOpenDirective {

    constructor(){}
    @HostListener('click', ['$event'])
    onClick(event: Event) {
        // Empêcher le comportement par défaut de l'événement (ouverture du lien)
        event.preventDefault();

    /*@HostListener('click')
    onClick() {
        // Empêcher le comportement par défaut de l'événement (ouverture du lien)
        return false;
      */
}
}