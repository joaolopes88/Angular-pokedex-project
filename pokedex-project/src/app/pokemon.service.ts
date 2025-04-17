import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private typeUrl = 'https://pokeapi.co/api/v2/type'; // Corrected URL for types

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }

  getPokemonTypes(): Observable<any> {
    return this.http.get(this.typeUrl); // Corrected endpoint
  }
}