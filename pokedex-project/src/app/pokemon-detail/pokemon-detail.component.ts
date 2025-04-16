import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
  imports: [CommonModule], // No need for HttpClientModule here
  standalone: true,
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
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
}