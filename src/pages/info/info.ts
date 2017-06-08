import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  data: any;
  imageUrl: any;
  @ViewChild('weather') weatherR: ElementRef;
  @ViewChild('temp') temp: ElementRef;
  @ViewChild('max') maxtemp: ElementRef;
  @ViewChild('min') mintemp: ElementRef;
  @ViewChild('hum') hum: ElementRef;
  @ViewChild('wind') wind: ElementRef;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.data;
  }

  ionViewDidLoad() {
    if (this.data != null){
      console.log("We already have weather info!");
      console.log("DATA: "+ (this.data.weather[0].icon).substring(0,2));
      switch((this.data.weather[0].icon).substring(0,2)){
        case "01":
          this.imageUrl = "img/clear.png";
        break;
        case "02":
          this.imageUrl = "img/cloud.jpg";
        break;
        case "03":
          this.imageUrl = "img/cloud2.jpg";
        break;
        case "04":
          this.imageUrl = "img/cloud3.jpg";
        break;
        case "11":
          this.imageUrl = "img/thunder.jpg";
        break;
        case "13":
          this.imageUrl = "img/snow.png";
        break;
        case "50":
          this.imageUrl = "img/fog.jpg";
        break;
        case "09":
          this.imageUrl = "img/rain.jpg";
        break;
        case "10":
          this.imageUrl = "img/rain.jpg";
        break;

      }
      this.weatherR.nativeElement.innerHTML = this.data.weather[0].main;
      this.temp.nativeElement.innerHTML =  this.data.main.temp + "ºC";
      this.maxtemp.nativeElement.innerHTML =  this.data.main.temp_max + "ºC";
      this.mintemp.nativeElement.innerHTML =  this.data.main.temp_min + "ºC";
      this.hum.nativeElement.innerHTML =  this.data.main.humidity + "%";
      this.wind.nativeElement.innerHTML =  this.data.wind.speed + " m/s";

    }else{
      console.log("We don't have weather info yet!");
    }
  }

}
