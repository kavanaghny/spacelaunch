import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html'
})
export class VehiclePage {

  public vehicles:any[] = [];
  vehiclesegment: string;

  constructor(public navCtrl: NavController, private backand: BackandService) {
    this.vehiclesegment = "orbital";
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

  public filterVehicles(mode:string) {
    
    this.vehiclesegment = mode;   
    
    var q = mode;

    // if the value is an empty string don't filter the items
    if (!q || q.trim() == '') {
      return;
    }
    else{
        q = q.trim();
    }

    let params = {
      filter: [
        this.backand.helpers.filter.create('mode', this.backand.helpers.filter.operators.text.contains, q),
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

  ionViewDidLoad() {
    this.filterVehicles(this.vehiclesegment)
  }

}
