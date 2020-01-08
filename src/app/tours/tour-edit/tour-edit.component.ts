import {Component, OnDestroy, OnInit} from '@angular/core';
import {TourService} from '../../services/tour.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit, OnDestroy {
  url = environment.url;
  subGet: Subscription;
  subEdit: Subscription;
  tour;
  tourId;
  selectedFile: File = null;

  get companyName() {
    return this.registrationForm.get('company');
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get country() {
    return this.registrationForm.get('country');
  }
  get address() {
    return this.registrationForm.get('address');
  }
  get description() {
    return this.registrationForm.get('description');
  }
  get price() {
    return this.registrationForm.get('price');
  }
  get rating() {
    return this.registrationForm.get('rating');
  }
  get image() {
    return this.registrationForm.get('image');
  }
  constructor(private fb: FormBuilder, private service: TourService, private route: ActivatedRoute, private router: Router) { }

  registrationForm = this.fb.group({
    company: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(9)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(2)]],
    country: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required, Validators.pattern(/^[+-]?\d+(\.\d+)?$/)]],
    rating: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.tourId = param.get('id');
    });
    this.getTour();
  }

  getTour() {
    this.subGet = this.service.getTour(this.tourId).subscribe(
      result => {
        this.tour = result;
        console.log('tour - ' + this.tour);

        this.registrationForm.get('company').setValue(this.tour.company);
        this.registrationForm.get('phone').setValue(this.tour.phone);
        this.registrationForm.get('email').setValue(this.tour.email);
        this.registrationForm.get('address').setValue(this.tour.address);
        this.registrationForm.get('country').setValue(this.tour.country);
        this.registrationForm.get('description').setValue(this.tour.description);
        this.registrationForm.get('price').setValue(this.tour.price);
        this.registrationForm.get('rating').setValue(this.tour.rating);
        this.registrationForm.get('image').setValue(this.tour.image);
      },

      error => {
        console.log(error);
      });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('company', this.companyName.value);
    formData.append('phone', this.phone.value);
    formData.append('email', this.email.value);
    formData.append('address', this.address.value);
    formData.append('country', this.country.value);
    formData.append('description', this.description.value);
    formData.append('price', this.price.value);
    formData.append('rating', this.rating.value);
    formData.append('image', this.image.value);

    console.log( 'formData', formData);

    console.log('form', this.registrationForm.value);
    this.editTour(this.tourId, formData);
  }

  editTour(form, id) {
    this.subGet = this.service.updateTour(form, id).subscribe(data => {
        this.tour = data;
        console.log(data);
        this.router.navigate(['/tours']);
      },
      error => {
        console.log('Error -', error);
      });
  }

  onFile(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.registrationForm.get('image').setValue(this.selectedFile);
    }
  }

  ngOnDestroy() {
    if (this.subGet) {
      this.subGet.unsubscribe();
    }
    if (this.subEdit) {
      this.subEdit.unsubscribe();
    }
  }
}
