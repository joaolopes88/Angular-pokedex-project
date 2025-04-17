import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
  imports: [CommonModule, NavbarComponent],
  standalone: true,
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;
  loading: boolean = true;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loading = true;
      this.pokemonService.getPokemonDetails(name).subscribe(
        (data) => {
          this.pokemon = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching Pokémon details:', error);
          this.loading = false;
        }
      );
    }
  }

  getPokemonTypes(): string {
    return this.pokemon?.types?.map((t: any) => t.type.name).join(', ') || 'N/A';
  }

  getPokemonAbilities(): string {
    return this.pokemon?.abilities?.map((a: any) => a.ability.name).join(', ') || 'N/A';
  }

  getCardStyle(): { [key: string]: string } {
    const types = this.pokemon?.types?.map((t: any) => t.type.name) || [];
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

  goToPreviousPokemon() {
    if (this.pokemon.id > 1) {
      const previousId = this.pokemon.id - 1;
      this.router.navigate(['/pokemon-detail', previousId.toString()]).then(() => {
        this.loadPokemon();
      });
    }
  }

  goToNextPokemon() {
    const nextId = this.pokemon.id + 1;
    this.router.navigate(['/pokemon-detail', nextId.toString()]).then(() => {
      this.loadPokemon();
    });
  }
}