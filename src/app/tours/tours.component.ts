import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TourService} from '../services/tour.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogContentExampleDialogComponent} from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit, OnDestroy {
  subAdd: Subscription;
  subDelete: Subscription;
  tours: any;
  errorMessage = '';
  dialogRef: MatDialogRef<DialogContentExampleDialogComponent>;
  url = environment.url;

  constructor(private service: TourService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.getTours();
  }

  getTours() {
    this.subAdd = this.service.getTours()
      .subscribe(
        result => {
          this.tours = JSON.parse(JSON.stringify(result['data']));
          console.log(`result - ${this.tours}`);
        },
        error => {
          this.errorMessage = error;
          console.log(`Error - ${error}`);
        }
      );
    }

  onSelect(tour) {
    console.log(tour._id);
    const tourId = tour._id;
    this.router.navigate(['/tours/detail', tourId]);
    // this.router.navigate([tourId], {relativeTo: this.route});

  }

  addTour() {
    this.router.navigate(['tours/add']);
  }

  openDialog(tour) {
    this.dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.subDelete = this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.service.deleteTour(tour).subscribe((data) => {
            this.getTours();
          });
      }
      this.dialogRef = null;
      });
    }

  ngOnDestroy() {
    if (this.subAdd) {
      this.subAdd.unsubscribe();
    }
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}


