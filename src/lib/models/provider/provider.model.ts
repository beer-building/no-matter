import { Client4 } from "@mattermost/client";

export const client = new Client4();

(window as any).client = client;
