import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    url: string;

    @IsString()
    @MinLength(1)
    img: string;
}
