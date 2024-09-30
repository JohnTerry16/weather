import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './weather.schema';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel(Weather.name) private weatherModel: Model<Weather>,
        private readonly httpService: HttpService,
    ) { }

    async getWeatherForCity(city: string) {
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await lastValueFrom(this.httpService.get(url));
        const weatherData = response.data;

        const country = weatherData.sys.country;

        const weather = new this.weatherModel({
            city: `${weatherData.name}, ${country}`,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            timestamp: new Date(),
        });

        await weather.save();
        console.log(weather);

        return {
            city: `${weatherData.name}, ${country}`,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            timestamp: new Date().toISOString(),
        };
    }

    async getLatestWeather() {
        return this.weatherModel.findOne().sort({ timestamp: -1 }).exec();
      }
    
    async getLastWeatherReports(limit: number = 100) {  
        return this.weatherModel.find().sort({ timestamp: -1 }).limit(limit).exec();
    }
}