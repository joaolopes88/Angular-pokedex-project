import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-displaypokemon',
  templateUrl: './displaypokemon.component.html',
  styleUrls: ['./displaypokemon.component.css'],
  imports: [CommonModule, RouterModule, NavbarComponent, FormsModule],
  standalone: true,
})
export class DisplaypokemonComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  pokemonTypes: string[] = [];
  private _searchTerm: string = '';
  selectedType: string = '';

  typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    // Fetch Pokémon list
    this.pokemonService.getPokemonList().subscribe((response: any) => {
      this.data = response.results.map((pokemon: any, index: number) => ({
        name: pokemon.name,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
        types: [], // Placeholder for types
      }));
      this.filteredData = this.data;

      // Fetch Pokémon types
      this.pokemonService.getPokemonTypes().subscribe((typesResponse: any) => {
        this.pokemonTypes = typesResponse.results.map((type: any) => type.name);
      });

      // Fetch types for each Pokémon
      this.data.forEach((pokemon) => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details: any) => {
          pokemon.types = details.types.map((t: any) => t.type.name);
        });
      });
    });
  }

  // Getter and Setter for searchTerm
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterPokemon(); // Trigger filtering whenever searchTerm changes
  }

  filterPokemon() {
    this.filteredData = this.data.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType
        ? pokemon.types.includes(this.selectedType)
        : true;
      return matchesName && matchesType;
    });
  }

  getCardStyle(types: string[]): { [key: string]: string } {
    if (types.length === 1) {
      return {
        background: `${this.typeColors[types[0]]}B3`, // 70% opacity
      };
    } else if (types.length === 2) {
      return {
        background: `linear-gradient(to right, ${this.typeColors[types[0]]}B3, ${this.typeColors[types[1]]}B3)`,
      };
    }
    return {};
  }

  viewDetails(name: string) {
    this.router.navigate(['/pokemon-detail', name]);
  }
}