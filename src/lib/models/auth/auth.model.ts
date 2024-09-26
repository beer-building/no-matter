import { createPersistedStore } from "@/lib/shared/helpers/store";
import { createEffect, createEvent, createStore, sample } from "effector";
import { client } from "../provider/provider.model";
import { providerModel } from "../provider";

export const $token = createPersistedStore("token", "");
export const $serverUrl = createPersistedStore("serverUrl", "");
export const $isAuthorized = $token.map(Boolean);

export const setTokenFx = createEffect((token: string) => {
  client.setToken(token);
});

const updateClientUrlFx = createEffect((url: string) => {
  providerModel.client.setUrl(url);
});

export const login = createEvent<{ username: string; password: string }>();
export const setServerUrl = createEvent<string>();

sample({
  clock: $token,
  source: setTokenFx,
});

sample({
  clock: $serverUrl,
  target: updateClientUrlFx,
});

sample({
  clock: setServerUrl,
  target: $serverUrl,
});

updateClientUrlFx($serverUrl.getState());
setTokenFx($token.getState());
