import { createEffect, createStore, sample } from "effector";
import { providerModel } from "../provider";
import { authModel } from "../auth";
import type { UserProfile } from "@mattermost/types/users";

// All users that current user knows
export const $users = createStore<Array<UserProfile>>([]);

// FIXME: load only neccessary users, for example - from channels, now it loads all users, and if we have a lot of users, it can be slow and not efficient
const loadUsersFx = createEffect(() =>
  providerModel.client.getProfiles(0, 200),
);

authModel.onAuth.watch(() => console.log("authModel.onAuth"));

sample({
  clock: authModel.onAuth,
  target: loadUsersFx,
});

sample({
  clock: loadUsersFx.doneData,
  target: $users,
});
