import { UserStorageService } from './../../../basic/components/services/storage/user-storage.service';
import { ClientService } from './../../services/client.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  bookId : number = this.activatedRoute.snapshot.params['id'];
  validateForm!: FormGroup;

  
  

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router, 
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        rating: [null, Validators.required],
        review: [null, Validators.required]
      })
    }

    giveReview(){
      const reviewDTO = {
        rating: this.validateForm.get("rating").value,
        review:this.validateForm.get("review").value,
        userId: UserStorageService.getUserId(),
        bookId: this.bookId
      }

      this.clientService.giveReview(reviewDTO).subscribe
      (res=>{
        this.notification
        .success(
          'SUCCESS',
          `Review posteed succefully`,
          {nzDuration: 3000 }
        );
        this.router.navigateByUrl("/client/bookings");
      },error=>{
        this.notification
        .error(
          'ERROR',
          `${error.message}`,
          {nzDuration:3000}
        )
      })
    }
    


}
