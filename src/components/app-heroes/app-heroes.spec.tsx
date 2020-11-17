import { newSpecPage } from '@stencil/core/testing';
import { AppHeroes } from './app-heroes';

describe('app-heroes', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHeroes],
      html: `<app-heroes></app-heroes>`,
    });

    expect(page.root).toEqualHtml(`
      <app-heroes>
        <mock:shadow-root>
          <h2>My Heroes</h2>
          <div>
            <label>
              Hero name:
              <input>
            </label>
            <button>add</button>
          </div>
          <ul class="heroes"></ul>
        </mock:shadow-root>
      </app-heroes>
    `);
  });
});
