import { Component } from '@angular/core';

import { DisplaypokemonComponent } from "./displaypokemon/displaypokemon.component";

@Component({
  selector: 'app-root',
  imports: [DisplaypokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex-project';
}
