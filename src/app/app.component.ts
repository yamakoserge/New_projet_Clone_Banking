import { Component } from '@angular/core';
import { UserStorageService } from './basic/components/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'New_projet';

   isClientLoggIn: boolean =  UserStorageService.isClientLoggedIn();
   isCompanyLoggIn: boolean =  UserStorageService.isCompanyLoggedIn();

   constructor(private router: Router){}

  ngOnInit(){
   this.router.events.subscribe(event =>{
      this.isClientLoggIn = UserStorageService.isClientLoggedIn();
      this.isCompanyLoggIn = UserStorageService.isCompanyLoggedIn();
     })
   }

   logout(){
     UserStorageService.signOut();
     this.router.navigateByUrl('login')
   }
}
