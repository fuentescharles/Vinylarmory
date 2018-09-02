import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
constructor () {
    var config = {
   apiKey: "AIzaSyAwVnMyOlkz0XO50Z3uJtDGIv0bu_MVVfA",
   authDomain: "vinylarmory.firebaseapp.com",
   databaseURL: "https://vinylarmory.firebaseio.com",
   projectId: "vinylarmory",
   storageBucket: "gs://vinylarmory.appspot.com",
   messagingSenderId: "609943103263"
 };
 firebase.initializeApp(config);

}
}
