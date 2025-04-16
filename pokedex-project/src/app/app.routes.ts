import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaypokemonComponent } from './displaypokemon/displaypokemon.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: 'displaypokemon', component: DisplaypokemonComponent },
  { path: 'pokemon-detail/:name', component: PokemonDetailComponent },
  { path: '', redirectTo: '/displaypokemon', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}