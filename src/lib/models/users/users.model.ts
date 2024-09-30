import type { UserProfile } from "@mattermost/types/users";
import { createEffect, createStore, sample } from "effector";

import { authModel } from "../auth";
import { providerModel } from "../provider";

// All users that current user knows
export const $users = createStore<Array<UserProfile>>([]);

// FIXME: load only neccessary users, for example - from channels, now it loads all users, and if we have a lot of users, it can be slow and not efficient
const loadUsersFx = createEffect(() => providerModel.client.getProfiles(0, 200));

sample({
	clock: authModel.onAuth,
	target: loadUsersFx
});

sample({
	clock: loadUsersFx.doneData,
	target: $users
});
