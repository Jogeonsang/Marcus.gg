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
