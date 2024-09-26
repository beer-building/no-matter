import { createEffect, createStore, sample } from "effector";
import { type UserProfile } from "@mattermost/types/users";
import { authModel } from "../auth";
import { client } from "../provider/provider.model";
import { providerModel } from "../provider";

export const $user = createStore<UserProfile | null>(null);

export const getUserDataFx = createEffect(async (id: string) => {
  return providerModel.client.getUser(id);
});

sample({
  clock: authModel.setTokenFx.done,
  target: getUserDataFx,
});
