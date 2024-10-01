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
      <button on:click={togglePasswordVisibility} class="icon-button" type="button">
        <Icon name={showPassword ? "eye-off" : "eye"} size={18} />
      </button>
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
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--color-separator);
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: var(--color-accent);
  }
}

input {
  appearance: none;
  border: none;
  background: var(--color-panel);
  color: var(--color-title);
  outline: none;
  height: 32px;
  padding: 0 var(--padding-m);
  width: 100%;
  transition: background-color 0.3s ease;
  border-radius: var(--radius) 0 0 var(--radius);
}

.icon-button {
  color: var(--color-title);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-panel);
  border: none;
  height: 100%;
  padding: var(--padding-m);
  cursor: pointer;
  margin: 0;
  border-radius: 0 var(--radius) var(--radius) 0;
  transition: background-color 0.3s ease;
}

.error-message {
  color: var(--color-red);
  font-size: 0.875rem;
  margin-top: 4px;
  display: block;
}
</style>
