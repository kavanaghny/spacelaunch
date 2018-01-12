import { Component } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

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
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
