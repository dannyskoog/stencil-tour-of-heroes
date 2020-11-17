import { Component, ComponentInterface, Host, h, State } from '@stencil/core';
import { Hero } from "../app-heroes/hero";
import { heroService } from "../../services/hero.service";

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.css',
  shadow: true,
})
export class AppDashboard implements ComponentInterface {

  @State() heroes: Hero[] = [];

  async componentWillLoad() {
    this.getHeroes();
  }

  async getHeroes() {
    this.heroes = (await heroService.getHeroes()).slice(1, 5);
  }

  render() {
    return (
      <Host>
        <h3>Top Heroes</h3>
        <div class="grid grid-pad">
          {this.heroes.map(hero => (
            <stencil-route-link url={`detail/${hero.id}`} class="col-1-4">
              <div class="module hero">
                <h4>{hero.name}</h4>
              </div>
            </stencil-route-link>
          ))}
        </div>
        <app-hero-search></app-hero-search>
      </Host>
    );
  }

}
