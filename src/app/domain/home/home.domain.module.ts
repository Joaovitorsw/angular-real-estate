import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ShowValidationErrorWidgetModule } from 'app/widgets/directives/show-validation-error/show-validation-error-widget.module';
import { HomeDomainRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home-page/home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    HomeDomainRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ShowValidationErrorWidgetModule,
  ],
})
export class HomeDomainModule {}
