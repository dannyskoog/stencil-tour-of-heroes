import { newSpecPage } from '@stencil/core/testing';
import { AppHeroDetail } from './app-hero-detail';

describe('app-hero-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHeroDetail],
      html: `<app-hero-detail></app-hero-detail>`,
    });
    expect(page.root).toEqualHtml(`
      <app-hero-detail>
        <mock:shadow-root>
        </mock:shadow-root>
      </app-hero-detail>
    `);
  });
});
