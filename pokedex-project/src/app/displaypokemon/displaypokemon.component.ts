import { Component, HostListener, OnInit } from '@angular/core';
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
  searchTerm: string = '';
  selectedType: string = '';
  offset: number = 0;
  limit: number = 151;
  loading: boolean = false;

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
    this.loadMorePokemon(); // Initial load
    this.loadPokemonTypes(); // Load Pokémon types
  }

  // Fetch Pokémon data
  loadMorePokemon() {
    if (this.loading) return; // Prevent multiple requests
    this.loading = true;

    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe(
      (response: any) => {
        const newPokemon = response.results.map((pokemon: any, index: number) => ({
          id: this.offset + index + 1, // Add this line
          name: pokemon.name,
          url: pokemon.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            this.offset + index + 1
          }.png`,
          types: [], // Placeholder for types
        }));

        // Fetch types for each Pokémon
        newPokemon.forEach((pokemon: { name: string; url: string; image: string; types: string[] }) => {
          this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details: any) => {
            pokemon.types = details.types.map((t: any) => t.type.name);
          });
        });

        this.data = [...this.data, ...newPokemon]; // Append new Pokémon to the list
        this.filteredData = this.data; // Update filtered data
        this.offset += this.limit; // Update the offset
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
      }
    );
  }

  // Fetch Pokémon types
  loadPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe((response: any) => {
      this.pokemonTypes = response.results.map((type: any) => type.name);
    });
  }

  // Detect when the user scrolls to the bottom of the page
  @HostListener('window:scroll', [])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.loading
    ) {
      this.loadMorePokemon(); // Load more Pokémon when reaching the bottom
    }
  }

  // Filter Pokémon by name and type
  filterPokemon() {
    const matchesName = (pokemon: any) =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesType = (pokemon: any) =>
      this.selectedType ? pokemon.types.includes(this.selectedType) : true;

    // Filter loaded Pokémon
    this.filteredData = this.data.filter((pokemon) => matchesName(pokemon) && matchesType(pokemon));

    // If no matching Pokémon are found, fetch them from the API
    if (this.filteredData.length === 0 && this.searchTerm) {
      this.loading = true;
      this.pokemonService.getPokemonDetails(this.searchTerm.toLowerCase()).subscribe(
        (details: any) => {
          const newPokemon = {
            name: details.name,
            url: details.url,
            image: details.sprites.front_default,
            types: details.types.map((t: any) => t.type.name),
          };

          // Add the new Pokémon to the data and filteredData arrays
          this.data.push(newPokemon);
          this.filteredData = [newPokemon];
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching Pokémon:', error);
          this.loading = false;
        }
      );
    }
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