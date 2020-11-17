import { Component, ComponentInterface, Host, h, State } from '@stencil/core';
import { Hero } from "./hero";
import { heroService } from "../../services/hero.service";

@Component({
  tag: 'app-heroes',
  styleUrl: 'app-heroes.css',
  shadow: true,
})
export class AppHeroes implements ComponentInterface {

  @State() heroes: Hero[] | undefined;
  @State() heroName: string | undefined;

  componentWillLoad() {
    this.getHeroes();
  }

  async getHeroes() {
    this.heroes = await heroService.getHeroes();
  }

  async add(name: string) {
    name = name.trim();

    if (!name) { return; }
    const hero = await heroService.addHero({ name } as Hero);
    this.heroes = [...this.heroes!, hero];
  }

  delete(hero: Hero) {
    this.heroes = this.heroes!.filter(h => h !== hero);
    heroService.deleteHero(hero);
  }

  handleInput(event: Event) {
    this.heroName = (event.target as HTMLInputElement).value;
  }

  render() {
    return (
      <Host>
        <h2>My Heroes</h2>
        <div>
          <label>Hero name:
            <input value={this.heroName} onInput={(event) => this.handleInput(event)} />
          </label>
          <button onClick={() => { this.add(this.heroName!); this.heroName='' }}>
            add
          </button>
        </div>
        <ul class="heroes">
          {this.heroes?.map(hero =>
            <li>
              <stencil-route-link url={`/detail/${hero.id}`}>
                <span class="badge">{hero.id}</span> {hero.name}
              </stencil-route-link>
              <button class="delete" title="delete hero"
                onClick={() => this.delete(hero)}>x</button>
            </li>
          )}
        </ul>
      </Host>
    );
  }

}
