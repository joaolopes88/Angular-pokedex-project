import { Component } from '@angular/core';
import { DisplaypokemonComponent } from "./displaypokemon/displaypokemon.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DisplaypokemonComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex-project';
}
