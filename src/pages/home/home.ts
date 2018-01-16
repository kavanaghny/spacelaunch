import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventPage } from '../event/event';
import { SpaceportPage } from '../spaceport/spaceport';
import { VehiclePage } from '../vehicle/vehicle';

import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public events:any[] = [];
  public vehicles:any[] = [];
  public spaceports:any[] = [];

  constructor(public navCtrl: NavController, private backand: BackandService) {
  
    let that = this;

    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.events.unshift(newItem);
        that.vehicles.unshift(newItem);
        that.spaceports.unshift(newItem);
      }
    );
  }

  public getEvents() {

    this.backand.object.getList('event')
    .then((res: any) => {
      this.events = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  public getVehicles() {

    this.backand.object.getList('vehicles')
    .then((res: any) => {
      this.vehicles = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  public getSpaceports() {

    this.backand.object.getList('spaceport')
    .then((res: any) => {
      this.spaceports = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  ionViewDidLoad() {
    // this.getEvents();
    // this.getVehicles();
    // this.getSpaceports();
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
