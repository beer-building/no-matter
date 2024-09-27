import { createEffect } from "effector";
import { providerModel } from "../provider";
import { page } from "$app/stores";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export const loginFx = createEffect(
  async ({ username, password }: { username: string; password: string }) => {
    const user = await providerModel.client.login(username, password);

    return {
      user,
      token: providerModel.client.token,
    };
  },
);

export const logoutFx = createEffect(() => providerModel.client.logout());

export const getCurrentUserDataFx = createEffect(() =>
  providerModel.client.getMe(),
);

export const checkAuthAndRedirectFx = createEffect(
  async ({
    pending,
    isAuthorized,
  }: {
    pending: boolean;
    isAuthorized: boolean;
  }) => {
    if (pending) {
      return;
    }

    console.log(isAuthorized, pending);

    const currentRoute = get(page);

    if (isAuthorized && currentRoute.url.pathname === "/login") {
      return goto("/app");
    }

    if (!isAuthorized && currentRoute.url.pathname !== "/login") {
      return goto("/login");
    }
  },
);
