import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Vinyl } from '../models/vinyl.model';
import * as firebase from 'firebase';


@Injectable()
export class VinylsService {

    vinyls: Vinyl[] = [];
     vinylsSubject = new Subject<Vinyl[]>();

     emitVinyls() {
       this.vinylsSubject.next(this.vinyls);
     }
     saveVinyls() {

    firebase.database().ref('/vinyls').set(this.vinyls);

}

   getVinyls() {

       firebase.database().ref('/vinyls').orderByChild('title') // orderByChild ne fonctionne pas ...

         .on('value', (data) => {

             this.vinyls = data.val() ? data.val() : [];

             this.emitVinyls();

           }

         );

     }


     getSingleVinyl(id: number) {

       return new Promise(

         (resolve, reject) => {

           firebase.database().ref('/vinyls/' + id).once('value').then(

             (data) => {

               resolve(data.val());

             }, (error) => {

               reject(error);

             }

           );

         }

       );

     }
     createNewVinyl(newVinyl: Vinyl) {

    this.vinyls.push(newVinyl);

    this.saveVinyls();

    this.emitVinyls();

  }


  removeVinyl(vinyl: Vinyl) {
      if(vinyl.pochette) {
      const storageRef = firebase.storage().refFromURL(vinyl.pochette);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }

    const vinylIndexToRemove = this.vinyls.findIndex(

      (vinylEl) => {

        if(vinylEl === vinyl) {

          return true;

        }

      }

    );

    this.vinyls.splice(vinylIndexToRemove, 1);

    this.saveVinyls();

    this.emitVinyls();

  }

  uploadFile(file: File) {

    return new Promise(

      (resolve, reject) => {

        const almostUniqueFileName = Date.now().toString();

        const upload = firebase.storage().ref().child('images/' + almostUniqueFileName + file.name).put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,

          () => {

            console.log('Chargement…');

          },

          (error) => {

            console.log('Erreur de chargement ! : ' + error);

            reject();

          },

          () => {

            resolve(upload.snapshot.ref.getDownloadURL());

          }

        );

      }

    );

}




 }
