import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vinyl } from '../../models/vinyl.model';
import { VinylsService } from '../../services/vinyls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vinyl-form',
  templateUrl: './vinyl-form.component.html',
  styleUrls: ['./vinyl-form.component.scss']
})
export class VinylFormComponent implements OnInit {

      vinylForm: FormGroup;
      fileIsUploading = false;

      fileUrl: string;

      fileUploaded = false;


      constructor(private formBuilder: FormBuilder, private vinylsService: VinylsService,

                  private router: Router) { }



      ngOnInit() {

        this.initForm();

      }



      initForm() {

        this.vinylForm = this.formBuilder.group({

          title: ['', Validators.required],

          groupe: ['', Validators.required],

          style: ['']

        });

      }

      onUploadFile(file: File) {

    this.fileIsUploading = true;

    this.vinylsService.uploadFile(file).then(

      (url: string) => {

        this.fileUrl = url;

        this.fileIsUploading = false;

        this.fileUploaded = true;

      }

    );

    }

      onSaveVinyl() {

        const title = this.vinylForm.get('title').value;

        const groupe = this.vinylForm.get('groupe').value;

        const style = this.vinylForm.get('style').value;

        const newVinyl = new Vinyl(title, groupe,style);



        if(this.fileUrl) {

         newVinyl.pochette = this.fileUrl;

    }

        this.vinylsService.createNewVinyl(newVinyl);

        this.router.navigate(['/vinyls']);

      }

detectFiles(event) {

    this.onUploadFile(event.target.files[0]);

}

    }
