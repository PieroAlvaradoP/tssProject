import {Component, Inject, OnInit} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit{

  pokemonId: any;
  pokemon: any = '';
  pokemonImg = '';
  pokemonAb0 = [];
  pokemonAb1 = [];
  pokemonAb2 = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number},private pokemonService: PokemonService) {
    this.pokemonId=this.data.id;
  }

  ngOnInit(): void {
    this.getPokemon(this.pokemonId);
  }

  getPokemon(id: number) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonAb0=res.abilities[0].ability.name;
        this.pokemonAb1=res.abilities[1].ability.name;
        this.pokemonAb2=res.abilities[2].ability.name;
      },
      err => {
        console.log(err);
      }
    )
  }

}