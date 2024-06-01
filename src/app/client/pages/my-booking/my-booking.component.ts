import { ClientService } from './../../services/client.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent {

  bookedServices:any;

  constructor(
private clientService: ClientService,
  ){}

  ngOnInit(){
    this.getMyBookings();
  }
  
  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res=>{
      this.bookedServices = res;
    })
    
  }


}
