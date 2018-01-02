import { Component } from '@angular/core';
import { EventPage } from '../event/event';
import { NavController } from 'ionic-angular';
import { SpaceportPage } from '../spaceport/spaceport';
import { VehiclePage } from '../vehicle/vehicle';
import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public vehicles:any[] = [];
  searchQuery: string;

  constructor(public navCtrl: NavController, private backand: BackandService) {
    this.searchQuery = '';
    let that = this;
    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.vehicles.unshift(newItem);
      }
    );
  }

  public getVehicles() {
   this.backand.object.getList('vehicle')
    .then((res: any) => {
      this.vehicles = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  public filterItems() {
    // set q to the value of the searchbar
    var q = this.searchQuery;

    // if the value is an empty string don't filter the items
    if (!q || q.trim() == '') {
      return;
    }
    else{
        q = q.trim();
    }


    let params = {
      filter: [
        this.backand.helpers.filter.create('name', this.backand.helpers.filter.operators.text.contains, q),
      ],
    }

    this.backand.object.getList('vehicle', params)
    .then((res: any) => {
      this.vehicles = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
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

//  ionViewDidLoad() {
//    this.getVehicles()
//  }

}
