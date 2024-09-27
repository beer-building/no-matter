<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Icon } from "../icon";

  export let value = "";
  export let placeholder = "";
  export let type: "text" | "number" | "password" = "text";
  export let errorMessage: string | null = null;

  const dispatch = createEventDispatcher();

  let showPassword = false;
  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    dispatch("change", target.value);

    target.value = value;
  };
</script>

<label class="input-wrapper">
  <div class="input-container">
    <input
      {placeholder}
      type={type === "password" && showPassword ? "text" : type}
      {value}
      on:input={onChange}
      class:error={!!errorMessage}
    />

    {#if type === "password"}
      <span class="toggle-password" on:click={togglePasswordVisibility}>
        <Icon name={showPassword ? "eye-off" : "eye"} size={18} />
      </span>
    {/if}
  </div>

  {#if errorMessage}
    <span class="error-message">{errorMessage}</span>
  {/if}
</label>

<style lang="postcss">
  .input-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: var(--padding-s);
  }

  .input-container {
    position: relative;
    width: 100%;
  }

  input {
    appearance: none;
    border-radius: var(--radius);
    border: 1px solid var(--color-separator);
    background: var(--color-panel);
    color: var(--color-title);
    outline: none;
    height: 32px;
    padding: 0 var(--padding-m);
    padding-right: 40px;
    width: 100%;
    transition: border-color 0.3s ease;

    &:focus-visible {
      border-color: var(--color-accent);
    }

    &.error {
      border-color: var(--color-red);
    }
  }

  .toggle-password {
    position: absolute;
    right: var(--padding-m);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .error-message {
    color: var(--color-red);
    font-size: 0.875rem;
    margin-top: 4px;
    display: block;
  }
</style>
