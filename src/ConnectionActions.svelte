<script>
    import { socketClient } from './stores/socketClient.js';
    import { addressStore } from './stores/addressStore.js';

    function connect() {
        socketClient.connect($addressStore);
    }

    function disconnect() {
        socketClient.disconnect();
    }
</script>

<div class="row">
    {#if $socketClient !== null}
        <button
            type="button"
            name="disconnect"
            class="btn col s6 m4 offset-m4 waves-effect waves-light blue-grey lighten-4"
            on:click={disconnect}>
            Disconnect
        </button>
    {:else}
        <button
            type="button"
            name="connect"
            class="btn col s6 m4 offset-m4 waves-effect waves-light"
            on:click={connect}>
            Connect
        </button>
    {/if}
</div>
