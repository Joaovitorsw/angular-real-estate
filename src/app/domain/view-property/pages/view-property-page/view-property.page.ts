import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './view-property.page.html',
  styleUrls: ['./view-property.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPropertyPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
