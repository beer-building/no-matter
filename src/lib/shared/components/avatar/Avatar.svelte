<script lang="ts">
export let src = "";
export let size = 30;
</script>

<div class="wrapper" style:--size="{size}px">
  <img {src} alt="" />
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
