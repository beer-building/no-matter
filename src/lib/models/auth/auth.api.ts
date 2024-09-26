import { providerModel } from "../provider";

export const loginFx = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return providerModel.client.login(username, password);
};
