import { Component } from '@angular/core';
import { EventPage } from '../event/event';
import { NavController } from 'ionic-angular';
import { SpaceportPage } from '../spaceport/spaceport';
import { VehiclePage } from '../vehicle/vehicle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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

}
