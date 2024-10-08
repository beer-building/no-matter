import { createEffect } from "effector";
import { get } from "svelte/store";

import { goto } from "$app/navigation";
import { page } from "$app/stores";

import { providerModel } from "../provider";

export const loginFx = createEffect(
  async ({ username, password }: { username: string; password: string }) => {
    const user = await providerModel.client.login(username, password);

    return {
      user,
      token: providerModel.client.token
    };
  }
);

export const logoutFx = createEffect(() => providerModel.client.logout());

export const getCurrentUserDataFx = createEffect(() => providerModel.client.getMe());

export const checkAuthAndRedirectFx = createEffect(
  async ({ pending, isAuthorized }: { pending: boolean; isAuthorized: boolean }) => {
    if (pending) {
      return;
    }

    const currentRoute = get(page);

    if (isAuthorized && currentRoute.url.pathname === "/login") {
      return goto("/app");
    }

    if (!isAuthorized && currentRoute.url.pathname !== "/login") {
      return goto("/login");
    }
  }
);
