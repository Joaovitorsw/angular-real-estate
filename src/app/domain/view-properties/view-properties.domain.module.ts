import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HotToastModule } from '@ngneat/hot-toast';
import { MediaIfWidgetModule } from 'app/widgets/directives/ng-if-media/media-if-widget.module';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { AddressCardComponent } from './dialogs/address-card/address-card.component';
import { ViewPropertiesPage } from './pages/view-properties-page/view-properties.page';
import { ViewPropertiesDomainRoutingModule } from './view-properties-routing.module';

@NgModule({
  declarations: [
    ViewPropertiesPage,
    PropertyCardComponent,
    AddressCardComponent,
  ],
  imports: [
    CommonModule,
    ViewPropertiesDomainRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MediaIfWidgetModule,
    FormsModule,
    HotToastModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class ViewPropertiesDomainModule {}
