import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-spaceport',
  templateUrl: 'spaceport.html'
})
export class SpaceportPage {

  public items:any[] = [];
  searchQuery: string;

  constructor(public navCtrl: NavController, private backand: BackandService) {
    this.searchQuery = '';
    let that = this;
    this.backand.on("items_updated",
      (res: any) => {
        let a = res as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.items.unshift(newItem);
      }
    );
  }

  public getItems() {
   this.backand.object.getList('spaceport')
    .then((res: any) => {
      this.items = res.data;
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

    this.backand.object.getList('spaceport', params)
    .then((res: any) => {
      this.items = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  ionViewDidLoad() {
    this.getItems()
  }

}
