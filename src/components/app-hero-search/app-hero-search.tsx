import { Component, ComponentInterface, Host, h, State } from '@stencil/core';
import { heroService } from "../../services/hero.service";
import { Hero } from "../app-heroes/hero";

@Component({
  tag: 'app-hero-search',
  styleUrl: 'app-hero-search.css',
  shadow: true,
})
export class AppHeroSearch implements ComponentInterface {

  @State() heroes: Hero[] | undefined;
  @State() searchTerm = '';

  activeIntervalId: NodeJS.Timeout | undefined;

  search(event: Event): void {
    const oldTerm = this.searchTerm;
    const newTerm = (event.target as HTMLInputElement).value;

    if (oldTerm === newTerm)
      return;

    this.searchTerm = newTerm;

    if (this.activeIntervalId)
      clearTimeout(this.activeIntervalId);

    this.activeIntervalId = setTimeout(async () => {
      this.activeIntervalId = undefined;
      this.heroes = await heroService.searchHeroes(newTerm);
    }, 300);

  }

  render() {
    return (
      <Host>
        <div id="search-component">
          <h4><label htmlFor="search-box">Hero Search</label></h4>
            <input id="search-box" value={this.searchTerm} onInput={event => this.search(event)} />
            <ul class="search-result">
              {this.heroes?.map(hero =>
                <li>
                  <stencil-route-link url={`/detail/${hero.id}`}>{hero.name}</stencil-route-link>
                </li>
              )}
            </ul>
        </div>
      </Host>
    );
  }

}
