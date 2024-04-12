import { Component } from '@angular/core';
import {  FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  

})
export class LoginComponent {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private route: Router,
  ){}

 ngOnInit(){
  this.validateForm = this.fb.group({
    userName : [null, [Validators.required]],
    password : [null, [Validators.required]],
  })
 } 
 


  submitForm(){
   this.authService.login(this.validateForm.get(['userName'])!.value, this.validateForm.get(['password'])!.value)
   .subscribe(res=>{
   console.log(res)
   },error=>{
     this.notification
     .error(
      'ERREUR',
      `Veuillez réessayer, SVP.`,
       {nzDuration:5000}
     )
   })
 }

//  async submitForm() {
//   try {
//     const { userName, password } = this.validateForm.value;
//     const res = await this.authService.login(userName, password).toPromise();
//     console.log(res);
//   } catch (error) {
//     this.notification.error('ERROR', `Réessayez SVP`, { nzDuration: 5000 });
//   }
// }



}
