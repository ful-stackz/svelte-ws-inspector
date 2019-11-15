import { writable } from "svelte/store";

function createAddressStore() {
    const { subscribe, set } = writable('');

    return { subscribe, set };
}

export const addressStore = createAddressStore();
