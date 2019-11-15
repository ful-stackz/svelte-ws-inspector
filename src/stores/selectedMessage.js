import { writable } from 'svelte/store';

function createSelectedMessageStore() {
    const { subscribe, set } = writable(null);

    return { subscribe, set };
}

export const selectedMessage = createSelectedMessageStore();
