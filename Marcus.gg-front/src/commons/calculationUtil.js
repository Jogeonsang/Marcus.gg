export const getVictoryRate = (wins, losses) => {
  return Math.floor(wins / (losses + wins) * 100);
};

export const getKDA = (stats) => {
  let {kills, deaths, assists} = stats;
  deaths = deaths === 0 ? 1 : deaths;
  const KDA = Math.round(
    ((kills + assists) / deaths) * 100) / 100
  return KDA.toFixed(2);
}

export const KillInvolvementRate = (totalKills, stats) => {
  let {kills, assists} = stats;
  return Math.round(100 / (totalKills / (kills + assists)))
};

export const teamDamageRate = (stats) => {
  let { totalDamageDealt, totalDamageDealtToChampions }= stats;
  return Math.ceil((totalDamageDealt / totalDamageDealtToChampions) * 5);
};

export const getMiniosKillRate = (totalMinionsKilled ,time) => {
  return (totalMinionsKilled / Math.round(time / 60)).toFixed(1)
};

export const getDamagePerMinute = (totalDamage, time) => {
  return Math.round(totalDamage / Math.round(time / 60)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

