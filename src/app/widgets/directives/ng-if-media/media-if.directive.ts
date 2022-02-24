import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, startWith, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[reMediaIf]',
})
export class MediaIfDirective<T> implements OnInit, OnDestroy {
  @Input('reMediaIf') size: number;
  @Input('reMediaIfMode') mode: 'gt' | 'lt';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<T>,
    private readonly viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const initialInnerWidth = window.innerWidth;

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$), startWith(initialInnerWidth))
      .subscribe(() => {
        const innerWidth = window.innerWidth;
        const shouldHide =
          this.mode === 'gt'
            ? innerWidth <= this.size
            : innerWidth >= this.size;
        if (shouldHide) return this.viewContainer.clear();

        const hasAlreadyAttached = this.viewContainer.length > 0;
        if (hasAlreadyAttached) return;

        this.viewContainer.createEmbeddedView(this.templateRef);
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
