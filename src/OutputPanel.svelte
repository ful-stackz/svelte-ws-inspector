<script>
    import { afterUpdate, onDestroy } from 'svelte';
    import { messageReceiver } from './stores/messageReceiver.js';
    import { selectedMessage } from './stores/selectedMessage.js';

    let messages = [];
    let outputListElement = null;
    $: isVisible = messages.length !== 0;

    const unsubscribe = messageReceiver.subscribe(message => {
        message ? messages = [...messages, message] : null;
    });

    afterUpdate(() => {
        outputListElement ? outputListElement.scrollTo(0, outputListElement.scrollHeight) : null;
    });

    onDestroy(unsubscribe);

    function selectMessage(message) {
        selectedMessage.set(message);
    }

    function clearMessages() {
        messages = [];
    }
</script>

<style>
    .scrollable {
        max-height: 500px;
        overflow-y: auto;
    }
    .pointable {
        cursor: pointer;
    }
</style>

{#if isVisible}
    <div class="row">
        <div class="col s12">
            <h4>Output</h4>
        </div>

        <div class="col s12">
            <ul class="collection scrollable" bind:this={outputListElement}>
                {#each messages as message}
                    <li
                        class="collection-item pointable truncate"
                        on:click={() => selectMessage(message)}>
                        {JSON.stringify(message)}
                    </li>
                {/each}
            </ul>
        </div>

        <div class="col s3">
            <button
                type="button"
                class="btn waves-effect waves-light"
                on:click={clearMessages}>
                Clear
            </button>
        </div>
    </div>
{/if}
