import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html'
})
export class VehiclePage {

  public vehicles:any[] = [];
  vehiclesegment: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private backand: BackandService) {
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

  public openVehicleModal(characterNum) {

    let modal = this.modalCtrl.create(ModalVehiclePage, characterNum);
    modal.present();
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
      sort: [
        this.backand.helpers.sort.create('name', this.backand.helpers.sort.orders.asc),
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

@Component({
  templateUrl: 'vehiclemodal.html'
})

export class ModalVehiclePage {
  vehicleDetail;
  vehicleId: string;
  public vehicleDetails:any[] = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private backand: BackandService
  ) {
    let that = this;

    this.vehicleId = this.params.get('vehicleId');

    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.vehicleDetails.unshift(newItem);
      }
    );
  }

  public getVehicleDetails(mode:string) {

    this.vehicleId = mode;

    let params = {
      filter: [
        this.backand.helpers.filter.create('id', this.backand.helpers.filter.operators.text.equals, this.vehicleId),
      ]
    }

    this.backand.object.getList('vehicle', params)
    .then((res: any) => {
      this.vehicleDetails = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  ionViewDidLoad() {
    this.getVehicleDetails(this.vehicleId);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
