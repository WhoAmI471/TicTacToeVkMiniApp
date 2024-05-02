import React from 'react';

const LeaderboardItem = ({ position, name, lastName, score, imgUrl }) => {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}>{position}.</div>
      <img src={imgUrl} alt={`${name} ${lastName}`} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '20px' }} />
      <div>
        <div>{name} {lastName}</div>
        <div>Score: {score}</div>
      </div>
    </div>
  );
};

export default LeaderboardItem;