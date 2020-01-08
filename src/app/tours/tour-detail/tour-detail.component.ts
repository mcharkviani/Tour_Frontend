import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TourService} from '../../services/tour.service';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css'],
})
export class TourDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  tour: any;
  tourId: string;
  url = environment.url;

  constructor(private route: ActivatedRoute, private service: TourService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.tourId = param.get('id');
    });
    this.getTour();
  }
  getTour() {
    this.subscription = this.service.getTour(this.tourId).subscribe(
      result => {
        console.log(result);
        const res = JSON.stringify(result);
        console.log(`${res}`);
        console.dir(`Result from Service ${result}`);
        this.tour = result;
        console.log('tour - ' + this.tour);
    },
      error => {
          console.log(error);
      });
  }

  goBack() {
    this.router.navigate(['/tours']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
