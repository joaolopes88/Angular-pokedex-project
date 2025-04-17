import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-displaypokemon',
  templateUrl: './displaypokemon.component.html',
  styleUrls: ['./displaypokemon.component.css'],
  imports: [CommonModule, RouterModule, NavbarComponent],
  standalone: true,
})
export class DisplaypokemonComponent implements OnInit {
  data: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((response: any) => {
      this.data = response.results.map((pokemon: any, index: number) => ({
        name: pokemon.name,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));
    });
  }

  viewDetails(name: string) {
    this.router.navigate(['/pokemon-detail', name]);
  }
}