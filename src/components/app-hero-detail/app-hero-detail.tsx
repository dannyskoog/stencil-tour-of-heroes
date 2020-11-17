import { Component, ComponentInterface, Host, h, Prop, State } from '@stencil/core';
import { Hero } from "../app-heroes/hero";
import { MatchResults, RouterHistory } from "@stencil/router";
import { heroService } from "../../services/hero.service";

@Component({
  tag: 'app-hero-detail',
  styleUrl: 'app-hero-detail.css',
  shadow: true,
})
export class AppHeroDetail implements ComponentInterface {

  @Prop() match: MatchResults | undefined;
  @Prop() history: RouterHistory | undefined;

  @State() hero: Hero | undefined;

  componentWillLoad() {
    this.getHero();
  }

  async getHero() {
    const id = +this.match?.params.id!;
    this.hero = await heroService.getHero(id);
  }

  handleOnChange(event: Event) {
    const name = (event.target as HTMLInputElement).value
    this.hero = { ...this.hero!, name };
  }

  goBack() {
    this.history?.goBack();
  }

  async save() {
    await heroService.updateHero(this.hero!);
    this.goBack();
  }

  render() {
    return (
      <Host>
        {this.hero &&
          <div>
            <h2>{this.hero.name.toUpperCase()} Details</h2>
            <div><span>id: </span>{this.hero.id}</div>
            <div>
              <label>name:&nbsp;
                <input value={this.hero.name} onInput={(event) => this.handleOnChange(event)} placeholder="name"/>
              </label>
            </div>
            <button onClick={() => this.goBack()}>go back</button>
            <button onClick={() => this.save()}>save</button>
          </div>
        }
      </Host>
    );
  }

}
