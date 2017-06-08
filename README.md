# DAW1617-Ionic
This is the final project presented by David Corral for the Ionic task in the subject DAW 2016/17. It is builded on Ionic 2 and uses Google Maps and OpenWeather API. Also it has geolocation.

This app has been tested on Android and Web. In order to make it run, first you have to set your own API Keys:
* In [/src/providers/weather.ts](https://github.com/Davidcorral94/daw1617-ionic/blob/master/src/providers/weather.ts) line 9 you have to set your OpenWeather API Key.
* In [/src/index.html](https://github.com/Davidcorral94/daw1617-ionic/blob/master/src/index.html) line 18 you have to set your Google Maps API Key.
* In [/www/index.html](https://github.com/Davidcorral94/daw1617-ionic/blob/master/www/index.html) line 18 you have to set your Google Maps API Key.

Then, you will be able to run it:
1. `ionic serve` to run the app in your browser.
2. `ionic run android` to run the app in your Android device.

![Main interface](https://i.gyazo.com/09cf1939f587906663d5d24a6a896754.png)
*Figure 1 - Main interface*

![Weather details](https://i.gyazo.com/2441889a21047eda9a6129e0ca450cba.png)
*Figure 2 - Weather details*
