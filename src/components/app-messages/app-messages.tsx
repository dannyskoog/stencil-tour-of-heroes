import { Component, ComponentInterface, Host, h } from '@stencil/core';
import { messageService } from "../../services/message.service";
import { store } from "../../utils/store";

@Component({
  tag: 'app-messages',
  styleUrl: 'app-messages.css',
  shadow: true,
})
export class AppMessages implements ComponentInterface {

  render() {
    return (
      <Host>
        {!!store.state.messages.length &&
          <div>
            <h2>Messages</h2>
            <button class="clear" onClick={() => messageService.clear()}>clear</button>
            {store.state.messages.map(message => <div>{message}</div>)}
          </div>
        }
      </Host>
    );
  }

}
