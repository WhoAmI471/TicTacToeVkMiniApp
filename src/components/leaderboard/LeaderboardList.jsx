import React from 'react';
import LeaderboardItem from './leaderboardItem';

const LeaderboardList = ({ data }) => {
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
        />
      ))}
    </div>
  );
};

export default LeaderboardList;