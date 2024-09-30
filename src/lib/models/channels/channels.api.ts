import { createEffect } from "effector";

import { providerModel } from "../provider";

export const loadChannelCategoriesFx = createEffect(
	async ({ userId, teamId }: { userId: string; teamId: string }) => {
		const res = await providerModel.client.getChannelCategories(userId, teamId);

		return res.categories;
	}
);

export const loadChannelsFx = createEffect(async (teamId: string) =>
	providerModel.client.getMyChannels(teamId)
);
