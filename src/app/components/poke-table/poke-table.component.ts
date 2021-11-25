import { Component, OnInit, Inject } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PokeDetailComponent } from '../poke-detail/poke-detail.component';


@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'image'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);



  pokemons = [];

  constructor(private pokemonService: PokemonService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    let pokemonData;
    
    for (let i = 1; i <= 20; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };

          this.data.push(pokemonData);
          this.data.sort((a, b) => (a.position < b.position ? -1 : 1));
          this.dataSource = new MatTableDataSource<any>(this.data);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  popUp(row: { position: any; }){
    this.dialog.open(PokeDetailComponent, {
      data: {id:row.position},
    });
  }
}



