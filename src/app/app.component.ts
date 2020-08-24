import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyApMY-x___rSWlxzAuhQcIAg2cnyHWX2og",
  authDomain: "panic-39b0b.firebaseapp.com",
  databaseURL: "https://panic-39b0b.firebaseio.com",
  projectId: "panic-39b0b",
  storageBucket: "panic-39b0b.appspot.com",
  messagingSenderId: "903219411130",
  appId: "1:903219411130:web:c13643daf34fa5172f6a83",
  measurementId: "G-4Z3VCBNEDW"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
