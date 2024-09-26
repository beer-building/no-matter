<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";

  export let id = "default";
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

    localStorage.setItem(id, width.toString());
  };
  const onMouseMove = (event: MouseEvent) => {
    width = event.pageX;
    event.stopPropagation();
    event.preventDefault();
  };

  onMount(() => {
    width = Number(localStorage.getItem(id)) || initialWith;
  });

  const onMouseDown = (event: MouseEvent) => {
    isDragging = true;
    document.body.style.cursor = "col-resize";
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  };

  $: safeWidth = Math.max(Math.min(width, maxWidth), minWidth);
  $: isSmallMode = width < smallSize + 20;

  $: {
    invoke("haptic_feedback");
    console.log(isSmallMode);
  }
</script>

<div class="wrapper" style:width="{isSmallMode ? smallSize : safeWidth}px">
  <slot />
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="drag"
    class:active={isDragging}
    on:mousedown|stopPropagation|preventDefault={onMouseDown}
  ></div>
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
    background-color: oklch(from var(--color-accent) l c h / 0.1);
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
      background: oklch(from var(--color-title) l c h / 50%);
    }
  }
</style>
