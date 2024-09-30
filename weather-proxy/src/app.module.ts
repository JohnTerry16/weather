import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';

const MongoRoot = process.env.MONGO_ROOT

@Module({
  imports: [
    MongooseModule.forRoot(MongoRoot),
    WeatherModule,
  ],
})
export class AppModule {}
