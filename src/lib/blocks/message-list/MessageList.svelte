<script lang="ts">
  import { messagesModel } from "@/lib/models";
  import { derived } from "svelte/store";
  import { Message } from "../message";

  export let channelId: string;

  const allMessages = messagesModel.$messages;
  const messagesInChannel = messagesModel.$messagesInChannel;

  $: messages = derived(
    [allMessages, messagesInChannel],
    ([allMessages, messagesInChannel]) => {
      const order = messagesInChannel[channelId ?? ""]?.order || [];
      return order
        .slice()
        .reverse()
        .map((id) => allMessages[id]);
    },
  );

  $: {
    if (channelId) {
      loadMessages(channelId);
      setTimeout(() => {
        scrollToBottom();
      });
    }
  }
  const loadMessages = (id: string) => {
    messagesModel.loadChannelMessages(id);
  };

  let ref: HTMLUListElement;
  let isAtBottom = true;
  $: {
    [$messages];

    scrollToBottom();
  }

  const scrollToBottom = () => {
    ref?.scrollTo({ top: ref?.scrollHeight });
  };
</script>

<svelte:window on:resize={() => isAtBottom && scrollToBottom()} />

<ul
  class="wrapper"
  bind:this={ref}
  on:scroll={() =>
    (isAtBottom = ref.scrollHeight === ref.scrollTop + ref.clientHeight)}
>
  {#each $messages as message}
    <li>
      <Message {message} />
    </li>
  {/each}
</ul>

<style lang="postcss">
  .wrapper {
    height: 100%;
    list-style: none;
    overflow: auto;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
  }
  li + li {
    margin-top: var(--padding-m);
  }
</style>
