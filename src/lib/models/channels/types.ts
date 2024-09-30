import type { UserProfile } from "@mattermost/types/users";

export enum ChannelType {
  directMessage = "directMessage",
  privateChannel = "privateChannel",
  publicChannel = "publicChannel",
  group = "group",
  threads = "threads"
}

export type Channel = {
  id: string;
  urlId: string;
  type: ChannelType;
  name: string;
  users: UserProfile[];
};
