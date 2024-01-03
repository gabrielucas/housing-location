import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocation } from '../../@types';
import { HousingService } from '../../housing.service';
import { HousingLocationComponent } from '../../components/housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterHousingLocationsByCity(city: string) {
    if (!city) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    const filteredHousingLocations = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(city.toLowerCase())
    );

    this.filteredLocationList = filteredHousingLocations;
  }
}
