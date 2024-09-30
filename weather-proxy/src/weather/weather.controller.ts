import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string) {
    return this.weatherService.getWeatherForCity(city);
  }

  @Get('latest')
  async getLatestWeather() {
    return this.weatherService.getLatestWeather();
  }

  @Get('last-reports')
  async getLastReports() {
    return this.weatherService.getLastWeatherReports();
  }
}