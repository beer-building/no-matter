<script lang="ts">
  import { invoke } from "@tauri-apps/api";

  export let initialWith = 200;
  export let maxWidth = 350;
  export let minWidth = 150;
  export let smallSize = 78;

  let width = initialWith;
  let isDragging = false;

  const onMouseUp = () => {
    isDragging = false;
    document.body.style.cursor = "";
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  };
  const onMouseMove = (event: MouseEvent) => {
    width = event.pageX;
  };

  const onMouseDown = (event: MouseEvent) => {
    isDragging = true;
    document.body.style.cursor = "col-resize";
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  };

  $: safeWidth = Math.max(Math.min(width, maxWidth), minWidth);
  $: isSmallMode = width < smallSize + 20;

  $: {
    invoke("trigger_haptic_feedback");
    console.log(isSmallMode);
  }
</script>

<div class="wrapper" style:width="{isSmallMode ? smallSize : safeWidth}px">
  <slot />
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="drag" class:active={isDragging} on:mousedown={onMouseDown}></div>
</div>

<style lang="postcss">
  .wrapper {
    height: 100%;
    position: relative;
  }
  .drag {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: color-mix(
      in srgb,
      var(--seed-color) 24%,
      var(--background-color)
    );
    right: 0;
    width: 6px;
    opacity: 0;
    cursor: col-resize;
    transition: var(--transition);
    transform: translateX(50%);
    &:hover,
    &.active {
      opacity: 1;
    }

    &::before {
      content: "";
      position: absolute;
      height: 20px;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      width: 3px;
      border-radius: 10em;
      background: color-mix(in srgb, transparent, var(--color-text));
    }
  }
</style>
