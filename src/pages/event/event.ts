import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

// import { ModalSpaceportPage } from '../spaceport/spaceport';

import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {

  public events:any[] = [];
  eventsegment: string;
  eventCompleted: string;
  searchQuery: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private backand: BackandService) {
    this.eventsegment = "future";
    this.searchQuery = '';
    let that = this;
    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.events.unshift(newItem);
      }
    );
  }

  public openEventModal(characterNum) {

    let modal = this.modalCtrl.create(ModalEventPage, characterNum);
    modal.present();
  }

  public getEvents(mode:string) {
   
    this.eventsegment = mode;
  
    switch (this.eventsegment) {
      case 'future': {
        this.eventCompleted = "false";
        break; 
      } 
      case 'current': {
        this.eventCompleted = "almost";
        break;
      }
      case 'past': {
        this.eventCompleted = "true";
        break;
      }
    }

    let params = {
      filter: [
        this.backand.helpers.filter.create('completed', this.backand.helpers.filter.operators.text.contains, this.eventCompleted),
      ],
      sort: [
        this.backand.helpers.sort.create('launchdate', this.backand.helpers.sort.orders.asc),
      ],
    }

    this.backand.object.getList('event', params)
    .then((res: any) => {
      this.events = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  public filterEvents(mode:string) {

    this.eventsegment = mode;

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
      sort: [
        this.backand.helpers.sort.create('launchdate', this.backand.helpers.sort.orders.asc),
      ],
    }

    this.backand.object.getList('event', params)
    .then((res: any) => {
      this.events = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  ionViewDidLoad() {
    this.getEvents(this.eventsegment);
  }

}

@Component({
  templateUrl: 'eventmodal.html'
})

export class ModalEventPage {
  eventDetail;
  eventId: string;
  spaceportId;
  public eventDetails:any[] = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private backand: BackandService
  ) {
    let that = this;
    
    this.eventId = this.params.get('eventId');
    
    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.eventDetails.unshift(newItem);
      }
    );
  }

  public getEventDetails(mode:string) {

    this.eventId = mode;

    let params = {
      filter: [
        this.backand.helpers.filter.create('id', this.backand.helpers.filter.operators.text.equals, this.eventId),
      ]
    }

    this.backand.object.getList('event', params)
    .then((res: any) => {
      this.eventDetails = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  ionViewDidLoad() {
    this.getEventDetails(this.eventId);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToSpaceportModal() {
    this.viewCtrl.dismiss();
    // this.navCtrl.push(ModalSpaceportPage());
  }

}

