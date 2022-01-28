import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface coordinates { lat: string; long: string }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'weatherApp';

  forecasts:any[] = [];
  selectedCity = "Select a City";
  currentForecasts: any;
  currentTemp: any;
  constructor(public http: HttpClient) { }
  cityList = [
    { name: "Delhi", coordinates: { lat: "28.7041", long: "77.1025" } },
    { name: "Bengaluru", coordinates: { lat: "12.9716", long: "77.5946" } },
    { name: "Mumbai", coordinates: { lat: "19.0760", long: "72.8777" } },
    { name: "Kolkata", coordinates: { lat: "22.5726", long: "88.3639" } },
    { name: "Los Angeles", coordinates: { lat: "34.0522", long: "118.2437" } } 
  ]

  showForCast(coordinates: any, name?: any) {
    this.selectedCity = name;
    this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&exclude=hourly,minutely&appid=39bb653e2f1a0ba50f0b68fc1866ba08&units=metric`).subscribe((data:any) => {
      console.log(data, "Forecast Data");
      this.currentTemp = data.current.temp;
      data.daily.forEach((weatherData:any)=>{ 
        weatherData.dt= new Date(weatherData.dt*1000).toLocaleDateString("en-US");
        weatherData.icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        weatherData.description = weatherData.weather[0].description;
        weatherData.avgTemp = (Math.round((weatherData.temp.max + weatherData.temp.min)/2 * 100) / 100).toFixed(2);
      });
      this.forecasts = data.daily;
      this.currentForecasts = data.current;
      console.log( this.forecasts);
      console.log(this.currentForecasts);
    })
  }
}
