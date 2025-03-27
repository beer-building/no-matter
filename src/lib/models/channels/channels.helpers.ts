export const getUserIdFromChannelName = (
  userId: string,
  channelName: string,
): string => {
  const ids = channelName.split("__");
  let otherUserId = "";
  if (ids[0] === userId) {
    otherUserId = ids[1];
  } else {
    otherUserId = ids[0];
  }

  return otherUserId;
};
