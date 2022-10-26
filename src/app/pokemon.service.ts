import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  url =  "https://pokeapi.co/api/v2/pokemon"

  getPokemon(){
    return this.http.get(this.url  + "?limit=156&offset=493");
  }

  getSpecificPokemon(name: string) {
    return this.http.get(this.url + "/" + name)
  }
}


// ?limit=100000&offset=0

// ?limit=156&offset=493