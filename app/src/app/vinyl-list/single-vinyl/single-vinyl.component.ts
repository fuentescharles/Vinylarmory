import { Component, OnInit } from '@angular/core';
import { Vinyl } from '../../models/vinyl.model';

import { ActivatedRoute, Router } from '@angular/router';

import { VinylsService } from '../../services/vinyls.service';
@Component({
  selector: 'app-single-vinyl',
  templateUrl: './single-vinyl.component.html',
  styleUrls: ['./single-vinyl.component.scss']
})
export class SingleVinylComponent implements OnInit {

      vinyl: Vinyl;


      constructor(private route: ActivatedRoute, private vinylsService: VinylsService,

                  private router: Router) {}


      ngOnInit() {

        this.vinyl = new Vinyl('', '','');

        const id = this.route.snapshot.params['id'];

        this.vinylsService.getSingleVinyl(+id).then(

          (vinyl: Vinyl) => {

            this.vinyl = vinyl;

          }

        );

      }


      onBack() {

        this.router.navigate(['/vinyls']);

      }

    }
