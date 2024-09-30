import type { ChannelCategory } from "@mattermost/types/channel_categories";
import type { ServerChannel } from "@mattermost/types/channels";
import { combine, createStore, sample, type Store } from "effector";

import { authModel } from "../auth";
import { teamModel } from "../team";
import { usersModel } from "../users";
import { getFullName } from "../users/users.helpers";
import { loadChannelCategoriesFx, loadChannelsFx } from "./channels.api";
import { getUserIdFromChannelName } from "./channels.helpers";
import { type Channel, ChannelType } from "./types";

export const $categories = createStore<Array<ChannelCategory>>([]);
export const $serverChannels = createStore<Array<ServerChannel>>([]);

// FIXME: refactor, load only neccessary users from channels
export const $channels: Store<Channel[]> = combine(
	[usersModel.$users, $serverChannels, authModel.$user],
	([users, channels, user]) => {
		console.log("CHANNLES", channels);

		return channels.map((channel) => {
			const type = {
				D: ChannelType.directMessage,
				P: ChannelType.privateChannel,
				O: ChannelType.publicChannel,
				G: ChannelType.group,
				threads: ChannelType.threads
			}[channel.type];

			if (type === ChannelType.directMessage) {
				const relatedUserId = getUserIdFromChannelName(user?.id ?? "", channel.name);
				const teammate = users.find((user) => user.id === relatedUserId)!;

				return {
					id: channel.id,
					name: getFullName(teammate),
					urlId: channel.name,
					type: ChannelType.directMessage,
					users: [teammate]
				};
			}

			if (type === ChannelType.group) {
				const teammates = channel.display_name
					.split(",")
					.map((username) => username.trim())
					.map((username) => users.find((user) => user.username === username)!);

				return {
					id: channel.id,
					type: type,
					urlId: channel.name,
					name: channel.display_name,
					users: teammates
				};
			}

			return {
				id: channel.id,
				type: type,
				urlId: channel.name,
				name: channel.display_name,
				users: []
			};
		});
	}
);

sample({
	clock: teamModel.$currentTeam,
	source: authModel.$user,
	fn: (user, team) => ({ userId: String(user?.id), teamId: String(team?.id) }),
	target: loadChannelCategoriesFx
});

sample({
	clock: teamModel.$currentTeam,
	filter: Boolean,
	fn: (team) => team.id,
	target: loadChannelsFx
});

sample({
	clock: loadChannelsFx.doneData,
	target: $serverChannels
});

sample({
	clock: loadChannelCategoriesFx.doneData,
	target: $categories
});
