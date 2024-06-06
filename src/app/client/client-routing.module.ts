import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { ReviewComponent } from './pages/review/review.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'dashboard', component: ClientDashboardComponent },
  { path: 'bookings', component:  MyBookingComponent},
  { path: 'ad/:adId', component: AdDetailComponent },
  { path: 'review/:id', component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
