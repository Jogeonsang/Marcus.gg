export const getVictoryRate = (wins, losses) => {
  return Math.floor(wins / (losses + wins) * 100);
}
