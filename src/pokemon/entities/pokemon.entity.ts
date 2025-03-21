import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {

    @Prop({
        unique: true,
        index: true
    })
    name: string;
    
    @Prop({
        unique: true,
        index: true
    })
    no: number;

    @Prop({
        unique: true,
        index: true
    })
    url: string;
    
    @Prop({
        unique: true,
        index: true
    })
    img: string;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );