import type { UserProfile } from "@mattermost/types/users";

export function getFullName(user: UserProfile | null): string {
	if (user?.first_name && user?.last_name) {
		return user.first_name + " " + user.last_name;
	} else if (user?.first_name) {
		return user.first_name;
	} else if (user?.last_name) {
		return user.last_name;
	}

	return "";
}
