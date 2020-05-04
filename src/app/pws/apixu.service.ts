import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const urlKey = '5d83832f29185ff545333316f376109f';
const urlUnits = 'f';   // use m for metrics

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) {}

  getWeather(location){
      return this.http.get(
        'http://api.weatherstack.com/current?access_key=' + urlKey + '&units=' + urlUnits + '&query=' + location
      );
  }

  getPWSWeather(location){
    return this.http.get(
      'https://api.weather.com/v2/pws/observations/current?stationId=' + location + '&format=json&units=e&apiKey=834990315f50490e8990315f50990e8f'
    );
}
}
