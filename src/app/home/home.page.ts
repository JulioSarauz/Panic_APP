import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user:string="";
  pass:string="";
  contenido = [];
  constructor(private router:Router, private toastController: ToastController, private storage:Storage) {
  
  }


  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if(val != null){
        this.router.navigate(['/alerts']);
      }
    });
  }  

 Login(){

  var alertRef = firebase.database().ref().child("usuarios");
  alertRef.on("value",(snap)=>{
      var data = snap.val();
      this.contenido = [];
      for(var key in data){
        this.contenido.push(data[key]);
      }

      
      for (var c in this.contenido){
        if(this.user == this.contenido[c].name){
          if(this.pass == this.contenido[c].clave){
            this.storage.set('user', this.user);
            this.router.navigate(['/alerts']);
          }else{
            this.presentToast("Contraseña Incorrecta");
          }
        }
      }

      
  });
 }

 async presentToast(msm) {
  const toast = await this.toastController.create({
    message: msm,
    duration: 2000
  });
  toast.present();
}
}
