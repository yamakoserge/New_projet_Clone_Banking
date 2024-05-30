import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent {
  
//*********************************************************** */

  // Propriétés du Composant

  adId:any = this.activatedroute.snapshot.params['id'];

    selectedFile: File | null;
    imagePreview: string | ArrayBuffer | null;
    validateForm!: FormGroup;
    existingImage: string | null = null;
    
    imgChanged= false;
    
    constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService,
    private activatedroute: ActivatedRoute,
    ){}
    //********************************************* */

  //Initialisation du Composant
  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]], // Ensure price is a valid number
    });
    this.getAdById();
  }
  
    //*************************************************** */
  
    //Sélection et Prévisualisation de Fichier

    onFileSelected(event:any){
      this.selectedFile=event.target.files[0];
      this.previewImage();
      this.existingImage = null;
      this.imgChanged = true;      
    }
    previewImage(){
      const reader = new FileReader();
      reader.onload=()=>{
        this.imagePreview=reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }
    //-*********************************************************

    //Mise à Jour de l'Annonce

    updateAd() {
      const formData: FormData = new FormData();
      if (this.imgChanged && this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
    
      const serviceName = this.validateForm.get('serviceName').value;
      const description = this.validateForm.get('description').value;
      const price = this.validateForm.get('price').value;
    
      if (typeof price !== 'number' || isNaN(price)) {
        this.notification.error('ERROR', 'Price must be a valid number', { nzDuration: 5000 });
        return;
      }
    
      formData.append('serviceName', serviceName);
      formData.append('description', description);
      formData.append('price', price.toString());
    
      this.companyService.updateAd(this.adId, formData).subscribe(res => {
        this.notification.success('SUCCESS', 'Ad Update Successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/company/ads');
      }, error => {
        this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
      });
    }
    //************************************************** */
    //Récupération des Détails de l'Annonce
    getAdById(){ 
      this.companyService.getAdById(this.adId).subscribe(res=>{
        console.log(res);
        this.validateForm.patchValue(res);
        this.existingImage = `data:image/jpeg;base64,` + res.returnedImg
      })
    }
}
