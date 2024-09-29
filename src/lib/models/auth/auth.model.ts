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
import { pending, reset } from "patronum";
import { $serverUrl, beforeSubmitValidated } from "./login-form.model";

export const $token = createPersistedStore("token", "");
export const $isAuthorized = createStore(false);
export const $pending = pending([loginFx, getCurrentUserDataFx]);
export const $user = createStore<UserProfile | null>(null);

const updateClientUrlFx = createEffect((url: string) => {
  providerModel.client.setUrl(url);
});

const setTokenFx = createEffect((token: string) => {
  providerModel.client.setToken(token);
  providerModel.client.setHeader("Token", token);
});

const _getUserData = createEvent();
const _onInit = createEvent();

export const logout = createEvent();
export const setServerUrl = createEvent<string>();
export const onAuth = createEvent();

sample({
  clock: $serverUrl,
  target: updateClientUrlFx,
});

sample({
  clock: setServerUrl,
  target: $serverUrl,
});

sample({
  clock: beforeSubmitValidated,
  target: loginFx,
});

sample({
  clock: loginFx.doneData,
  fn: ({ user }) => user,
  target: $user,
});

sample({
  clock: loginFx.doneData,
  fn: ({ token }) => token,
  target: $token,
});

sample({
  clock: logout,
  target: logoutFx,
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
  source: $token,
  target: setTokenFx,
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

sample({
  clock: [$pending, $isAuthorized],
  source: {
    pending: $pending,
    isAuthorized: $isAuthorized,
  },
  filter: ({ pending, isAuthorized }) => !pending && isAuthorized,
  target: onAuth,
});

setTimeout(() => {
  _onInit();
});

reset({
  clock: logoutFx,
  target: [$isAuthorized, $user],
});
