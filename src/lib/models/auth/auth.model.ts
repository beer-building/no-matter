import { createPersistedStore } from "@/lib/shared/helpers/store";
import { createEffect, createEvent, createStore, sample } from "effector";
import { providerModel } from "../provider";
import {
  checkAuthAndRedirectFx,
  getCurrentUserDataFx,
  loginFx,
  logoutFx,
} from "./auth.api";
import type { UserProfile } from "@mattermost/types/users";

export const $serverUrl = createPersistedStore("serverUrl", "");
export const $isAuthorized = createStore(false);
export const $pending = createStore(true);
export const $user = createStore<UserProfile | null>(null);

const updateClientUrlFx = createEffect((url: string) => {
  providerModel.client.setUrl(url);
});

const _getUserData = createEvent();
const _onInit = createEvent();
export const login = createEvent<{ username: string; password: string }>();
export const logout = createEvent();
export const setServerUrl = createEvent<string>();

getCurrentUserDataFx.fail.watch(console.log);

sample({
  clock: $serverUrl,
  target: updateClientUrlFx,
});

sample({
  clock: setServerUrl,
  target: $serverUrl,
});

sample({
  clock: login,
  target: loginFx,
});

sample({
  clock: loginFx.doneData,
  target: $user,
});

sample({
  clock: logout,
  target: logoutFx,
});

sample({
  clock: [
    loginFx.done,
    loginFx.fail,
    getCurrentUserDataFx.done,
    getCurrentUserDataFx.fail,
  ],
  fn: () => false,
  target: $pending,
});

sample({
  clock: [getCurrentUserDataFx.done, loginFx.done],
  fn: () => true,
  target: $isAuthorized,
});

sample({
  clock: [getCurrentUserDataFx.fail, loginFx.fail],
  fn: () => false,
  target: $isAuthorized,
});

sample({
  clock: getCurrentUserDataFx.doneData,
  target: $user,
});

sample({
  clock: _getUserData,
  target: getCurrentUserDataFx,
});

sample({
  clock: _onInit,
  source: $serverUrl,
  target: updateClientUrlFx,
});

sample({
  clock: _onInit,
  target: _getUserData,
});

sample({
  clock: [$pending, $isAuthorized],
  source: {
    pending: $pending,
    isAuthorized: $isAuthorized,
  },
  target: checkAuthAndRedirectFx,
});

_onInit();

$isAuthorized.reset(logout);
$user.reset(logout);
