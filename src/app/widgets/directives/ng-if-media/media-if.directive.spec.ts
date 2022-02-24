import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { MediaIfWidgetModule } from './media-if-widget.module';

describe('NgIfMediaDirective', () => {
  it('should render then window media for greater than 510px', async () => {
    const TEMPLATE_TEST = ` 
    <div *reMediaIf="510; mode 'gt'">
    <span data-testid="gt-510">Greater than 510</span>
    <div>
    `;
    window.innerWidth = 520;
    await render(TEMPLATE_TEST, {
      imports: [MediaIfWidgetModule],
    });

    const $span = screen.getByTestId('gt-510');
    console.log($span);
    expect($span.innerText).toEqual('Greater than 510');
  });

  it('should render then window media less than 510px', async () => {
    window.innerWidth = 500;
    const TEMPLATE_TEST = `
    <div *reMediaIf="510; mode 'lt'">
    <span data-testid="gt-510">Less than 510</span>
    <div>
    `;
    await render(TEMPLATE_TEST, {
      imports: [MediaIfWidgetModule],
    });

    const $span = screen.getByTestId('gt-510');
    expect($span.innerText).toEqual('Less than 510');
  });
});
