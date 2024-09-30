import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Weather extends Document {
  @Prop() city: string;
  @Prop() temperature: number;
  @Prop() description: string;
  @Prop() icon: string;
  @Prop() timestamp: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);