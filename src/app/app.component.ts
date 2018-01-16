import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { BackandService } from '@backand/angular2-sdk'

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

@Component({
  templateUrl: 'app.html'
})

// export class SpaceLaunchApp {}
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private backand: BackandService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      backand.init({
       appName: 'spacelaunch',
       SignUpToken: 'bada781d-e4b2-4f22-b7fd-45f284ba39e1',
       anonymousToken: '610adc88-56f5-4267-bb4d-7f88d1c0b23d',
       runSocket: true,
       mobilePlatform: 'ionic'
      });

    });
  }
}
