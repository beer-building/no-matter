<script lang="ts">
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { onMount } from "svelte";

  onMount(() => {
    editor = new Editor({
      element: editorEl,
      extensions: [StarterKit],
      content: "",
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
    });
  });

  let editor: Editor | null = $state(null);
  let editorEl: HTMLElement;
</script>

<div class="editor" bind:this={editorEl}></div>

<style lang="postcss">
  .editor {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;

    & > :global(div) {
      height: 100%;
      width: 100%;
      outline: none;
    }
  }
</style>
