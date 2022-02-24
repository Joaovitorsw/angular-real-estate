import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Property } from '@real-estate/domain';
import { AddressCardComponent } from '../../dialogs/address-card/address-card.component';

@Component({
  selector: 're-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCardComponent {
  @Input() property: Property;
  @Output('buy') action = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddressCardComponent, {
      data: this.property.address,
    });
  }
}
