import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, AfterViewInit {
  
  pokemons: any[] = []
  viewPokemon: boolean = false

  constructor(private pokemonService: PokemonService) { }

  types: any = {
    "normal": "rgba(168, 167, 122, 0.45)",
    "fire": "rgba(238, 129, 48, 0.45)",
    "water": "rgba(99, 144, 240, 0.45)",
    "electric": "rgba(247, 208, 44, 0.45)",
    "grass": "rgba(122, 199, 76, 0.45)",
    "ice": "rgba(150, 217, 214, 0.45)",
    "fighting": "rgba(194, 46, 40, 0.45)",
    "poison": "rgba(163, 62, 161, 0.45)",
    "ground": "rgba(226, 191, 101, 0.45)",
    "flying": "rgba(169, 143, 243, 0.45)",
    "psychic": "rgba(249, 85, 135, 0.45)",
    "bug": "rgba(166, 185, 26, 0.45)",
    "rock": "rgba(182, 161, 54, 0.45)",
    "ghost": "rgba(115, 87, 151, 0.45)",
    "dragon": "rgba(111, 53, 252, 0.45)",
    "dark": "rgba(112, 87, 70, 0.45)",
    "steel" : "rgba(183, 183, 206, 0.45)",
    "fairy" :"rgba(214, 133, 173, 0.45)"
  }

  ngOnInit(): void {
    this.getPokemon()
  }

  ngAfterViewInit() {
    setTimeout( ()=>{
      this.sortPokemon()
      this.getGradients()
      this.styleTypes()
      }, 1000)
    //   console.log(this.pokemons)
  }

  getPokemon() {
    this.pokemonService.getPokemon().subscribe((data: any) => {
      data.results.forEach((element: any) => {
        this.pokemonService.getSpecificPokemon(element.name).subscribe((response: any) => {
          // this.sortPokemon()
          this.pokemons.push(response)
          // this.sortPokemon()
          this.getGradients()
          this.styleTypes()
        })
      })
    })
  }

  sortPokemon() {
    this.pokemons.sort((a,b) => a.orderr - b.order);
  }

  getGradients() {
    Array.from(document.getElementsByClassName("mat-card") as HTMLCollectionOf<HTMLElement>).forEach((element) => {     
      if (element.classList.item(3)!.toString().split("-").length === 2) {
        let firstColor = this.types[element.classList.item(3)!.toString().split("-")[0]]
        let secondColor = this.types[element.classList.item(3)!.toString().split("-")[1]]
        element.style.backgroundImage = "linear-gradient(135deg, " + firstColor +  " 20%," + secondColor + " 80%)"
      } 
      else {
        let firstColor = this.types[element.classList.item(3)!.toString().split("-")[0]]
        // element.style.backgroundImage = "linear-gradient(135deg," + firstColor +  " 50%, rgba(255,255,255,1) 100%)"
        element.style.backgroundColor = firstColor
      }

    })
  }

  styleTypes() {
    Array.from(document.getElementsByClassName("card-types") as HTMLCollectionOf<HTMLElement>).forEach((element) => {
      element.style.border = "3px solid " + this.types[element.innerText.toLowerCase()].replace(/[^,]+(?=\))/, '1')
      element.style.backgroundColor = this.types[element.innerText.toLowerCase()].replace(/[^,]+(?=\))/, '0.35')
    })
  }

  consolePokemon() {
    console.log(this.pokemons)
  }

  convertUpperCase(val: string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  addPadding(val: number) {
    return ("00" + val).slice(-3)
  }

}
