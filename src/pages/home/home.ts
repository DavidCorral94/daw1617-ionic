import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Weather } from '../../providers/weather';
import { Vibration } from '@ionic-native/vibration';
import { InfoPage } from '../../pages/info/info';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  data: any;

  @ViewChild('city') city: ElementRef;
  @ViewChild('weather') weatherR: ElementRef;
  @ViewChild('temp') temp: ElementRef;
  @ViewChild('maxtemp') maxtemp: ElementRef;
  @ViewChild('mintemp') mintemp: ElementRef;

  degreeStr: string = ' degrees (F)';
  //an empty object (for now) to store our location data passed to the API
  currentLoc: any = {};
  //current weather items array
  c_items: Array<any> = [];


  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public platform: Platform,
    public weather: Weather,
    private vibration: Vibration
  ) {

  }

  navigationLink() {
      this.navCtrl.push(InfoPage, this.data);
   }

  ionViewDidLoad() {
    this.loadMap();
    //Once the main view loads
    //and after the platform is ready...
    this.platform.ready().then(() => {
      //Setup a resume event listener
      document.addEventListener('resume', () => {
        //Get the local weather when the app resumes
        this.getLocation();
      });
      //Populate the form with the current location data
      this.getLocation();
    });
  }

  loadMap() {

    let latLng = new google.maps.LatLng(37.3582106, -5.9870385);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.addListener('click', (e) => {
      console.log("Clicking on " + e.latLng.lat() + " ; " + e.latLng.lng());
      let latLngloc = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position:  latLngloc
      });
      marker.addListener('click', function() {
          this.map.setZoom(17);
          this.map.setCenter(marker.getPosition());
      });
      this.map.setCenter(marker.getPosition());
      this.map.setZoom(17);
      this.showCurrent(e.latLng.lat(), e.latLng.lng());
    });
  }

  refreshPage() {
    this.getLocation();
  }

  getLocation() {
    //Create the loading indicator
    let loader = this.loadingCtrl.create({
      content: "Retrieving current location..."
    });
    //Show the loading indicator
    loader.present();
    let locOptions = { 'maximumAge': 3000, 'timeout': 5000, 'enableHighAccuracy': true };
    Geolocation.getCurrentPosition(locOptions).then(pos => {
      this.currentLoc = { 'lat': pos.coords.latitude, 'long': pos.coords.longitude };
      console.log("Lat: " + pos.coords.latitude + " Long: " + pos.coords.longitude);
      let latLngloc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position:  latLngloc
      });
      marker.addListener('click', function() {
          this.map.setZoom(17);
          this.map.setCenter(marker.getPosition());
      });
      this.map.setCenter(marker.getPosition());
      this.map.setZoom(17);
      this.vibration.vibrate(1000);
      loader.dismiss();
      this.showCurrent(pos.coords.latitude,pos.coords.longitude);
    }).catch(e => {
      loader.dismiss();
      console.error('Unable to determine current location');
      if (e) {
        console.log('%s: %s', e.code, e.message);
        console.dir(e);
      }
    })
  }

showCurrent(lat, lng) {
  this.currentLoc = { 'lat': lat, 'long': lng };
  //clear out the previous array contents
  this.c_items = [];
  //Create the loading indicator
  let loader = this.loadingCtrl.create({
    content: "Retrieving current weather..."
  });
  //Show the loading indicator
  loader.present();
  this.weather.getCurrent(this.currentLoc).then(
    data => {
      //Hide the loading indicator
      loader.dismiss();
      //Now, populate the array with data from the weather service
      if (data) {
        //We have data, so lets do something with it
        this.data = data;
        this.loadData(data);
        //this.c_items = this.formatWeatherData(data);
      } else {
        //This really should never happen
        console.error('Error retrieving weather data: Data object is empty');
      }
    },
    error => {
      //Hide the loading indicator
      loader.dismiss();
      console.error('Error retrieving weather data');
      console.dir(error);
      this.showAlert(error);
    }
  );
}

loadData(data) {
  this.city.nativeElement.innerHTML = " | " + data.name;
  this.weatherR.nativeElement.innerHTML = data.weather[0].main;
  this.temp.nativeElement.innerHTML =  data.main.temp + "ºC";
  this.maxtemp.nativeElement.innerHTML =  data.main.temp_max + "ºC";
  this.mintemp.nativeElement.innerHTML =  data.main.temp_min + "ºC";
}

showAlert(message: string) {
  let alert = this.alertController.create({
    title: 'Error',
    subTitle: 'Source: Weather Service',
    message: message,
    buttons: [{ text: 'Sorry' }]
  });
  alert.present();
}

}
