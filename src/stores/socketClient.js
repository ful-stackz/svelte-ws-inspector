import { writable } from 'svelte/store';
import { messageReceiver } from './messageReceiver.js';

function createSocketClient() {
    const { subscribe, set } = writable(null);

    /** @type {WebSocket} */
    let socket = null;

    const processMessage = (message) => ({
        timestamp: message.timeStamp,
        data: message.data,
    });

    return {
        subscribe,
        connect: (address) => {
            if (socket) {
                console.warn('An active socket connection exists.');
                return;
            }

            socket = new WebSocket(address);
            socket.onopen = (event) => {
                messageReceiver.next({ type: 'open', message: processMessage(event) });
                set(socket);
            }

            socket.onclose = (event) => {
                messageReceiver.next({ type: 'close', message: processMessage(event) });
                socket = null;
                set(null);
            }

            socket.onerror = (event) => messageReceiver.next({ type: 'error', message: processMessage(event) });
            socket.onmessage = (event) => messageReceiver.next({ type: 'message', message: processMessage(event) });
        },
        send: (message) => {
            if (!socket || socket.readyState !== WebSocket.OPEN) {
                console.warn('Connection not available.');
                return;
            }

            socket.send(message);
        },
        disconnect: () => {
            if (!socket || socket.readyState !== WebSocket.OPEN) {
                console.warn('WebSocket connection is not active.');
                return;
            }

            socket.close();
            socket = null;
            set(null);
        }
    };
}

export const socketClient = createSocketClient();
