import React from "react";
import LeaderboardItem from "./leaderboardItem";

const LeaderboardList = ({ data, userId }) => {
  return (
    <div>
      {data.map((item, index) => (
        <LeaderboardItem
          key={index}
          position={item.position}
          name={item.name}
          lastName={item.last_name}
          score={item.score}
          imgUrl={item.img_url}
          itsMe={userId === item.user_id}
        />
      ))}
    </div>
  );
};

export default LeaderboardList;
