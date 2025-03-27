<script lang="ts">
  interface Props {
    width: string;
    height: string;
    isRounded?: boolean;
  }

  const { width, height, isRounded = false }: Props = $props();
</script>

<div class="skeleton" class:rounded={isRounded} style:width style:height></div>

<style>
  .skeleton {
    border-radius: var(--border-radius);
    position: relative;
    background: rgba(127, 127, 127, 0.2);
  }

  .skeleton::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      -90deg,
      transparent,
      rgba(127, 127, 127, 0.3),
      rgba(127, 127, 127, 0.4),
      rgba(127, 127, 127, 0.3),
      transparent
    );
    transform: translateX(-100%);
    animation: loading 2s infinite linear;
  }
  .rounded {
    border-radius: 50%;
  }
  @keyframes loading {
    to {
      transform: translateX(100%);
    }
  }
</style>
