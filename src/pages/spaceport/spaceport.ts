import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'

@Component({
  selector: 'page-spaceport',
  templateUrl: 'spaceport.html'
})
export class SpaceportPage {

  public spaceports:any[] = [];
  spaceportsegment: string;

  constructor(public navCtrl: NavController, private backand: BackandService) {
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
