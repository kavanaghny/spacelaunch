import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-spaceport',
  templateUrl: 'spaceport.html'
})
export class SpaceportPage {

  public spaceports:any[] = [];
  spaceportsegment: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private backand: BackandService) {
    this.spaceportsegment = "North America";
    let that = this;
    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.spaceports.unshift(newItem);
      }
    );
  }

  public openSpaceportModal(characterNum) {

    let modal = this.modalCtrl.create(ModalSpaceportPage, characterNum);
    modal.present();
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

 public filterSpaceports(continent:string) {

    this.spaceportsegment = continent;

    var q = continent;

    // if the value is an empty string don't filter the items
    if (!q || q.trim() == '') {
      return;
    }
    else{
        q = q.trim();
    }


    let params = {
      filter: [
        this.backand.helpers.filter.create('continent', this.backand.helpers.filter.operators.text.contains, q),
      ],
      sort: [
        this.backand.helpers.sort.create('name', this.backand.helpers.sort.orders.asc),
      ],
    }
    this.backand.object.getList('spaceport', params)
    .then((res: any) => {
      this.spaceports = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  ionViewDidLoad() {
    this.filterSpaceports(this.spaceportsegment)
  }

}

@Component({
  templateUrl: 'spaceportmodal.html'
})

export class ModalSpaceportPage {
  spaceportDetail;
  spaceportId: string;
  public spaceportDetails:any[] = [];
  map: GoogleMap; 
 
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private backand: BackandService,
    private googleMaps: GoogleMaps
  ) {
    let that = this;
    
    this.spaceportId = this.params.get('spaceportId');
    
    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.spaceportDetails.unshift(newItem);
      } 
    );
  } 
  
  public getSpaceportDetails(mode:string) {
  
    this.spaceportId = mode;
    
    let params = {
      filter: [
        this.backand.helpers.filter.create('id', this.backand.helpers.filter.operators.text.equals, this.spaceportId),
      ] 
    } 
    
    this.backand.object.getList('spaceport', params)
    .then((res: any) => {
      this.spaceportDetails = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  } 
  
  ionViewDidLoad() {
    this.getSpaceportDetails(this.spaceportId);
    this.loadMap();
  } 
  
  dismiss() {
    this.viewCtrl.dismiss();
  } 

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }
} 
