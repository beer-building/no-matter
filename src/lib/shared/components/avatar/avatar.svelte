<script lang="ts">
  import { loadAuthImage } from "../../helpers/load-auth-image";
  import { Skeleton } from "../skeleton";

  interface Props {
    src: string;
    size?: number;
  }
  const { src, size = 30 }: Props = $props();
  let proxied = $state("");
  let loading = $state(false);

  $effect(() => {
    loading = true;

    loadAuthImage(src, (newSrc) => {
      proxied = newSrc;
      loading = false;
    });
  });
</script>

<div class="wrapper" style:--size="{size}px">
  {#if loading}
    <Skeleton width="{size}px" height="{size}px" isRounded />
  {:else}
    <img src={proxied} alt="" />
  {/if}
</div>

<style>
  .wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--size);
    width: var(--size);
    min-width: var(--size);
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
