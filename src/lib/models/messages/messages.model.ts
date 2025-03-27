import type { Post } from "@mattermost/types/posts";
import { createEvent, createStore, sample } from "effector";
import { authModel } from "../auth";
import { loadMessagesFx } from "./messages.api";

export const $messages = createStore<Record<string, Post>>({});
export const $messagesInChannel = createStore<{
  [key: string]: {
    // channelId
    order: string[];
  };
}>({});

export const loadChannelMessages = createEvent<string>();

sample({
  clock: loadChannelMessages,
  source: {
    user: authModel.$user,
  },
  fn: ({ user }, channelId) => ({
    channelId,
    userId: user?.id ?? "",
  }),
  target: loadMessagesFx,
});

loadMessagesFx.watch(console.log);
loadMessagesFx.fail.watch(console.log);

sample({
  clock: loadMessagesFx.done,
  source: $messages,
  fn: (cache, { params, result }) => ({
    ...cache,
    ...result.posts,
  }),
  target: $messages,
});

sample({
  clock: loadMessagesFx.done,
  source: $messagesInChannel,
  fn: (messagesInChannel, { result, params }) => ({
    ...messagesInChannel,
    [params.channelId]: {
      order: result.order,
    },
  }),
  target: $messagesInChannel,
});
