import { createStore } from "@stencil/store";

interface Store {
  messages: string[]
}

export const store = createStore<Store>({
  messages: []
});
