import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HousingLocation, SubmitData } from '../@types';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);

  applyForm = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }

  submitApplication = () => {
    const { email, firstName, lastName } = this.applyForm.value;

    this.housingService.submitApplication({
      email: email ?? '',
      firstName: firstName ?? '',
      lastName: lastName ?? '',
    });

    this.applyForm.reset();
  };
}
