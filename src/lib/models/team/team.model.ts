import { createStore, sample } from "effector";
import { authModel } from "../auth";
import type { Team } from "@mattermost/types/teams";
import { loadTeamsFx } from "./team.api";

export const $teams = createStore<Array<Team>>([]);
export const $currentTeam = createStore<Team | null>(null);

sample({
  clock: authModel.onAuth,
  target: loadTeamsFx,
});

sample({
  clock: loadTeamsFx.doneData,
  target: $teams,
});

sample({
  clock: loadTeamsFx.doneData,
  filter: (teams) => teams.length === 1,
  fn: (teams) => teams[0],
  target: $currentTeam,
});
