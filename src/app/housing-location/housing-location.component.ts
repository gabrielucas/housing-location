import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { HousingLocation } from '../@types';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.scss',
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
