import { newSpecPage } from '@stencil/core/testing';
import { AppHeroSearch } from './app-hero-search';

describe('app-hero-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHeroSearch],
      html: `<app-hero-search></app-hero-search>`,
    });
    expect(page.root).toEqualHtml(`
      <app-hero-search>
        <mock:shadow-root>
          <div id="search-component">
            <h4>
              <label htmlfor="search-box">
                Hero Search
              </label>
            </h4>
            <input id="search-box" value="">
            <ul class="search-result"></ul>
          </div>
        </mock:shadow-root>
      </app-hero-search>
    `);
  });
});
