import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-card',
  imports: [],
  templateUrl: './address-card.html',
  styleUrl: './address-card.scss',
})
export class AddressCard {
  @Input() address: any;
}
