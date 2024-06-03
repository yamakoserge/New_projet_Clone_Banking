import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from './../../services/company/company.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {

  bookings:any;

  constructor(
    private companyService: CompanyService,
    private notification: NzNotificationService,
  ){}

    ngOnInit(){
      this.getAllAdBookings();
    }

    getAllAdBookings(){
    this.companyService.getAllAdBookings().subscribe(res=>{
      console.log(res);
      this.bookings=res;
    })
  }

  changeBookingStatus(bookingId: number, status:string){
    this.companyService.changeBookingStatus(bookingId, status).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
      `Booking status changed succefully`,
      {nzDuration: 3000}
      );
      this.getAllAdBookings();
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
