import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){
    
  }
  

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    //console.log(data);

    const pokemonToInsert: {name: string, no: number, url: string, img: string}[] = [];

    await Promise.all(data.results.map(async ({name, url}) => {
      try{
        const segments = url.split('/');
        const no = +segments[segments.length - 2];
        
        // Hacemos una solicitud adicional para obtener los detalles del Pokémon
        const pokemonDetail = await this.http.get<any>(url);

        const img = pokemonDetail.sprites?.other?.home?.front_default;
        if( !img ){
          console.warn(`No se encontro la imagen para el Pokemon ${name} (${no}).`);
        }

        pokemonToInsert.push({name, no, url, img: img || ''});

      } catch(error){
        console.error(`Error al procesar el Pokemon ${name}: `, error.message);
       }
    }));

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed'; 
  }

}
