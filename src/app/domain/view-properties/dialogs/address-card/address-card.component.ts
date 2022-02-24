import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'app';

@Component({
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public address: Address) {}
}
