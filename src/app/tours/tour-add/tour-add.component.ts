import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TourService} from '../../services/tour.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact-add',
  templateUrl: './tour-add.component.html',
  styleUrls: ['./tour-add.component.css']
})
export class TourAddComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  tour;
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
  constructor(private fb: FormBuilder, private service: TourService, private router: Router) { }

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

    console.log(this.registrationForm.value);
    this.addTour(formData);
  }

  addTour(form) {
    this.subscription = this.service.addTour(form).subscribe(data => {
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
