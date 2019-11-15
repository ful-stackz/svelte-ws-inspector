<script>
    import { tick, onDestroy } from 'svelte';
    import { selectedMessage } from './stores/selectedMessage.js';

    let editor = null;
    let editorElement = null;
    $: isVisible = $selectedMessage !== null;

    const unsubscribe = selectedMessage.subscribe(async (message) => {
        if (!message) {
            editor = null;
            return;
        }

        // Await content to be rendered because of the {#if isVisible}
        // otherwise the @editorElement will not be bound to the target HTML element
        await tick();
        editor = editor || createEditor();
        editor.setValue(JSON.stringify(message, null, 4));
    });

    onDestroy(unsubscribe);

    function createEditor() {
        return CodeMirror(editorElement, {
            value: '',
            mode: { name: 'javascript', json: true },
            indentWithTabs: true,
            lineNumbers: true,
        });
    }

    function close() {
        selectedMessage.set(null);
    }
</script>

{#if isVisible}
    <div class="row">
        <div class="col s12">
            <h4>Inspector</h4>
        </div>

        <div class="col s12" bind:this={editorElement}></div>

        <div class="col s3">
            <button
                type="button"
                class="btn waves-effect waves-light"
                on:click={close}>
                Close
            </button>
        </div>
    </div>
{/if}
