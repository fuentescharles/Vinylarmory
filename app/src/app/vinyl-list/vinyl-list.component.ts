import { Component, OnDestroy, OnInit } from '@angular/core';

import { VinylsService } from '../services/vinyls.service';

import { Vinyl } from '../models/vinyl.model';

import { Subscription } from 'rxjs';

import { Router } from '@angular/router';


@Component({

  selector: 'app-vinyl-list',

  templateUrl: './vinyl-list.component.html',

  styleUrls: ['./vinyl-list.component.scss']

})

export class VinylListComponent implements OnInit, OnDestroy {


  vinyls: Vinyl[];

  vinylsSubscription: Subscription;


  constructor(private vinylsService: VinylsService, private router: Router) {}


  ngOnInit() {

    this.vinylsSubscription = this.vinylsService.vinylsSubject.subscribe(

      (vinyls: Vinyl[]) => {

        this.vinyls = vinyls;

      }

    );
    this.vinylsService.getVinyls();
    this.vinylsService.emitVinyls();

  }


  onNewVinyl() {

    this.router.navigate(['/vinyls', 'new']);

  }


  onDeleteVinyl(vinyl: Vinyl) {

    this.vinylsService.removeVinyl(vinyl);

  }


  onViewVinyl(id: number) {

    this.router.navigate(['/vinyls', 'view', id]);

  }




  ngOnDestroy() {

    this.vinylsSubscription.unsubscribe();

  }

}
