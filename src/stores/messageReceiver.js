import { writable } from "svelte/store";

function createMessageReceiver() {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        next: (message) => set(message),
    }
}

export const messageReceiver = createMessageReceiver();
