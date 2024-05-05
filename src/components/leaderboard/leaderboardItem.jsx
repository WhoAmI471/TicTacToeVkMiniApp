import React from "react";

import { SimpleCell, Avatar } from "@vkontakte/vkui";

const LeaderboardItem = ({
  position,
  name,
  lastName,
  score,
  imgUrl,
  itsMe,
}) => {
  return (
    <SimpleCell before={position} after={score}>
      <Avatar src={imgUrl} />
      {name} {lastName}
    </SimpleCell>
  );
};

export default LeaderboardItem;
