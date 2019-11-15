<script>
    import { socketClient } from './stores/socketClient.js';
    import { addressStore } from './stores/addressStore.js';

    let address = '';

    function connect() {
        const prepAddress = address.trim();
        if (prepAddress === '') {
            console.warn(`Specified address '${prepAddress}' is invalid.`);
            return;
        }

        socketClient.connect(prepAddress);
    }

    function handleInputKey(event) {
        if (event.key.toUpperCase() === 'ENTER') {
            connect();
            return;
        }

        addressStore.set(address);
    }
</script>

<div class="row">
    <div class="input-field col s12 m8 offset-m2">
        <input
            id="server_address"
            placeholder="ws://localhost:5000"
            type="url"
            class="validate"
            bind:value={address}
            on:keyup={handleInputKey}>
        <label for="server_address">Server address</label>
    </div>
</div>
