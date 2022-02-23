import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
