import { Component, OnInit } from '@angular/core';
import {TourService} from '../../services/tour.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from '../../shared/validators/name.validator';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit {
  tour: any;
  registrationForm: any;
  reactiveForm: FormGroup;
  tourId: any;

  constructor(private service: TourService, private fb: FormBuilder, private route: ActivatedRoute) {}

  // registrationForm = this.fb.group({
  //   firstName: [this.contact.firstName, [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
  //   lastName: [this.contact.lastName, [Validators.required]]
  // });

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.tourId = param.get('id');
    });

    this.service.getTour(this.tourId).subscribe(
      result => {
        console.log(result['data']);
        const res = JSON.stringify(result['data']);
        console.log(`${res}`);
        console.log(`Result from Service ${result['data']}`);
        this.tour = result['data'];
        console.log('contact - ' + this.tour);
      },
      error => {
        console.log(error);
      });

    // this.getContact();
    // this.registrationForm = this.fb.group({
    //   firstName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
    //   lastName: ['', [Validators.required]]
    // });
    // this.registrationForm.setValue({
    //   firstName: this.contact.firstName,
    //   lastName: this.contact.lastName
    // });
    console.log('contact = ' + this.tour);

    this.createForm(this.tour);
  }

  createForm(data: any) {
    console.log('data - ' + data);
    this.registrationForm = this.fb.group({
      firstName: [data ? data.firstName.value : null, [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      lastName: [data ? data.lastName.value : null, [Validators.required]]
    });
  }

  getContact() {
    this.service.getTour(this.tourId).subscribe(
      result => {
        console.log(result['data']);
        const res = JSON.stringify(result['data']);
        console.log(`${res}`);
        console.log(`Result from Service ${result['data']}`);
        this.tour = res;
        console.log('contact - ' + this.tour);
      },
      error => {
        console.log(error);
      });
  }

  // updateContact(id: any) {
  //   this.service.updateContact()
  // }
  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
