import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { CrudPage } from '../crud/crud';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { SpaceportPage } from '../spaceport/spaceport';
import { VehiclePage } from '../vehicle/vehicle';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = VehiclePage;
  tab5Root = SpaceportPage;
  tab6Root = EventPage;
  tab7Root = SignupPage;
  tab8Root = CrudPage;
  tab9Root = LoginPage;

  constructor() {

  }
}
