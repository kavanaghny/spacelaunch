import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import io from 'socket.io-client';
window["io"] = io;

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { CrudPage } from '../pages/crud/crud';
import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/event/event';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SpaceportPage } from '../pages/spaceport/spaceport';
import { TabsPage } from '../pages/tabs/tabs';
import { VehiclePage } from '../pages/vehicle/vehicle';

import { BackandService } from '@backand/angular2-sdk';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// In App Login only
import { GooglePlus } from '@ionic-native/google-plus';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// Facebook login for Ionic web shared in Facebook
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    CrudPage,
    EventPage,
    HomePage,
    LoginPage,
    SignupPage,
    SpaceportPage,
    TabsPage,
    VehiclePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FacebookModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    CrudPage,
    EventPage,
    HomePage,
    LoginPage,
    SignupPage,
    SpaceportPage,
    TabsPage,
    VehiclePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackandService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    Facebook
  ]
})
export class AppModule {}
