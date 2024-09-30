import { createEffect } from "effector";

import { providerModel } from "../provider";

export const loadTeamsFx = createEffect(() => {
  return providerModel.client.getMyTeams();
});
