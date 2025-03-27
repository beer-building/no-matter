import { createEffect } from "effector";
import { providerModel } from "../provider";

/*
 * FIXME: refactor, move it to factory with pagination support
 * and use getPosts and getPostsUnread and understand the difference
 */
export const loadMessagesFx = createEffect(
  ({ channelId, userId }: { channelId: string; userId: string }) => {
    // TODO:  WHAT THE DIFFERENCE BETWEEN getPosts and getPostsUnread?
    return providerModel.client.getPostsUnread(
      channelId,
      userId,
      30,
      30,
      true,
      true,
      false,
    );
  },
);
