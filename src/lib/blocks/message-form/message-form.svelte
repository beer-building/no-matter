<script lang="ts">
  import { MessageEditor } from "@/lib/shared/components/message-editor";
</script>

<div class="wrapper">
  <div class="editor">
    <MessageEditor />
  </div>
  <div class="controls">
    <button>send</button>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    border: 1px solid;
  }
  .editor {
    flex: 1;
    max-height: 300px;
    overflow-y: auto;
    min-height: 0;
  }
  .controls {
    display: flex;
    align-items: flex-end;
  }
</style>
