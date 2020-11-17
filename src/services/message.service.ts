import { store } from "../utils/store";

class MessageService {

  add(message: string) {
    store.state.messages = [...store.state.messages, message];
  }

  clear() {
    store.state.messages = [];
  }

}

export const messageService = new MessageService();
