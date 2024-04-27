import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})
export class CreateAdComponent {

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
  private notification: NzNotificationService,
  private CompanyService: CompanyService,
  private router: Router,){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
  }

  onFileSelected(event:any){
    const reader = new FileReader();
    reader.onload =() =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  postAd(){
    const formData: FormData = new FormData();

    formData.append('img', this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    this.CompanyService.postAd(formData).subscribe(res =>{
      this.notification
      .success(
        `SUCCESS`,
        `Ad Posted Successfullyl`,
        {nzDuration: 5000}
      );
      this.router.navigateByUrl('/company/ads');
    }, error =>{
      this.notification
      .error(
        `ERROR`,
        `${error.error}`,
        {nzDuration:5000}
      )
    })
  }

}