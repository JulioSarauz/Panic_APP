import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {
  user: string = "";
  msm: string = "";
  USER: string = "";
  fecha: string = "";
  contenido = [];

  constructor(public navCtrl:NavController, private router:Router, private vibration: Vibration, private storage: Storage) {
    this.getAlertas();
    this.getUser();
   }
   ngOnInit() {
    this.getUser();
  }
  ionViewWillEnter(){
    this.getUser();
  } 

  Salir(){
    this.storage.clear();
    this.router.navigate(['/home']);
  }

  getUser(){
    this.storage.get('user').then((val) => {
      this.USER = val; 
    });
  }

  getAlertas(){
    var alertRef = firebase.database().ref().child("alertas");
    alertRef.on("value",(snap)=>{
        var data = snap.val();
        this.contenido = [];
        for(var key in data){
          this.contenido.push(data[key]);
        }
        this.vibration.vibrate(1000);
    });
  }

  sendAlertas(){
    var hoy = new Date();
    this.fecha=""+hoy;
    var alertRef = firebase.database().ref().child("alertas");
    if(this.msm == ""){
      this.msm = "¡ALERTA!";
    }
    console.log(hoy);
    alertRef.push({msm:this.msm,name:this.USER,fecha:this.fecha});
  }


}
