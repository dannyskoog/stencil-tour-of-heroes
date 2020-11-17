import { newSpecPage } from '@stencil/core/testing';
import { AppDashboard } from './app-dashboard';

describe('app-dashboard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppDashboard],
      html: `<app-dashboard></app-dashboard>`,
    });
    expect(page.root).toEqualHtml(`
      <app-dashboard>
        <mock:shadow-root>
          <h3>Top Heroes</h3>
          <div class="grid grid-pad"></div>
          <app-hero-search></app-hero-search>
        </mock:shadow-root>
      </app-dashboard>
    `);
  });
});
