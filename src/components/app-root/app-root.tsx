import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  title = 'Tour of heroes';

  render() {
    return (
      <Host>
        <h1>{this.title}</h1>
        <nav>
          <stencil-route-link url="/dashboard" exact={true} part="nav-link">Dashboard</stencil-route-link>
          <stencil-route-link url="/heroes" exact={true}>Heroes</stencil-route-link>
        </nav>
        <stencil-router titleSuffix=" - My App">
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" exact={true} routeRender={() => <stencil-router-redirect url="/dashboard"></stencil-router-redirect>} />
            <stencil-route url="/dashboard" component="app-dashboard" exact={true} />
            <stencil-route url="/detail/:id" component="app-hero-detail" exact={true} />
            <stencil-route url="/heroes" component="app-heroes" exact={true} />
          </stencil-route-switch>
        </stencil-router>
        <app-messages />
      </Host>
    );
  }
}
