<script>
    import { tick, onDestroy } from 'svelte';
    import { socketClient } from './stores/socketClient.js';

    let editor = null;
    let editorElement = null;
    $: isVisible = $socketClient !== null;

    const DefaultComposerValue = { type: 'message_type', payload: { } };

    const unsubscribe = socketClient.subscribe(async (client) => {
        if (client) {
            // Await content to be rendered because of the {#if isVisible}
            // otherwise the @editorElement will not be bound to the target HTML element
            await tick();
            createEditor();
        } else {
            editor = null;
        }
    });

    onDestroy(unsubscribe);

    function createEditor() {
        if (editor) {
            console.warn('Compose editor is already created.');
            return;
        }

        if (!editorElement) {
            console.error('Target editor element is unavailable!');
            return;
        }

        editor = CodeMirror(editorElement, {
            value: JSON.stringify(DefaultComposerValue, null, 4),
            mode: { name: 'javascript', json: true },
            indentWithTabs: false,
            lineNumbers: true,
        });
    }

    function sendMessage() {
        if (!editor) {
            console.error('Editor is not available!');
            return;
        }

        socketClient.send(editor.getValue());
    }
</script>

{#if isVisible}
    <div class="row">
        <div class="col s12">
            <h4>Composer</h4>
        </div>

        <div class="col s12" bind:this={editorElement}></div>

        <div class="col s3">
            <button
                type="button"
                class="btn waves-effect waves-light"
                on:click={sendMessage}>
                Send
            </button>
        </div>
    </div>
{/if}
