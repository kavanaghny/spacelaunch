import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventPage } from '../event/event';
import { SpaceportPage } from '../spaceport/spaceport';
import { VehiclePage } from '../vehicle/vehicle';

import { VehicleProvider } from '../../providers/vehicle/vehicle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchQuery: string;

  constructor(public navCtrl: NavController, private vehicleProvider: VehicleProvider) {
  }

  goToEventPage() {
    this.navCtrl.push(EventPage);
  }

  goToVehiclePage() {
    this.navCtrl.push(VehiclePage);
  }

  goToSpaceportPage() {
    this.navCtrl.push(SpaceportPage);
  }

  ionViewDidLoad() {
   // this.vehicleProvider.getVehicles();
  }
}
