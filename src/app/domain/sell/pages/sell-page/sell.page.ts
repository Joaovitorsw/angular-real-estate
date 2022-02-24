import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Address, Owner, PropertyResponse } from 'app';
import { PropertiesService } from 'app/services/properties/properties.service';
import {
  catchError,
  combineLatest,
  Observable,
  of,
  ReplaySubject,
  tap,
} from 'rxjs';
import { ViaCepResponse } from '../../services/check-cep/check-cep.models';
import { CheckCepService } from '../../services/check-cep/check-cep.service';

@Component({
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellPage implements OnInit {
  typesOptions = [
    'Duplex House',
    'Apartment',
    'House',
    'Family Farm',
    'Town House',
    'Studio',
  ];
  formGroup: FormGroup;
  fileName: string;
  hasUpload = false;
  file$ = new ReplaySubject<string>(1);
  cep$: Observable<ViaCepResponse>;

  constructor(
    private cepService: CheckCepService,
    private propertiesService: PropertiesService,
    private toast: HotToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.propertiesService.postProperty({ teste: null } as any).subscribe();
    this.createForm();
  }

  createForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, [
        Validators.pattern(/^[0-9]{5}-[0-9]{3}$/),
        Validators.required,
      ]),
      kindType: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      condominium: new FormControl(null),
      bedRooms: new FormControl(null, Validators.required),
      bathRooms: new FormControl(null, Validators.required),
      furnished: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
    });

    this.formGroup.controls['zipCode'].statusChanges.subscribe((status) => {
      if (status === 'INVALID') return;

      this.cepService
        .getCep(this.formGroup.controls['zipCode'].value)
        .pipe(
          catchError((error) => {
            this.formGroup.controls['zipCode'].setErrors({
              pattern: true,
            });
            return of(error);
          }),
          tap((response) => {
            if (response.erro) {
              this.formGroup.controls['zipCode'].setErrors({
                pattern: true,
              });
              return;
            }

            this.cep$ = of(response);
          })
        )
        .subscribe();
    });
  }

  submitForm() {
    if (this.formGroup.invalid || !this.hasUpload) {
      this.toast.error('Submit an image of your property');
      return;
    }

    const values = combineLatest([this.cep$, this.file$]);
    const formValue: {
      name: string;
      type: string;
      zipCode: string;
      kindType: string;
      value: number;
      condominium: number;
      bedRooms: number;
      bathRooms: number;
      furnished: boolean;
      area: number;
      image: string;
      owner: {
        name: string;
      };
    } = this.formGroup.value;
    const kindType = formValue.kindType === 'sale';

    values.subscribe(([address, image]) => {
      const name = `${formValue.type} for ${kindType ? 'sale' : 'rent'} in ${
        address.bairro
      }`;

      const propertyAddress: Partial<Address> = {
        street: address.logradouro,
        district: address.bairro,
        city: address.localidade,
        state: address.uf,
        postalCode: address.cep,
      };

      const propertyOwner: Partial<Owner> = {
        name: formValue.name,
      };
      const newProperty: PropertyResponse = {
        type: formValue.type,
        address: propertyAddress,
        rent: !kindType,
        sale: kindType,
        name: name,
        value: formValue.value,
        condominium: formValue.condominium,
        bedrooms: formValue.bedRooms,
        bathrooms: formValue.bathRooms,
        furnished: formValue.furnished,
        area: formValue.area,
        image: image,
        dateAnnouncement: new Date().toISOString(),
        owner: propertyOwner,
      };

      this.propertiesService.postProperty(newProperty).subscribe((response) => {
        if (response) {
          this.toast.success('Property created successfully');
          this.router.navigate(['/']);
        }
      });
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.fileName = file.name;

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const dataString = event.target?.result as string;
      this.hasUpload = true;
      this.file$.next(dataString);
    };

    fileReader.readAsDataURL(file);
  }
}
