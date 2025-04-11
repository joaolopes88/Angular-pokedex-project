import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-displaypokemon',
  imports: [HttpClientModule, CommonModule], 
  templateUrl: './displaypokemon.component.html',
  styleUrl: './displaypokemon.component.css',
})
export class DisplaypokemonComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: any[] = [];

  ngOnInit() {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .subscribe((response: any) => {
        this.data = response.results.map((pokemon: any, index: number) => ({
          name: pokemon.name,
          url: pokemon.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }));
      });
  }
}