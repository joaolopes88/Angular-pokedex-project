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

  viewDetails(name: string) {
    this.router.navigate(['/pokemon-detail', name]);
  }
}