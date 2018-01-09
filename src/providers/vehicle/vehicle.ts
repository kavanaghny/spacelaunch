import { Injectable } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk'

@Injectable()
export class VehicleProvider {

  public message: any = "I'm new here";

  public vehicles:any[] = [];
  vehiclesegment: string;

  constructor(private backand: BackandService) {
    this.vehiclesegment = "";
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

  setMessage(message) {
    this.message = message;
  }

}
